import { NextRequest, NextResponse } from "next/server";
import { validateCredentials, generateToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { username, password } = body;

  if (!validateCredentials(username, password)) {
    return NextResponse.json({ error: "Credenciales inválidas" }, { status: 401 });
  }

  const token = generateToken();
  const response = NextResponse.json({ success: true });

  response.cookies.set("admin_token", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24, // 24 hours
    path: "/",
  });

  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  response.cookies.delete("admin_token");
  return response;
}
