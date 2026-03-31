import { apiFetch } from '@/utils/api';

export async function load() {
  const res = await apiFetch("/stats/about")
	if (!res.ok) {
    throw new Error('Failed to load about data');
  }
  const about = await res.json();
  return { about };
}