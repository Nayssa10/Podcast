import { NextResponse } from "next/server";
import { getAdminUsername, getAdminPassword, createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { username, password } = body;

    const expectedUsername = getAdminUsername();
    const expectedPassword = getAdminPassword();

    const normalizedUsername = (username || "").trim().toLowerCase();
    const isUserValid = normalizedUsername === expectedUsername.toLowerCase();
    const isPassValid = password === expectedPassword;

    if (!isUserValid || !isPassValid) {
      return NextResponse.json(
        { success: false, error: "Usuario o contraseña incorrectos" },
        { status: 401 }
      );
    }

    const token = await createSessionToken(expectedUsername);
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
