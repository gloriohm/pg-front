export const load = async ({ cookies }) => {
	const admin = !!cookies.get('access_token');
	const consent = !!cookies.get('cookie_consent');

	return {
		admin,
		consent
	};
};
