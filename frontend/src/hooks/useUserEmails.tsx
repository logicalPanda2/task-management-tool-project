import { useState } from "react";

export default function useMembers(initialEmails: User[] = [], memberCount: number = 0) {
	const [emailField, setEmailField] = useState<string>("");
	const [count, setCount] = useState<number>(memberCount);
	const [emailFieldErr, setEmailFieldErr] = useState<string>("");
	const [emails, setEmails] = useState<User[]>(initialEmails);

	const add = (): void => {
		setEmailFieldErr("");

		if (!emailField.trim()) {
			setEmailFieldErr("Cannot be empty");
			return;
		}

		if (
			!emailField.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)
		) {
			setEmailFieldErr("Invalid email pattern");
			return;
		}

		setEmails([
			...emails,
			{
				email: emailField,
				id: count,
			},
		]);

		setEmailField("");
		setCount((c) => c + 1);
	};

	const edit = (user: User, email: string): void => {
		setEmailFieldErr("");

		if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
			setEmailFieldErr("Invalid email pattern");
		}

		setEmails([
			...emails.map((u) =>
				u.id === user.id
					? {
							...user,
							email: email,
						}
					: u,
			),
		]);
	};

	const remove = (user: User): void => {
		setEmails([...emails.filter((u) => u.id !== user.id)]);
	};

	return {
		emailField,
		setEmailField,
		emailFieldErr,
		setEmailFieldErr,
		add,
		edit,
		remove,
        emails,
	};
}
