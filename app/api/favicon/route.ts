import { NextResponse } from "next/server";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

const USER_AGENT =
  "Mozilla/5.0 (compatible; HelmDashboard/1.0; +https://github.com)";
const FETCH_TIMEOUT = 10_000;

const EXT_BY_MIME: Record<string, string> = {
  "image/png": ".png",
  "image/jpeg": ".jpg",
  "image/webp": ".webp",
  "image/gif": ".gif",
  "image/svg+xml": ".svg",
  "image/avif": ".avif",
  "image/x-icon": ".ico",
  "image/vnd.microsoft.icon": ".ico",
};
const ALLOWED_EXT = new Set([
  ".png", ".jpg", ".jpeg", ".webp", ".gif", ".svg", ".avif", ".ico",
]);

interface Candidate {
  url: string;
  size: number; // largest known dimension; 0 = unknown
}

const fetchWithTimeout = (url: string, init?: RequestInit) =>
  fetch(url, {
    ...init,
    headers: { "User-Agent": USER_AGENT, ...(init?.headers ?? {}) },
    signal: AbortSignal.timeout(FETCH_TIMEOUT),
  });

// Parse a `sizes` attribute like "192x192" or "any" into a comparable number.
const parseSizes = (sizes?: string | null): number => {
  if (!sizes) return 0;
  if (sizes.toLowerCase() === "any") return 1000; // scalable, treat as large
  let max = 0;
  for (const token of sizes.split(/\s+/)) {
    const m = token.match(/(\d+)x(\d+)/i);
    if (m) max = Math.max(max, Number(m[1]), Number(m[2]));
  }
  return max;
};

const getAttr = (tag: string, name: string): string | null => {
  const m = tag.match(new RegExp(`${name}\\s*=\\s*["']([^"']*)["']`, "i"));
  return m ? m[1] : null;
};

const absolute = (href: string | null, base: string): string | null => {
  if (!href) return null;
  try {
    return new URL(href, base).toString();
  } catch {
    return null;
  }
};

const collectFromHtml = (html: string, pageUrl: string): Candidate[] => {
  const candidates: Candidate[] = [];
  const linkTags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of linkTags) {
    const rel = getAttr(tag, "rel")?.toLowerCase();
    if (!rel) continue;
    const href = absolute(getAttr(tag, "href"), pageUrl);
    if (!href) continue;
    const size = parseSizes(getAttr(tag, "sizes"));
    if (rel.includes("apple-touch-icon")) {
      // apple-touch-icons are reliably high-res (typically 180) when unsized.
      candidates.push({ url: href, size: size || 180 });
    } else if (rel.split(/\s+/).includes("icon") || rel.includes("shortcut")) {
      candidates.push({ url: href, size });
    }
  }
  return candidates;
};

const manifestUrl = (html: string, pageUrl: string): string | null => {
  const tags = html.match(/<link\b[^>]*>/gi) ?? [];
  for (const tag of tags) {
    if (getAttr(tag, "rel")?.toLowerCase() === "manifest") {
      return absolute(getAttr(tag, "href"), pageUrl);
    }
  }
  return null;
};

const collectFromManifest = async (
  url: string,
): Promise<Candidate[]> => {
  try {
    const res = await fetchWithTimeout(url);
    if (!res.ok) return [];
    const json = (await res.json()) as {
      icons?: { src?: string; sizes?: string }[];
    };
    const out: Candidate[] = [];
    for (const icon of json.icons ?? []) {
      const abs = absolute(icon.src ?? null, url);
      if (abs) out.push({ url: abs, size: parseSizes(icon.sizes) });
    }
    return out;
  } catch {
    return [];
  }
};

const extFor = (contentType: string | null, url: string): string | null => {
  const mime = contentType?.split(";")[0].trim().toLowerCase();
  if (mime && EXT_BY_MIME[mime]) return EXT_BY_MIME[mime];
  const urlExt = path.extname(new URL(url).pathname).toLowerCase();
  return ALLOWED_EXT.has(urlExt) ? urlExt : null;
};

export async function POST(request: Request) {
  let target: URL;
  try {
    const body = (await request.json()) as { url?: string };
    if (!body.url) throw new Error("missing url");
    target = new URL(body.url);
    if (target.protocol !== "http:" && target.protocol !== "https:") {
      throw new Error("bad protocol");
    }
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  // 1. Fetch the page HTML and gather icon candidates.
  let candidates: Candidate[] = [];
  try {
    const res = await fetchWithTimeout(target.toString());
    if (res.ok) {
      const html = await res.text();
      candidates.push(...collectFromHtml(html, res.url || target.toString()));
      const manifest = manifestUrl(html, res.url || target.toString());
      if (manifest) candidates.push(...(await collectFromManifest(manifest)));
    }
  } catch {
    // Network/parse failure — fall through to the favicon.ico fallback.
  }

  // Always include the conventional fallback.
  candidates.push({ url: new URL("/favicon.ico", target).toString(), size: 0 });

  // 2. Best resolution first; de-duplicate by URL.
  const seen = new Set<string>();
  candidates = candidates
    .filter((c) => (seen.has(c.url) ? false : (seen.add(c.url), true)))
    .sort((a, b) => b.size - a.size);

  // 3. Download the first candidate that yields a usable image.
  for (const candidate of candidates) {
    try {
      const res = await fetchWithTimeout(candidate.url);
      if (!res.ok) continue;
      const ext = extFor(res.headers.get("content-type"), candidate.url);
      if (!ext) continue;
      const buffer = Buffer.from(await res.arrayBuffer());
      if (buffer.byteLength === 0) continue;

      const name = `${crypto.randomUUID()}${ext}`;
      const uploadsDir = path.join(process.cwd(), "public", "uploads");
      await mkdir(uploadsDir, { recursive: true });
      await writeFile(path.join(uploadsDir, name), buffer);
      return NextResponse.json({ url: `/uploads/${name}` });
    } catch {
      // Try the next candidate.
    }
  }

  return NextResponse.json(
    { error: "Could not find an icon for that site" },
    { status: 404 },
  );
}
