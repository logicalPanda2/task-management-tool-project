import * as commentRepo from "./commentRepo.js";
import * as userRepo from "./../users/userRepo.js";
import { isComment } from "../../shared/utils/typeGuards.js";

export async function postComment(
	comment: unknown,
	projectId: string,
	userEmail: string,
) {
	if (!isComment(comment)) return false;

	const user = await userRepo.getUserByEmail(userEmail);
	if (!user) return false;

	await commentRepo.create(comment, user.id, projectId);

	return true;
}
