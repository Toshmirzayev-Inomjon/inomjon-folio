import { SignJWT, jwtVerify } from "jose";

type AdminToken = {
  email: string;
  role: "ADMIN";
};

function secretKey() {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length < 24) {
    throw new Error("JWT_SECRET must contain at least 24 characters.");
  }
  return new TextEncoder().encode(secret);
}

export async function createAdminToken(email: string) {
  return new SignJWT({ email, role: "ADMIN" } satisfies AdminToken)
    .setProtectedHeader({ alg: "HS256" })
    .setSubject(email)
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(secretKey());
}

export async function isAdminRequest(request: Request) {
  const header = request.headers.get("authorization");
  if (!header?.startsWith("Bearer ")) return false;

  try {
    const token = header.slice("Bearer ".length);
    const verified = await jwtVerify<AdminToken>(token, secretKey());
    return verified.payload.role === "ADMIN";
  } catch {
    return false;
  }
}
