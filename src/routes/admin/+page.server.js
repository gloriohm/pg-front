import { fail } from '@sveltejs/kit';
import { apiFetch, apiPost } from '@/utils/api.js';
import { checkUpdatedTokens, createAdminObject } from '@/transport/auth';

export async function load({ cookies }) {
	const admin = createAdminObject(cookies);
	const res = await apiFetch('/admin/prices/price-control', admin);
	if (!res.ok) {
		throw new Error('Failed to load prices to control');
	}
	const control = await res.json();

	checkUpdatedTokens(res, cookies);

	return { control };
}

export const actions = {
	default: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const form = Object.fromEntries(await request.formData());
		const payload = {
			id: Number(form.id),
			action: form.action
		};
		console.log(payload);

		const res = await apiPost('/admin/prices/price-control', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	}
};
