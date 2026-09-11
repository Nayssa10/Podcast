export const SESSION_COOKIE_NAME = "supernova_admin_session";

export function getAdminPassword(): string {
  return process.env.ADMIN_PASSWORD || "supernova2026";
}

function getSecretKey(): string {
  return process.env.ADMIN_SESSION_SECRET || getAdminPassword() + "-supernova-secret-salt-2026";
}

async function getCryptoKey(secret: string): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  return crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

function base64UrlEncode(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  let binary = "";
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

export async function createSessionToken(maxAgeSeconds = 7 * 24 * 3600): Promise<string> {
  const secret = getSecretKey();
  const key = await getCryptoKey(secret);
  const encoder = new TextEncoder();

  const payload = JSON.stringify({
    role: "admin",
    exp: Date.now() + maxAgeSeconds * 1000,
  });

  const encodedPayload = base64UrlEncode(encoder.encode(payload));
  const signatureBuffer = await crypto.subtle.sign(
    "HMAC",
    key,
    encoder.encode(encodedPayload)
  );
  const encodedSignature = base64UrlEncode(signatureBuffer);

  return `${encodedPayload}.${encodedSignature}`;
}

export async function verifySessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token || typeof token !== "string") return false;

  const parts = token.split(".");
  if (parts.length !== 2) return false;

  const [encodedPayload, encodedSignature] = parts;

  try {
    const secret = getSecretKey();
    const key = await getCryptoKey(secret);
    const encoder = new TextEncoder();

    const signatureBytes = base64UrlDecode(encodedSignature);
    const isValid = await crypto.subtle.verify(
      "HMAC",
      key,
      signatureBytes as BufferSource,
      encoder.encode(encodedPayload)
    );

    if (!isValid) return false;

    const payloadJson = new TextDecoder().decode(base64UrlDecode(encodedPayload));
    const payload = JSON.parse(payloadJson);

    if (!payload.exp || Date.now() > payload.exp) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
