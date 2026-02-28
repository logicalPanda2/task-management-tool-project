import pool from "../../config/db.js";

export async function getAllProjectMetadataByUserId(userId: string): Promise<ProjectMetadata[]> {
    const result = await pool?.query(
        `SELECT
            p.title,
            p.description,
            p.status
        FROM
            projects p
        JOIN
            user_projects up ON p.id = up.project_id
        WHERE
            up.user_id = $1;
        `,
        [userId]
    );
    const rows = result?.rows;

    return rows ? rows : [];
}
