// @format
import test from "ava";

import { matchLang, matchBlocks, testmd } from "../src/index.mjs";

test("if testmd works on block example", async t => {
  const code1 = "(() => true)();";
  const code2 = '(() => { throw new Error("stop") })();';
  const block1 = `
# this is a readme

This is some regular text that describes something.

Here's the first code block:

\`\`\`js
${code1}
\`\`\`
  `;
  const block2 = `
## Buggy code

The code in the next section will throw an error. \`testmd\` should throw too if
such error is bubbled up.

\`\`\`js
${code2}
\`\`\`
  `;

  await testmd("js", block1);
  await t.throwsAsync(async () => await testmd("js", block2));
});

test("if blocks are matched and trimmed", t => {
  const code1 = "(() => true)();";
  const code2 = '(() => { throw new Error("stop") })();';
  const block = `
# this is a readme

This is some regular text that describes something.

Here's the first code block:

\`\`\`js
${code1}
\`\`\`

## Buggy code

The code in the next section will throw an error. \`testmd\` should throw too if
such error is bubbled up.

\`\`\`js
${code2}
\`\`\`
  `;
  const matches = matchBlocks("js", block);
  t.is(matches[0], code1);
  t.is(matches[1], code2);
});

test("if js code block is matched", t => {
  const block = `
\`\`\`js
  (() => true)();
\`\`\`

\`\`\`blascript
  (() => true)();
\`\`\`


\`\`\`js
  (() => {
  const s = \`wow a risky string with backticks\`;
  return true

  })();
\`\`\`

`;

  const expr = matchLang("js");
  const matches = block.match(expr);
  t.true(eval(matches[0]));
  t.true(eval(matches[1]));
  t.is(matches.length, 2);
});
