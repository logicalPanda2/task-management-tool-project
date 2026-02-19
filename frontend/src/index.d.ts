type Status = "COMPLETE" | "INCOMPLETE";

interface Task {
    title: string,
    status: Status,
    formName: string,
}

interface Project {
    title: string,
    description: string,
    status: Status,
    tasks: Task[],
}