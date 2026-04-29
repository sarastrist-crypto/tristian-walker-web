// Reads every .md file in ./essays at build time, parses YAML frontmatter +
// markdown body, and exposes a sorted, draft-filtered list to the rest of
// the app. Adding a new essay is just dropping a new .md file in the folder.

const FRONTMATTER_RE = /^---\s*\n([\s\S]*?)\n---\s*\n?([\s\S]*)$/;

function parseFrontmatter(raw) {
  const match = FRONTMATTER_RE.exec(raw);
  if (!match) return { data: {}, body: raw };
  const data = {};
  for (const line of match[1].split('\n')) {
    const m = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line);
    if (!m) continue;
    let value = m[2].trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1).replace(/\\"/g, '"').replace(/\\'/g, "'");
    }
    if (value === 'true') value = true;
    else if (value === 'false') value = false;
    data[m[1]] = value;
  }
  return { data, body: match[2] };
}

const modules = import.meta.glob('./essays/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
});

export const essays = Object.values(modules)
  .map((raw) => {
    const { data, body } = parseFrontmatter(raw);
    return { ...data, body };
  })
  .filter((e) => e.draft !== true && e.slug)
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export function essayBySlug(slug) {
  return essays.find((e) => e.slug === slug);
}
