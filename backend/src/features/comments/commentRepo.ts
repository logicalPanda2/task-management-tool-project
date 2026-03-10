import pool from "../../config/db.js";

export async function create(comment: ProjectComment, userId: string, projectId: string) {
    await pool?.query(
        `INSERT INTO comments (title, project_id, user_id) 
        VALUES ($1, $2, $3);`,
        [comment.title, projectId, userId]
    );
}

export async function deleteById(id: string) {

}

export async function getAllByProjectId(projectId: string) {

}
