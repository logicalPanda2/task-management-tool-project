import { Link } from "react-router-dom";

export default function Home() {
	const projects: Project[] = [
		{
			title: "Placeholder project",
			description:
				"this is just a placeholder, folks. Lorem ipsum dolor sit amet consectetur adipiscing elit. Adipiscing elit. Longer description, act like this is important. This is definitely important.",
			status: "INCOMPLETE",
			id: crypto.randomUUID(),
		},
	];
    // some role based API fetch that gets all projects

	return projects.length > 0 ? (
		projects.map((project) => (
			<div
				className="max-w-2xl md:w-4/5 mb-6 p-6 shadow-bold rounded-lg relative"
				key={project.title}
			>
				<p className="text-2xl font-semibold mb-2 text-primary">{project.title}</p>
				<p className="mb-6 text-secondary">{project.description}</p>
                <div className="hover:transform-[translateY(-1px)] transition-custom-all w-fit">
                    <Link
                        to={`project/${project.id}`}
                        className="bg-gradient shadow-default text-primary px-4 py-1.5 rounded-lg active:shadow-pressed active:bg-gradient-pressed active:text-secondary focus-visible:outline-1 transition-custom-all hover:text-secondary"
                    >
                        View
                    </Link>
                </div>
			</div>
		))
	) : (
		<>
			<p className="text-center text-2xl text-neutral-900 mb-2">
				There are no projects yet.
			</p>
			<p className="relative text-center text-xl text-neutral-900">
				Create a new project by clicking the{" "}
				<span className="relative bottom-0.75 text-xs bg-black text-white rounded px-2.5 py-1">
					New
				</span>{" "}
				button!
			</p>
		</>
	);
}
