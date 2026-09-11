import { NextResponse } from "next/server";
import { getAdminPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { password } = body;

    const expectedPassword = getAdminPassword();

    if (!password || password !== expectedPassword) {
      return NextResponse.json(
        { success: false, error: "Contraseña incorrecta" },
        { status: 401 }
      );
    }

    const token = await createSessionToken();
    const response = NextResponse.json({ success: true, message: "Sesión iniciada correctamente" });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 7 * 24 * 3600, // 7 days
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "Error en el servidor al autenticar" },
      { status: 500 }
    );
  }
}
