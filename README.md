# Shiki-cli-binary

This repository allows to build the [shiki](https://shiki.style/) syntax highlighter, with all the languages and themes included, as a command line binary using [Bun](https://bun.sh).

## Why?

The shiki syntax highlighter is a great tool to highlight code in a web page. However, it is written in TypeScript and requires a Node.js environment to run. This repository allows to build a binary that can be run on any platform without any dependency, making deployment easier.

## Deploy

You can download the binary:

```bash
wget https://github.com/xavierlacot/shiki-cli-binary/releases/download/v0.0.1/shiki-cli
chmod +x shiki-cli
```

## Usage

### Highlight a code string

The following command outputs an highlighted code string to the standard output:

```bash
./shiki-cli /path/to/source-code.xyz --lang=language --theme=theme
```

The `--lang` and `--theme` options are optional. If not provided, the default language is `text` and the default theme is `monokai`.

### JSON mode

The `--json` option allows to process multiple code snippets at once, which can be useful to improve performance.
When the `--json` option is provided, the input is expected to be a JSON array in the following format:

```
[
  {
    "input": "source code",
    "lang": "language",
    "theme": "theme",
    ...
  },
  ...
]
```

The `lang` and `theme` fields are optional. If not provided, it defaults to the `--lang` and `--theme` cli options, or to `text` and `monokai` if not provided.

Each object in the array is processed and the output is a JSON array with the same structure, with the `output` field containing the highlighted code. If the input array contained extra fields, they are preserved in the output. For example:

```json
// input.json
[
    {
        "lang": "typescript",
        "input": "function greet(): void {\n  console.log('Hello, world!');\n}\ngreet();",
        "reference": "550e8400-e29b-41d4-a716-446655440004"
    },
    {
        "lang": "php",
        "input": "<?php\nfunction greet() {\n  echo 'Hello, world!';\n}\ngreet();\n?>",
        "reference": "550e8400-e29b-41d4-a716-446655440005"
    }
]
```

```bash
./shiki-cli input.json --json > output.json
```

```json
// output.json
[
  {
    "lang": "typescript",
    "input": "function greet(): void {\n  console.log('Hello, world!');\n}\ngreet();",
    "reference": "550e8400-e29b-41d4-a716-446655440004",
    "output": "<pre class=\"shiki monokai\" style=\"background-color:#1f2937;color:#F8F8F2\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#66D9EF;font-style:italic\">function</span><span style=\"color:#A6E22E\"> greet</span><span style=\"color:#F8F8F2\">()</span><span style=\"color:#F92672\">:</span><span style=\"color:#66D9EF;font-style:italic\"> void</span><span style=\"color:#F8F8F2\"> {</span></span>\n<span class=\"line\"><span style=\"color:#F8F8F2\">  console.</span><span style=\"color:#A6E22E\">log</span><span style=\"color:#F8F8F2\">(</span><span style=\"color:#E6DB74\">'Hello, world!'</span><span style=\"color:#F8F8F2\">);</span></span>\n<span class=\"line\"><span style=\"color:#F8F8F2\">}</span></span>\n<span class=\"line\"><span style=\"color:#A6E22E\">greet</span><span style=\"color:#F8F8F2\">();</span></span></code></pre>"
  },
  {
    "lang": "php",
    "input": "<?php\nfunction greet() {\n  echo 'Hello, world!';\n}\ngreet();\n?>",
    "reference": "550e8400-e29b-41d4-a716-446655440005",
    "output": "<pre class=\"shiki monokai\" style=\"background-color:#1f2937;color:#F8F8F2\" tabindex=\"0\"><code><span class=\"line\"><span style=\"color:#F92672\">&#x3C;?</span><span style=\"color:#AE81FF\">php</span></span>\n<span class=\"line\"><span style=\"color:#66D9EF;font-style:italic\">function</span><span style=\"color:#A6E22E\"> greet</span><span style=\"color:#F8F8F2\">() {</span></span>\n<span class=\"line\"><span style=\"color:#66D9EF\">  echo</span><span style=\"color:#E6DB74\"> 'Hello, world!'</span><span style=\"color:#F8F8F2\">;</span></span>\n<span class=\"line\"><span style=\"color:#F8F8F2\">}</span></span>\n<span class=\"line\"><span style=\"color:#A6E22E\">greet</span><span style=\"color:#F8F8F2\">();</span></span>\n<span class=\"line\"><span style=\"color:#F92672\">?></span></span></code></pre>"
  }
]
```

## Development

### Install

This project requires the bun package manager ([see install instructions](https://bun.sh/docs/installation)).

```bash
git clone https://github.com/xavierlacot/shiki-cli-binary.git
cd shiki-cli-binary
bun install
```

### Build

```bash
bun binary
```

This generates a binary named `shiki-cli` in the current directory.

### Lint

Several commands are available to check, lint and format the code. The rely on [Biome](https://biomejs.dev/):

```bash
bun check
bun format
bun lint
```
