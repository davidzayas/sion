import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const data = getSiteData();
  return NextResponse.json(data.newsletterSubscribers);
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const data = getSiteData();

  const email = body.email;

  if (data.newsletterSubscribers.some((s) => s.email === email)) {
    return NextResponse.json({ error: "Ya está suscrito" }, { status: 400 });
  }

  data.newsletterSubscribers.push({
    email,
    subscribedAt: new Date().toISOString(),
  });
  writeSiteData(data);
  return NextResponse.json({ success: true }, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");
  const data = getSiteData();

  data.newsletterSubscribers = data.newsletterSubscribers.filter(
    (s) => s.email !== email
  );
  writeSiteData(data);
  return NextResponse.json({ success: true });
}
