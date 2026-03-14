export default function addBulkInsertPlaceholders(
	baseQuery: string,
	placeholdersPerItem: number,
	itemsLength: number,
) {
	const placeholders: string[] = [];
	const totalPlaceholders = itemsLength * placeholdersPerItem;
	let placeholder = "";

	for (let i = 1; i <= totalPlaceholders; i++) {
		placeholder += `$${i},`;

		if (i % placeholdersPerItem === 0) {
            const removedTrailingComma = placeholder.slice(0, placeholder.length - 1);
			placeholders.push(`(${removedTrailingComma})`);
			placeholder = "";
		}
	}

	return `${baseQuery} ${placeholders.join(",")};`;
}
