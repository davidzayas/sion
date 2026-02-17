import { NextRequest, NextResponse } from "next/server";
import { getSiteData, writeSiteData } from "@/lib/data";
import { validateToken } from "@/lib/auth";

function isAuthed(req: NextRequest): boolean {
  const token = req.cookies.get("admin_token")?.value;
  return !!token && validateToken(token);
}

export async function GET() {
  const data = getSiteData();
  return NextResponse.json({
    serviceSchedule: data.serviceSchedule,
    church: { officeHours: data.church.officeHours },
  });
}

export async function PUT(req: NextRequest) {
  if (!isAuthed(req)) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }
  const body = await req.json();
  const data = getSiteData();

  if (body.serviceSchedule) {
    data.serviceSchedule = body.serviceSchedule;
  }
  if (body.officeHours) {
    data.church.officeHours = body.officeHours;
  }

  writeSiteData(data);
  return NextResponse.json({ success: true });
}
