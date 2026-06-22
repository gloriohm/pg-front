import { fail } from '@sveltejs/kit';
import { apiPost } from '@/utils/api.js';
import { createAdminObject } from '@/transport/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		const form = Object.fromEntries(await request.formData());
		const payload = {
			id: Number(form.bar_id),
			lat: Number(form.lat),
			lng: Number(form.lng)
		};
		console.log(payload);

		const admin = createAdminObject(cookies);
		const res = await apiPost('/admin/bars/update-location', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		return { success: true };
	}
};
