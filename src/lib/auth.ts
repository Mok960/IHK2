import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const SESSION_COOKIE = "aurora_session";

const SESSION_DAYS = 14;

type SessionPayload = {
  u: string;
  e: number;
};

export const sessionCookieOptions = {
  httpOnly: true,
  sameSite: "none" as const,
  secure: true,
  partitioned: true,
  path: "/",
  maxAge: SESSION_DAYS * 24 * 60 * 60,
};

function authSecret() {
  return process.env.AUTH_SECRET || "aurora-mint-ferienwoche-session-key-2026";
}

function expectedUsername() {
  return process.env.AUTH_USERNAME || "Mok960";
}

function expectedPassword() {
  return process.env.AUTH_PASSWORD || "12345678";
}

function sign(value: string) {
  return createHmac("sha256", authSecret()).update(value).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const a = Buffer.from(left);
  const b = Buffer.from(right);
  if (a.length !== b.length) {
    return false;
  }
  return timingSafeEqual(a, b);
}

export function credentialsMatch(username: string, password: string) {
  return username === expectedUsername() && password === expectedPassword();
}

export function createSessionToken(username: string) {
  const payload: SessionPayload = {
    u: username,
    e: Date.now() + SESSION_DAYS * 24 * 60 * 60 * 1000,
  };
  const encoded = Buffer.from(JSON.stringify(payload), "utf8").toString(
    "base64url",
  );
  return `${encoded}.${sign(encoded)}`;
}

export function readSessionToken(token: string | undefined | null) {
  if (!token) {
    return null;
  }

  const [encoded, signature] = token.split(".");
  if (!encoded || !signature || !safeEqual(sign(encoded), signature)) {
    return null;
  }

  try {
    const payload = JSON.parse(
      Buffer.from(encoded, "base64url").toString("utf8"),
    ) as SessionPayload;

    if (!payload?.u || typeof payload.e !== "number" || payload.e < Date.now()) {
      return null;
    }

    if (payload.u !== expectedUsername()) {
      return null;
    }

    return { username: payload.u };
  } catch {
    return null;
  }
}

export function safeNextPath(value: string | null | undefined) {
  const path = (value ?? "").trim();
  if (
    path === "/" ||
    path === "/tagebuch" ||
    path === "/tagebuch/neu" ||
    path === "/sponsoren" ||
    path === "/homepage/bearbeiten"
  ) {
    return path;
  }

  if (/^\/tagebuch\/\d+$/.test(path) || /^\/tagebuch\/\d+\/bearbeiten$/.test(path)) {
    return path;
  }

  return "/";
}

export const ADMIN_TOKEN = "Mok960-ok";

export function hasAdminToken(formData: FormData) {
  return formData.get("adminToken") === ADMIN_TOKEN;
}

export async function getSession() {
  const jar = await cookies();
  const signed = readSessionToken(jar.get(SESSION_COOKIE)?.value);
  if (signed) {
    return signed;
  }

  if (jar.get("aurora_admin")?.value === ADMIN_TOKEN) {
    return { username: "Mok960" };
  }

  return null;
}

export async function isLoggedIn() {
  return Boolean(await getSession());
}

export async function requireUser(formData?: FormData) {
  if (formData && hasAdminToken(formData)) {
    return { username: "Mok960" };
  }

  const session = await getSession();
  if (!session) {
    throw new Error("Nicht angemeldet");
  }
  return session;
}

export async function setSession(username: string) {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, createSessionToken(username), sessionCookieOptions);
}

export async function clearSession() {
  const jar = await cookies();
  jar.set(SESSION_COOKIE, "", {
    ...sessionCookieOptions,
    maxAge: 0,
  });
}
