import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET(req: NextRequest) {
  const data = getSiteData();
  // Authenticated admins see all bulletins; public sees only published
  const results = isAuthed(req)
    ? data.bulletins
    : data.bulletins.filter((b) => b.published);
  results.sort((a, b) => (b.date || "").localeCompare(a.date || ""));
  return NextResponse.json(results);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const newBulletin = {
    id: Date.now().toString(),
    title: body.title,
    date: body.date,
    summary: body.summary || "",
    content: body.content || "",
    published: body.published ?? false,
  };

  data.bulletins.push(newBulletin);
  writeSiteData(data);
  return NextResponse.json(newBulletin, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const idx = data.bulletins.findIndex((b) => b.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Boletín no encontrado" }, { status: 404 });
  }

  data.bulletins[idx] = { ...data.bulletins[idx], ...body };
  writeSiteData(data);
  return NextResponse.json(data.bulletins[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = getSiteData();

  data.bulletins = data.bulletins.filter((b) => b.id !== id);
  writeSiteData(data);
  return NextResponse.json({ success: true });
}
