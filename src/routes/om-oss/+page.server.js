import { PUBLIC_API_BASE } from '$env/static/public';

export async function load() {
  const res = await fetch(`${PUBLIC_API_BASE}/api/v1/stats/about`);
	if (!res.ok) {
    throw new Error('Failed to load about data');
  }
  const about = await res.json();
  return { about };
}