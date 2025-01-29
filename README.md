# Shiki-cli-binary

This repository allows to build the [shiki](https://shiki.style/) syntax highlighter, with all the languages and themes included, as a command line binary using [Bun](https://bun.sh).

## Why?

The shiki syntax highlighter is a great tool to highlight code in a web page. However, it is written in TypeScript and requires a Node.js environment to run. This repository allows to build a binary that can be run on any platform without any dependency, making deployment easier.

## Install

```bash
git clone https://github.com/xavierlacot/shiki-cli-binary.git
cd shiki-cli-binary
bun install
```

## Build

```bash
bun binary
```

This generates a binary named `shiki-cli` in the current directory.

## Deploy

You can deploy the binary on your server:

```bash
wget https://github.com/xavierlacot/shiki-cli-binary/releases/download/v0.0.1/shiki-cli
chmod +x shiki-cli
```

## Usage

The following command outputs an highlighted code string to the standard output:

```bash
./shiki-cli /path/to/source-code.xyz --lang=language --theme=theme
```
