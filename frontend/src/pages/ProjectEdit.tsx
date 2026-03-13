import useFormData from "../hooks/useFormData";
import useTasks from "../hooks/useTasks";
import useMembers from "../hooks/useMembers";
// import { useParams } from "react-router-dom";

export default function ProjectEdit() {
    // const params = useParams();

    // if(!("id" in params)) return <p>Project Creation Placeholder</p>;
    // if there is no id, return as is. if there is an id, populate hooks with fetched project data from (project(params.id));
    // set an additional mode inline flag to switch text depending on edit or create
    
	const formData = useFormData();
	const tasks = useTasks();
	const members = useMembers();
    const isEditing = false;

	const sendData = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		e.preventDefault();

		validate();
	};

	const validate = () => {
		formData.setTitleErr("");
		formData.setDescriptionErr("");
		formData.setTaskFieldErr("");
		formData.setEmailFieldErr("");

		if (!tasks.list.length)
			formData.setTaskFieldErr("A project must have at least one task");

		if (!formData.title.trim()) formData.setTitleErr("Cannot be empty");
		if (!formData.description.trim()) formData.setDescriptionErr("Cannot be empty");
		tasks.list.forEach((t, i) => {
			if (!t.title.trim())
				formData.setTaskFieldErr(
					`All tasks must have a title. Check Task ${i + 1}`,
				);
		});
        members.emails.forEach((m, i) => {
            if(!m.email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/))
                formData.setEmailFieldErr(`All member emails must have a valid pattern. Check email ${i + 1}`);
        });

		if (
            formData.titleErr || 
            formData.descriptionErr || 
            formData.taskFieldErr ||
            formData.emailFieldErr
        ) {
			return false;
		}

		return true;
	};

	return (
		<form action="" className="max-w-xl">
			<section className="mb-10">
				<header>
					<h2 className="text-3xl mb-5 text-primary font-semibold">{isEditing ? "Edit project" : "New project"}</h2>
				</header>
				<div className="flex flex-col gap-1 mb-5">
					<label htmlFor="titleInput">Title</label>
					<input
						autoComplete="false"
						type="text"
						name="title"
						id="titleInput"
						className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1"
						value={formData.title}
						onChange={(e) => {
                            formData.setTitleErr("");
                            formData.setTitle(e.target.value)
                        }}
					/>
					{formData.titleErr && (
						<span className="text-sm text-danger-dark">{formData.titleErr}</span>
					)}
				</div>
				<div className="flex flex-col gap-1">
					<label htmlFor="descriptionInput">Description</label>
					<textarea
						autoComplete="false"
						name="description"
						id="descriptionInput"
						className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1 resize-none min-h-40 [scrollbar-width:none]"
						value={formData.description}
						onChange={(e) => {
                            formData.setDescriptionErr("");
                            formData.setDescription(e.target.value)
                        }}
					/>
					{formData.descriptionErr && (
						<span className="text-sm text-danger-dark">
							{formData.descriptionErr}
						</span>
					)}
				</div>
			</section>
			<section className="mb-10">
				<header>
					<h2 className="text-2xl mb-5">Tasks</h2>
				</header>
                <button
                    className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent-dark hover:transform-[translateY(-1px)] text-accent text-sm font-semibold stroke-accent hover:stroke-accent-dark"
                    onClick={(e) => {
						e.preventDefault();
                        formData.setTaskFieldErr("");
						tasks.add();
					}}
                >
                    <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                        <line x1="12" y1="5" x2="12" y2="19"/>
                        <line x1="5" y1="12" x2="19" y2="12"/>
                    </svg>
                    New task
                </button>
				{formData.taskFieldErr && (
					<span className="text-sm text-danger-dark block">
						{formData.taskFieldErr}
					</span>
				)}
				{tasks.list.map((task, index) => {
					return (
						<div className="mb-5" key={task.id}>
							<label
								htmlFor={task.id}
								className="mb-1 inline-block"
							>{`Task ${index + 1}`}</label>
							<input
								autoComplete="false"
								type="text"
								name={task.id}
								id={task.id}
								placeholder="Title"
								className="border rounded focus-visible:outline-1 px-4 py-2 max-w-xl w-full"
								value={task.title}
								onChange={(e) => {
                                    formData.setTaskFieldErr("");
									tasks.editTitle(task, e.target.value);
								}}
							/>
							<p className="mt-2">Status: {task.status}</p>
							<button
								className="bg-red-600 rounded text-white hover:bg-red-700 focus-visible:outline-0 focus-visible:bg-red-700 active:bg-red-800 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
									e.preventDefault();
									tasks.remove(task);
								}}
							>
								Remove
							</button>
							<button
								className="bg-black rounded text-white hover:bg-neutral-800 focus-visible:outline-0 focus-visible:bg-neutral-800 active:bg-neutral-700 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
									e.preventDefault();
									tasks.editStatus(task, "COMPLETE");
								}}
							>
								Mark as done
							</button>
							<button
								className="bg-black rounded text-white hover:bg-neutral-800 focus-visible:outline-0 focus-visible:bg-neutral-800 active:bg-neutral-700 px-2 py-0.5 transition mr-2 mt-4"
								onClick={(e) => {
									e.preventDefault();
									tasks.editStatus(task, "INCOMPLETE");
								}}
							>
								Mark as todo
							</button>
						</div>
					);
				})}
			</section>
			<section className="mb-10">
				<header>
					<h2 className="text-2xl mb-5">Members</h2>
				</header>
				<div>
					<div className="flex flex-row flex-nowrap items-center mb-5">
						<input
							autoComplete="false"
							type="text"
							name="userEmail"
							id="userEmailInput"
							placeholder="Add someone.."
                            className="text-primary bg-gradient rounded-lg px-4 py-2 shadow-pressed focus-visible:outline-1"
							value={formData.emailField}
							onChange={(e) => formData.setEmailField(e.target.value)}
						/>
						<button
							className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-accent-dark hover:transform-[translateY(-1px)] text-accent text-sm font-semibold stroke-accent hover:stroke-accent-dark ml-4"
							onClick={(e) => {
								e.preventDefault();
                                formData.setEmailFieldErr("");
                                if (!formData.emailField.trim()) {
                                    formData.setEmailFieldErr("Cannot be empty");
                                    return;
                                }
                                if (
                                    !formData.emailField.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                                ) {
                                    formData.setEmailFieldErr("Invalid email pattern");
                                    return;
                                }
								members.add(formData.emailField);
                                formData.setEmailField("");
							}}
						>
                            <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                                <line x1="12" y1="5" x2="12" y2="19"/>
                                <line x1="5" y1="12" x2="19" y2="12"/>
                            </svg>
							Invite
						</button>
					</div>
					{formData.emailFieldErr && (
						<span className="text-sm text-danger-dark">
							{formData.emailFieldErr}
						</span>
					)}
				</div>
				{(
					members.emails.map((u) => (
						<div
							className="flex flex-row flex-nowrap justify-between items-center mb-5 border max-w-2xl p-4 rounded"
							key={u.id}
						>
							<input
								type="text"
								id={`${u.id}`}
								name={`${u.id}`}
								value={u.email}
								onChange={(e) => {
                                    e.preventDefault();
                                    formData.setEmailFieldErr("");
                                    if (
                                        !e.target.value.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
                                    ) {
                                        formData.setEmailFieldErr("All member emails must have a valid email pattern.");
                                    }
									members.edit(u, e.target.value);
								}}
							></input>
							<button
								className="bg-red-600 rounded text-white hover:bg-red-700 focus-visible:outline-0 focus-visible:bg-red-700 active:bg-red-800 px-2 py-0.5 transition mr-2"
								onClick={(e) => {
									e.preventDefault();
									members.remove(u);
								}}
							>
								Remove
							</button>
						</div>
					))
				)}
			</section>
            <button
                className="bg-gradient shadow-default px-3 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-success-dark hover:transform-[translateY(-1px)] text-success text-sm font-semibold stroke-success hover:stroke-success-dark"
                onClick={(e) => sendData(e)}
                type="submit"
            >
                <svg className="fill-none stroke-inherit stroke-[1.5px] inline-block w-4 mr-2 mb-0.5" viewBox="0 0 24 24">
                    <polyline points="20 6 9 17 4 12"/>
                </svg>
                Confirm
            </button>
		</form>
	);
}
