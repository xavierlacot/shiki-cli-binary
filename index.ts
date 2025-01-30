#!/usr/bin/env node

import fs from "node:fs/promises";
import process from "node:process";
import minimist from "minimist";

import { languageAliasNames, languageNames } from "@shikijs/langs";
import { codeToHtml } from "shiki";

async function highlight(
	input: string,
	language: string,
	theme: string,
): Promise<string> {
	let lang = language.toLowerCase();

	if (!languageNames.includes(lang) && !languageAliasNames.includes(lang)) {
		lang = "text";
	}

	return await codeToHtml(input, {
		lang: lang,
		theme: theme,
		colorReplacements: {
			"#272822": "#1f2937",
		},
	});
}

async function run(argv = process.argv.slice(2), log = console.log) {
	// parse cli arguments
	const {
		lang = "text",
		theme = "monokai",
		json = false,
		_: files = [],
	} = minimist(argv);
	if (json) {
		const jsonArray = JSON.parse(
			await fs.readFile(files[0], { encoding: "utf8" }),
		);
		const highlightedArray = await Promise.all(
			jsonArray.map(
				async (item: { input: string; lang?: string; theme?: string }) => {
					return {
						...item,
						output: await highlight(
							item.input,
							item.lang ?? lang,
							item.theme ?? theme,
						),
					};
				},
			),
		);
		log(JSON.stringify(highlightedArray, null, 2));
		return;
	}

	// exactly one file is required
	if (1 !== files.length) {
		return;
	}

	const textContent = await fs.readFile(files[0], { encoding: "utf8" });

	// output the highlighted html string
	log(await highlight(textContent, lang, theme));
}

run();
