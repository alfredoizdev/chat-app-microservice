import crypto from "crypto";

export const hashPassword = (password: string) => {
  const salt = crypto.randomBytes(16).toString("hex");
  const iterations = 10000;
  const keylen = 64;
  const digest = "sha512";

  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, iterations, keylen, digest)
    .toString("hex");
  return `${iterations}:${salt}:${hashedPassword}`;
};

export const verifyPassword = (password: string, originalHash: string) => {
  const [iterations, salt, originalHashedPassword] = originalHash.split(":");
  const keylen = 64;
  const digest = "sha512";

  const hashedPassword = crypto
    .pbkdf2Sync(password, salt, parseInt(iterations), keylen, digest)
    .toString("hex");
  return hashedPassword === originalHashedPassword;
};
