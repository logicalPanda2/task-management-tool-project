import { useState } from "react";

export default function useTasks() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [taskErr, setTaskErr] = useState<string>("");

    const add = (): void => {
		setTaskErr("");

		const newTask: Task = {
			title: `Task ${tasks.length + 1}`,
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		};

		setTasks([...tasks, newTask]);
	};

    const editStatus = (
        task: Task,
        status: Status,
    ): void => {
        setTaskErr("");

        setTasks([...tasks.map(t => t.id === task.id ? {
            ...task,
            status: status,
        } : t)]);
    }

    const remove = (
        task: Task
    ): void => {
        setTaskErr("");

        setTasks([...tasks.filter(t => t.id !== task.id)]);
    }

    return {
        add, 
        editStatus,
        remove,
        taskErr,
        setTaskErr,
        tasks,
        setTasks
    };
}
