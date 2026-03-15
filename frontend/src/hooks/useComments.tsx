import { useState } from "react";
import api from "../api/api";

export default function useComments(initial: ProjectComment[] = []) {
    const [list, setList] = useState<ProjectComment[]>(initial ?? []);

	const post = async (content: string, projectId: string): Promise<void> => {
        const newComment = {
            title: content,
            id: crypto.randomUUID(),
        };

        await api.post(`/api/projects/${projectId}/comments`, { comment: newComment });
        const res = await api.get(`/api/projects/${projectId}/comments`);

		setList(res.data.comments);
	};

	const remove = async (comment: ProjectComment): Promise<void> => {
        await api.delete(`/api/comments/${comment.id}`);

		setList([...list.filter((c) => c.id !== comment.id)]);
	};

    return {
        list,
        setList,
        post,
        remove,
    };
}
