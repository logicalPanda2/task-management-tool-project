import { useState } from "react";

export default function useTasks(initial: Task[] = []) {
	const [list, setList] = useState<Task[]>(initial);
	const [taskErr, setTaskErr] = useState<string>("");

	const add = (): void => {
		setTaskErr("");

		const newTask: Task = {
			title: "",
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		};

		setList([...list, newTask]);
	};

	const editStatus = (task: Task, status: Status): void => {
		setTaskErr("");

		setList([
			...list.map((t) =>
				t.id === task.id
					? {
							...task,
							status: status,
						}
					: t,
			),
		]);
	};

	const editTitle = (task: Task, title: string): void => {
		setList([
			...list.map((t) =>
				t.id === task.id
					? {
							...task,
							title: title,
						}
					: t,
			),
		]);
	};

	const remove = (task: Task): void => {
		setTaskErr("");

		setList([...list.filter((t) => t.id !== task.id)]);
	};

	return {
		add,
		editStatus,
		editTitle,
		remove,
		taskErr,
		setTaskErr,
		list,
	};
}
