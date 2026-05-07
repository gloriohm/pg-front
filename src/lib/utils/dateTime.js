export function formatNorwegianDate(input) {
	const date = new Date(input); // <-- parse Go time string

	if (isNaN(date)) {
		throw new Error('Invalid date input');
	}

	const months = [
		'jan.',
		'feb.',
		'mars',
		'apr.',
		'mai',
		'juni',
		'juli',
		'aug.',
		'sep.',
		'okt.',
		'nov.',
		'des.'
	];

	const now = new Date();
	const isCurrentYear = date.getFullYear() === now.getFullYear();

	const day = date.getDate();
	const month = months[date.getMonth()];

	return isCurrentYear ? `${day}. ${month}` : `${day}. ${month} ${date.getFullYear()}`;
}

export function formatTime24Oslo(input) {
	return new Date(input).toLocaleTimeString('no-NO', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		timeZone: 'Europe/Oslo'
	});
}

export function formatDateTime(input) {
	return new Date(input).toLocaleString('no-NO', {
		year: 'numeric',
		month: '2-digit',
		day: '2-digit',
		hour: '2-digit',
		minute: '2-digit'
	});
}
