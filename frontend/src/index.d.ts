type Status = "COMPLETE" | "INCOMPLETE";
type UserRole = "CONTRIBUTOR" | "CREATOR";

interface Task {
	title: string;
	status: Status;
	id: string;
}

interface Project {
	title: string;
	description: string;
	status: Status;
	tasks: Task[] | null;
	comments: ProjectComment[] | null;
	id: string;
}

interface ProjectMetadata {
	title: string;
	description: string;
	status: Status;
	id: string;
}

interface User {
	email: string;
	id: number;
}

interface ProjectComment {
	user: string;
	title: string;
	id: number;
}
