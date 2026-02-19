type Status = "COMPLETE" | "INCOMPLETE";

interface Task {
    title: string,
    status: Status,
    id: string,
}

interface Project {
    title: string,
    description: string,
    status: Status,
    tasks: Task[],
}

interface FormTask extends Task {
    formName: string,
}
