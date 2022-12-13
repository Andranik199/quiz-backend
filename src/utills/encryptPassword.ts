import { createHmac } from "crypto";

export const encryptPassword = (password, salt) => {
  return createHmac("sha256", salt).update(password).digest("hex");
}
