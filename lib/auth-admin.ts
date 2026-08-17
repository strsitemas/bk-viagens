import "server-only";

import { cookies } from "next/headers";
import { SignJWT, jwtVerify } from "jose";

const COOKIE_NAME = "buckart_admin_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 8;

type SessionPayload = {
  userId: string;
  empresaId: string;
  nome: string;
  email: string;
  papel: string;
};

function getSecret() {
  const secret = process.env.AUTH_SECRET;

  if (!secret) {
    throw new Error("AUTH_SECRET nao configurada.");
  }

  return new TextEncoder().encode(secret);
}

export async function criarSessao(
  payload: SessionPayload
) {
  const token = await new SignJWT({
    empresaId: payload.empresaId,
    nome: payload.nome,
    email: payload.email,
    papel: payload.papel,
  })
    .setProtectedHeader({
      alg: "HS256",
    })
    .setSubject(payload.userId)
    .setIssuedAt()
    .setExpirationTime(
      `${SESSION_DURATION_SECONDS}s`
    )
    .sign(getSecret());

  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_DURATION_SECONDS,
  });
}

export async function obterSessao(): Promise<
  SessionPayload | null
> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(
      token,
      getSecret(),
      {
        algorithms: ["HS256"],
      }
    );

    if (
      !payload.sub ||
      typeof payload.empresaId !== "string" ||
      typeof payload.nome !== "string" ||
      typeof payload.email !== "string" ||
      typeof payload.papel !== "string"
    ) {
      return null;
    }

    return {
      userId: payload.sub,
      empresaId: payload.empresaId,
      nome: payload.nome,
      email: payload.email,
      papel: payload.papel,
    };
  }
  catch {
    return null;
  }
}

export async function destruirSessao() {
  const cookieStore = await cookies();

  cookieStore.set(COOKIE_NAME, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: new Date(0),
  });
}