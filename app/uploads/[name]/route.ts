import { NextResponse } from "next/server";
import { stat, readFile } from "node:fs/promises";
import path from "node:path";

const MIME: Record<string, string> = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".avif": "image/avif",
};

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ name: string }> },
) {
  const { name } = await params;

  if (name.includes("/") || name.includes("\\") || name.includes("..")) {
    return new NextResponse("Not found", { status: 404 });
  }

  const ext = path.extname(name).toLowerCase();
  const type = MIME[ext];
  if (!type) return new NextResponse("Not found", { status: 404 });

  const filePath = path.join(process.cwd(), "public", "uploads", name);

  try {
    await stat(filePath);
  } catch {
    return new NextResponse("Not found", { status: 404 });
  }

  const buf = await readFile(filePath);
  return new NextResponse(buf, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
