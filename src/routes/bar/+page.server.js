import { fail, redirect } from '@sveltejs/kit';
import { apiPost, apiFetch } from '@/utils/api.js';
import { checkAndSetRefreshTokens, createAdminObject } from '@/transport/auth';

export async function load({ params }) {
	const res = await apiFetch(`/bars/${params.slug}`);
	if (!res.ok) {
		throw new Error('Failed to load bar data');
	}
	const barPrice = await res.json();
	return { barPrice };
}

export const actions = {
	updatePrice: async ({ request, fetch, cookies }) => {
		const form = Object.fromEntries(await request.formData());
		const payload = {
			price_id: Number(form.price_id),
			price: Number(form.price)
		};
		console.log(payload);

		const admin = createAdminObject(cookies);
		const res = await apiPost('/prices/update-price', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		const data = await res.json();
		console.log(data);

		return { success: true };
	},
	confirmPrice: async ({ request, fetch }) => {
		const form = Object.fromEntries(await request.formData());

		const payload = {
			price_id: Number(form.price_id)
		};
		console.log(payload);

		const res = await apiPost('/prices/confirm-price', payload);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		return { success: true };
	}
};
