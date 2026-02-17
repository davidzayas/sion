import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data.events);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const newEvent = {
    id: Date.now().toString(),
    title: body.title,
    date: body.date,
    time: body.time,
    description: body.description,
    recurring: body.recurring || false,
  };

  data.events.push(newEvent);
  writeSiteData(data);
  return NextResponse.json(newEvent, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const idx = data.events.findIndex((e) => e.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Evento no encontrado" }, { status: 404 });
  }

  data.events[idx] = { ...data.events[idx], ...body };
  writeSiteData(data);
  return NextResponse.json(data.events[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = getSiteData();

  data.events = data.events.filter((e) => e.id !== id);
  writeSiteData(data);
  return NextResponse.json({ success: true });
}
