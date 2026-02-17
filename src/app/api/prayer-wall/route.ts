import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data.prayerRequests.filter((p) => p.approved));
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = getSiteData();

  const newRequest = {
    id: Date.now().toString(),
    name: body.name,
    request: body.request,
    date: new Date().toISOString().split("T")[0],
    approved: false,
  };

  data.prayerRequests.push(newRequest);
  writeSiteData(data);
  return NextResponse.json(newRequest, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const idx = data.prayerRequests.findIndex((p) => p.id === body.id);
  if (idx === -1) {
    return NextResponse.json({ error: "Petición no encontrada" }, { status: 404 });
  }

  data.prayerRequests[idx] = { ...data.prayerRequests[idx], ...body };
  writeSiteData(data);
  return NextResponse.json(data.prayerRequests[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = getSiteData();

  data.prayerRequests = data.prayerRequests.filter((p) => p.id !== id);
  writeSiteData(data);
  return NextResponse.json({ success: true });
}
