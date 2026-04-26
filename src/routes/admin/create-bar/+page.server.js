import { fail } from '@sveltejs/kit';
import { apiPost } from '@/utils/api.js';
import { checkUpdatedTokens, createAdminObject } from '@/transport/auth';

export const actions = {
	default: async ({ request, cookies }) => {
		const admin = createAdminObject(cookies);
		const form = Object.fromEntries(await request.formData());
		const payload = {
			name: form.name,
			address: form.address,
			brewery: Number(form.brewery),
			orgnummer: form.orgnummer,
			osm_id: form.osm_id,
			price: Number(form.price),
			size: Number(form.size)
		};
		console.log(payload);

		const res = await apiPost('/admin/bars/create-bar', payload, admin);

		if (!res.ok) {
			const text = await res.text();
			console.log(text);
			return fail(res.status, { error: text });
		}

		checkUpdatedTokens(res, cookies);

		return { success: true };
	}
};
