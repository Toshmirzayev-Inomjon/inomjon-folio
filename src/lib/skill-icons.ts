const skillIconSlugs: Record<string, string> = {
  "next.js": "nextdotjs",
  "node.js": "nodedotjs",
  nodejs: "nodedotjs",
  postgresql: "postgresql",
  "tailwind css": "tailwindcss",
  tailwind: "tailwindcss",
  typescript: "typescript",
  javascript: "javascript"
};

export function skillIconUrl(name: string) {
  const normalized = name.trim().toLowerCase();
  const slug = skillIconSlugs[normalized] ?? normalized.replace(/\+/g, "plus").replace(/#/g, "sharp").replace(/[^a-z0-9]/g, "");
  return `https://cdn.simpleicons.org/${slug}`;
}
