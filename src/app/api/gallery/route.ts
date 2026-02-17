import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data.gallery);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const newPhoto = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description,
    category: body.category,
    imageUrl: body.imageUrl,
    date: body.date,
  };

  data.gallery.push(newPhoto);
  writeSiteData(data);
  return NextResponse.json(newPhoto, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const idx = data.gallery.findIndex((p) => p.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Foto no encontrada" }, { status: 404 });
  }

  data.gallery[idx] = { ...data.gallery[idx], ...body };
  writeSiteData(data);
  return NextResponse.json(data.gallery[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = getSiteData();

  data.gallery = data.gallery.filter((p) => p.id !== id);
  writeSiteData(data);
  return NextResponse.json({ success: true });
}
