import crypto from "crypto";

const algorithm = "aes-256-cbc";
const key = "bfe20d5b739173f11804fff306cc5366d7158c9470010c50b40d10fa7bfcffd7"; // 32 bytes key
const ivLength = 16; // For AES, this is always 16

export function encrypt(text) {
  console.log("Text", text);
  const iv = crypto.randomBytes(ivLength);
  console.log("iv", iv);
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key, "hex"), iv);
  console.log("cipher", cipher);
  let encrypted = cipher.update(text, "utf8", "hex");
  console.log("encrypted1", encrypted);
  encrypted += cipher.final("hex");
  console.log("encrypted2", encrypted);
  return `${iv.toString("hex")}:${encrypted}`;
}

export function decrypt(text) {
  // Ensure the text is not undefined and has the correct format
  if (!text || typeof text !== "string" || !text.includes("%3A")) {
    throw new Error("Invalid token format");
  }

  const [iv, encryptedText] = text.split("%3A");

  // Ensure iv and encryptedText are defined
  if (!iv || !encryptedText) {
    throw new Error("Invalid token structure");
  }

  const ivBuffer = Buffer.from(iv, "hex");
  const decipher = crypto.createDecipheriv(
    algorithm,
    Buffer.from(key, "hex"),
    ivBuffer
  );

  let decrypted = decipher.update(encryptedText, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
