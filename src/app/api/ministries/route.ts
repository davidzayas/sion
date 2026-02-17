import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET() {
  const data = getSiteData();
  return NextResponse.json(data.ministries);
}

export async function POST(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const newMinistry = {
    id: Date.now().toString(),
    name: body.name,
    icon: body.icon || "Users",
    description: body.description || "",
    content: body.content || "",
    leader: body.leader || "",
    meetingDay: body.meetingDay || "",
    meetingTime: body.meetingTime || "",
    location: body.location || "",
    contactEmail: body.contactEmail || "",
    contactPhone: body.contactPhone || "",
    imageUrl: body.imageUrl || "",
    active: body.active !== undefined ? body.active : true,
    activities: body.activities || [],
  };

  data.ministries.push(newMinistry);
  writeSiteData(data);
  return NextResponse.json(newMinistry, { status: 201 });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  const idx = data.ministries.findIndex((m) => m.id === body.id);
  if (idx === -1) {
    return NextResponse.json(
      { error: "Ministerio no encontrado" },
      { status: 404 }
    );
  }

  data.ministries[idx] = { ...data.ministries[idx], ...body };
  writeSiteData(data);
  return NextResponse.json(data.ministries[idx]);
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  const data = getSiteData();

  data.ministries = data.ministries.filter((m) => m.id !== id);
  writeSiteData(data);
  return NextResponse.json({ success: true });
}
