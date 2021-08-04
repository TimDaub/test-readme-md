# test-readme-md

> A tool that runs all JavaScript snippets in your README.md.

## Installation

```bash
$ npm i test-readme-md
```

## Usage

```js
import { testmd } from "test-readme-md";

const block = `
# this is a readme

This is some regular text that describes something.

Here's the first code block:

\`\`\`js
(() => true)();
\`\`\`

## Buggy code

The code in the next section will throw an error. \`testmd\` should throw too if
such error is bubbled up.

\`\`\`js
(() => { throw new Error("stop") })();
\`\`\`
`;

(async () => {
  testmd("js", block);
})();
```

An alternative way of using this module is by running the block parser
`matchBlocks` yourself and then running `exec` on each of them.

```js
import { matchBlocks, exec } from "test-readme-md";

const content = `
# this is a readme

This is some regular text that describes something.

Here's the first code block:

\`\`\`js
(() => true)();
\`\`\`

## Buggy code

The code in the next section will throw an error. \`testmd\` should throw too if
such error is bubbled up.

\`\`\`js
(() => { throw new Error("stop") })();
\`\`\`
`;

(async () => {
  const blocks = matchBlocks(content);
  for (let block of blocks) {
    await exec(block);
  }
})();
```

## Changelog

### 0.0.3

- Expose `exec` function and document usage in `readme.md`

### 0.0.2

- Bump `inline-esm-worker` version to 0.0.3

### 0.0.1

- Initial release

## License

See LICENSE file.
