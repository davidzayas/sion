import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data.announcements);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const newAnnouncement = {
    id: Date.now().toString(),
    title: body.title,
    content: body.content,
    date: new Date().toISOString().split("T")[0],
    active: body.active ?? true,
  };

  data.announcements.push(newAnnouncement);
  writeSiteData(data);
  return NextResponse.json(newAnnouncement, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const idx = data.announcements.findIndex((a) => a.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Anuncio no encontrado" }, { status: 404 });
  }

  data.announcements[idx] = { ...data.announcements[idx], ...body };
  writeSiteData(data);
  return NextResponse.json(data.announcements[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = getSiteData();

  data.announcements = data.announcements.filter((a) => a.id !== id);
  writeSiteData(data);
  return NextResponse.json({ success: true });
}
