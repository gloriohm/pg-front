import { fail, redirect } from '@sveltejs/kit';
import { apiPost } from '@/utils/api.js';

export const actions = {
	default: async ({ request, fetch, cookies }) => {
		const formData = await request.formData();
		const jsonData = Object.fromEntries(formData.entries());
		console.log(jsonData);

		const res = await apiPost('/auth/login', jsonData);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(400, { error: text });
		}

		const data = await res.json();

		console.log(data);

		cookies.set('access_token', data.access_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false // true in production over HTTPS
		});

		cookies.set('refresh_token', data.refresh_token, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false
		});

		throw redirect(303, '/admin');
	}
};
