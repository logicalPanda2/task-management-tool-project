import bcrypt from "bcryptjs";

const SALT = 10;

export default async function hashPassword(plaintext: string) {
	return await bcrypt.hash(plaintext, SALT);
}
