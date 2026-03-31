import { fail, redirect } from '@sveltejs/kit';
import { apiPost, apiFetch } from '@/utils/api.js';
import { checkUpdatedTokens, createAdminObject } from '@/transport/auth';

export async function load({ params }) {
	const res = await apiFetch(`/bars/${params.slug}`);
	if (!res.ok) {
		throw new Error('Failed to load bar data');
	}
	const barPrice = await res.json();

	return { barPrice };
}

export const actions = {
	updateBar: async ({ request, fetch, cookies, params }) => {
		const admin = createAdminObject(cookies);
		const form = Object.fromEntries(await request.formData());
		const payload = {
			id: Number(form.id),
			name: form.name,
			address: form.address,
			brewery: form.brewery,
			orgnummer: form.orgnummer
		};
		console.log(payload);

		const res = await apiPost('/admin/bars/update-bar', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		const slug = await res.json();

		checkUpdatedTokens(res, cookies);

		if (slug !== params.slug) {
			throw redirect(303, `/admin/update-bar/${slug}`);
		}

		return { success: true };
	},
	deactivateBar: async ({ request, fetch, cookies }) => {
		const admin = createAdminObject(cookies);
		const form = Object.fromEntries(await request.formData());
		const payload = {
			id: Number(form.id)
		};
		console.log(payload);

		const res = await apiPost('/admin/bars/deactivate-bar', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	},
	newPrice: async ({ request, fetch, cookies }) => {
		const admin = createAdminObject(cookies);
		const formData = await request.formData();
		const form = Object.fromEntries(formData);
		const payload = {
			bar_id: Number(form.bar_id),
			price: Number(form.price),
			size: Number(form.size),
			days: formData.getAll('days'),
			from_time: form.from_time,
			until_time: form.until_time
		};
		console.log(payload);

		const res = await apiPost('/admin/prices/create-price', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	}
};
