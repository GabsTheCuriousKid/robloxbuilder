import * as Parser from "web-tree-sitter";
import Lua from "tree-sitter-lua";

let parser;

export default async function beautifyLua(code) {
  if (!parser) {
    await Parser.init();
    parser = new Parser();
    parser.setLanguage(Lua);
  }

  const tree = parser.parse(code);

  let indent = 0;
  return code.split("\n").map(line => {
    const trimmed = line.trim();
    if (/^(end|elseif|else)\b/.test(trimmed)) indent = Math.max(0, indent - 1);
    const out = "  ".repeat(indent) + trimmed;
    if (/^(function|do|then|for|while|if)\b/.test(trimmed)) indent++;
    return out;
  }).join("\n");
}
