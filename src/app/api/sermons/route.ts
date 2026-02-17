import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data.sermons);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const newSermon = {
    id: Date.now().toString(),
    title: body.title,
    pastor: body.pastor,
    date: body.date,
    scripture: body.scripture,
    summary: body.summary || "",
    description: body.description,
    transcript: body.transcript || "",
    videoUrl: body.videoUrl,
    audioUrl: body.audioUrl,
  };

  data.sermons.push(newSermon);
  writeSiteData(data);
  return NextResponse.json(newSermon, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const idx = data.sermons.findIndex((s) => s.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Sermón no encontrado" }, { status: 404 });
  }

  data.sermons[idx] = { ...data.sermons[idx], ...body };
  writeSiteData(data);
  return NextResponse.json(data.sermons[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = getSiteData();

  data.sermons = data.sermons.filter((s) => s.id !== id);
  writeSiteData(data);
  return NextResponse.json({ success: true });
}
