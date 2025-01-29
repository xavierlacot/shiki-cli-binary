#!/usr/bin/env node

import fs from 'node:fs/promises'
import process from 'node:process'
import minimist from 'minimist'

import { languageNames, languageAliasNames } from '@shikijs/langs';
import { codeToHtml } from 'shiki'

async function run(
  argv = process.argv.slice(2),
  log = console.log,
) {
  // parse cli arguments
  const {
    lang = 'text',
    theme = 'monokai',
    _: files = [],
  } = minimist(argv)
  let language = lang.toLowerCase();

  if (!languageNames.includes(language) && !languageAliasNames.includes(language)) {
    language = 'text';
  }

  // exactly one file is required
  if (1 !== files.length) {
    return;
  }

  const textContent = await fs.readFile(files[0], { encoding: 'utf8' });
  const highlightedHtmlString = await codeToHtml(textContent, {
    lang: language,
    theme: theme,
    colorReplacements: {
      '#272822': '#1f2937'
    }
  });

  // output the highlighted html string
  log(highlightedHtmlString)
}

run();
