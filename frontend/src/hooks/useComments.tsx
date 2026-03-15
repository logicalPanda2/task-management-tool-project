import { useEffect, useState } from "react";

export default function useComments(initial: ProjectComment[] = []) {
    const [list, setList] = useState<ProjectComment[]>(initial ?? []);

    useEffect(() => {
        setList(initial);
    }, [initial]);

	const post = (user: string, content: string): void => {
        const newComment = {
            user: user,
            title: content,
            id: crypto.randomUUID(),
        };

		setList([...list, newComment]);
	};

	const remove = (comment: ProjectComment): void => {
		setList([...list.filter((c) => c.id !== comment.id)]);
	};

    return {
        list,
        post,
        remove,
    };
}
