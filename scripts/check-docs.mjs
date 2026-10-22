import { readdir, readFile, stat } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const files = [];
async function collect(path) {
  if ((await stat(resolve(root, path))).isDirectory()) {
    for (const entry of await readdir(resolve(root, path))) await collect(`${path}/${entry}`);
  } else if (path.endsWith(".md")) files.push(path);
}
for (const path of ["README.md", "QUICKSTART_RU.md", "AI_GUIDE.md", "AGENTS.md", "docs", "public"])
  await collect(path);

const errors = [];
const internalMode = /\b(?:prod|production|sandbox|test\/prod|prod\/test)\b|\btest\s+(?:mode|environment|network|access)\b|\benv\b|тестов[а-яё]*\s+(?:режим|контур|сред|сет)/iu;
const internalStatus = /not yet (?:a )?(?:production )?release|after (?:the )?release|coordinated service release|until[^\n]{0,80}release|release candidate|planned remote|готовится к выпуску|после выпуска|статус выпуска/iu;
let links = 0;
for (const path of files) {
  const source = await readFile(resolve(root, path), "utf8");
  for (const [index, line] of source.split("\n").entries()) {
    if (internalMode.test(line)) errors.push(`${path}:${index + 1}: internal operating mode in public documentation`);
    if (internalStatus.test(line)) errors.push(`${path}:${index + 1}: internal development status in public documentation`);
  }
  for (const [, href] of source.matchAll(/\]\(([^\s)]+)(?:\s+"[^"]*")?\)/g)) {
    if (/^[a-z][a-z\d+.-]*:|^#|^\//i.test(href)) continue;
    const target = decodeURIComponent(href.split("#")[0]);
    if (!target) continue;
    try { await stat(resolve(root, dirname(path), target)); links++; }
    catch { errors.push(`${path}: missing local link ${href}`); }
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else console.log(`Checked ${files.length} public Markdown guides and ${links} local links.`);
