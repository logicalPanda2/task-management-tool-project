import pool from "../../config/db.js";

export async function addNewTask(task: Task, projectId: string) {
    await pool?.query(
        `
        INSERT INTO tasks (id, title, status, project_id)
        VALUES ($1, $2, $3, $4);
        `,
        [task.id, task.title, task.status, projectId]
    );
}

export async function addNewTasks(query: string, data: string[]) {
    await pool?.query(
        query,
        data
    );
}
