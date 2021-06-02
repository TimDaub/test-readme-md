// @format
import run from "inline-esm-worker";

export function matchLang(name) {
  return RegExp(`(?<=\`\`\`js)(.*?)(?=\`\`\`)`, "gs");
}

export function matchBlocks(name, block) {
  const expr = matchLang(name);
  const blocks = block.match(expr);
  for (let i = 0; i < blocks.length; i++) {
    blocks[i] = blocks[i].trim();
  }

  return blocks;
}

export async function testmd(lang, string) {
  const blocks = matchBlocks(lang, string);

  for (let block of blocks) {
    await run(block);
  }
}
