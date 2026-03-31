export function clearOptionalCookies() {
	deleteCookie('_ga');
	setConsent(false);
}

function deleteCookie(name, path = '/') {
	document.cookie = `${encodeURIComponent(name)}=; Max-Age=0; path=${path}`;
}

export function setConsent(value) {
	console.log('function ran');
	document.cookie = `cookie_consent=${value}; path=/; max-age=${60 * 60 * 24 * 365}`;
}
