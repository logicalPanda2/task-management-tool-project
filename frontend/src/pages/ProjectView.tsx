import { useParams } from "react-router-dom";
import NotFound from "./NotFound";
import { useState } from "react";
import useTasks from "../hooks/useTasks";
import useComments from "../hooks/useComments";

export default function ProjectView() {
    const params = useParams();

    if(!("id" in params)) return <NotFound />;

    // replace all data below with a fetch for project(params.id)
	const project = {
		title: "Placeholder project",
		description:
			"this is just a placeholder, folks. Lorem ipsum dolor sit amet consectetur adipiscing elit.",
		status: "INCOMPLETE",
		id: crypto.randomUUID(),
	};
    const tasks = useTasks([
        {
            title: "Task 1",
            status: "INCOMPLETE",
            id: crypto.randomUUID(),
        },
        {
            title: "Task 2",
            status: "INCOMPLETE",
            id: crypto.randomUUID(),
        },
        {
            title: "Task 3",
            status: "INCOMPLETE",
            id: crypto.randomUUID(),
        },
    ]);
	const comments = useComments([
		{
			user: "User 1",
			title: "Cool project my guy",
			id: crypto.randomUUID(),
		},
		{
			user: "User 2",
			title: "Looks good dude, good luck!",
			id: crypto.randomUUID(),
		},
	]);
	const [commentField, setCommentField] = useState<string>("");

    const postComment = (userEmail: string, content: string): void => {
        if(!commentField.trim()) return;
        
        comments.post(userEmail, content);
        setCommentField("");
    }

	return (
		<>
			<article>
				<section className="mb-8">
					<header>
						<h2 className="text-3xl mb-4">
							{project.title}
						</h2>
					</header>
					<p className="text-xl mb-2 max-w-2xl">
						{project.description}
					</p>
					<p className="text-xl max-w-2xl">
						This project is{" "}
						<span className="font-semibold">
							{project.status.toLowerCase()}
						</span>
						.
					</p>
				</section>
				<section className="mb-8">
					<header>
						<h2 className="text-3xl mb-4">Tasks</h2>
					</header>
					{tasks &&
					tasks.list.length > 0 ? (
						tasks.list.map((t) => (
							<div
								className="flex flex-row justify-between items-center relative mb-4 border max-w-2xl p-4 rounded"
								key={t.id}
							>
								<p className="text-xl ml-2">{t.title}</p>
								{t.status === "INCOMPLETE" ? (
									<button
										className="mr-2 px-2 py-0.5 bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800"
										onClick={() => tasks.editStatus(t, "COMPLETE")}
									>
										Mark as done
									</button>
								) : (
									<div>
										<p className="mr-4 inline-block">
											Complete
										</p>
										<button
											className="mr-2 px-2 py-0.5 bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800"
											onClick={() =>
												tasks.editStatus(t, "INCOMPLETE")
											}
										>
											Revert
										</button>
									</div>
								)}
							</div>
						))
					) : (
						<p className="text-xl text-neutral-900">
							There are no tasks yet.
						</p>
					)}
				</section>
				<section className="mb-8">
					<header>
						<h2 className="text-3xl mb-4">Comments</h2>
					</header>
					{comments.list.length > 0 ? (
						comments.list.map((c) => (
							<div
								className="flex flex-row flex-nowrap justify-between items-center mb-4 border max-w-2xl p-4 rounded"
								key={c.id}
							>
								<div>
									<p className="mb-2">{c.user}</p>
									<p className="text-xl">{c.title}</p>
								</div>
								<button
									className="bg-red-600 rounded text-white hover:bg-red-700 focus-visible:outline-0 focus-visible:bg-red-700 active:bg-red-800 px-2 py-0.5 transition mr-2"
									onClick={() => comments.remove(c)}
								>
									Delete
								</button>
							</div>
						))
					) : (
						<p className="text-xl text-neutral-900">
							There are no comments yet.
						</p>
					)}
					<div className="flex flex-row flex-nowrap items-center mt-8">
						<input
							required
							autoComplete="false"
							type="text"
							name="comment"
							id="commentInput"
							placeholder="Say something.."
							className="border rounded focus-visible:outline-1 px-4 py-2"
							value={commentField}
							onChange={(e) => setCommentField(e.target.value)}
						/>
						<button
							className="bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800 py-1 px-3 ml-4"
							onClick={() => postComment("placeholderEmail", commentField)}
						>
							Post
						</button>
					</div>
				</section>
				<button className="bg-black rounded text-white hover:bg-neutral-900 focus-visible:outline-0 focus-visible:bg-neutral-900 active:bg-neutral-800 py-1.5 px-4 mr-4 transition">
					Edit Project
				</button>
				<button className="bg-red-600 rounded text-white hover:bg-red-700 focus-visible:outline-0 focus-visible:bg-red-700 active:bg-red-800 py-1.5 px-4 transition">
					Delete Project
				</button>
			</article>
		</>
	);
}
