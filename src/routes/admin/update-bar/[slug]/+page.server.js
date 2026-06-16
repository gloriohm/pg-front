import { fail, redirect } from '@sveltejs/kit';
import { apiPost, apiFetch } from '@/utils/api.js';
import { checkUpdatedTokens, createAdminObject } from '@/transport/auth';

export async function load({ params, cookies }) {
	const admin = createAdminObject(cookies);
	const res = await apiFetch(`/admin/bars/${params.slug}`, admin);
	if (!res.ok) {
		throw new Error('Failed to load bar data');
	}
	const barPrice = await res.json();

	return { barPrice };
}

export const actions = {
	updateBar: async ({ request, cookies, params }) => {
		const admin = createAdminObject(cookies);
		const form = Object.fromEntries(await request.formData());
		const payload = {
			id: Number(form.id),
			name: form.name,
			address: form.address,
			brewery_id: Number(form.brewery),
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
	deleteBar: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const form = Object.fromEntries(await request.formData());
		const payload = {
			bar_id: Number(form.bar_id)
		};
		console.log(payload);

		const res = await apiPost('/admin/bars/delete-bar', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	},
	newPrice: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const formData = await request.formData();
		const form = Object.fromEntries(formData);
		const payload = {
			drink_id: Number(form.target_id),
			price: Number(form.price),
			price_type: form.price_type,
			days: formData.getAll('days'),
			time: form.time,
			end_time: form.end_time
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
	},
	recreateSchedule: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const formData = await request.formData();
		const form = Object.fromEntries(formData);
		const payload = {
			drink_id: Number(form.drink_id)
		};
		console.log(payload);

		const res = await apiPost('/admin/prices/recreate-schedule', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	},
	updateBrewery: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const formData = await request.formData();
		const form = Object.fromEntries(formData);
		const payload = {
			drink_id: Number(form.drink_id),
			brewery_id: Number(form.brewery_id)
		};
		console.log(payload);

		const res = await apiPost('/admin/brewery/update-brewery', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	},
	deletePrice: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const form = Object.fromEntries(await request.formData());
		const payload = {
			price_id: Number(form.price_id)
		};
		console.log(payload);

		const res = await apiPost('/admin/prices/delete-price', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	},
	changeSize: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const form = Object.fromEntries(await request.formData());
		const payload = {
			drink_id: Number(form.drink_id),
			size: Number(form.size),
			price: Number(form.price)
		};
		console.log(payload);

		const res = await apiPost('/admin/prices/update-size', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	},
	updatePriceTime: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const formData = await request.formData();
		const form = Object.fromEntries(formData);
		const payload = {
			price_id: Number(form.target_id),
			price: Number(form.price),
			price_type: form.price_type,
			days: formData.getAll('days'),
			time: form.time
		};
		console.log(payload);

		const res = await apiPost('/admin/prices/update-time', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	}
};
