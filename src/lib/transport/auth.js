export function checkAndSetRefreshTokens(data, cookies) {
	if (data.accessToken) {
		cookies.set('access_token', data.accessToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 // 1 hour
		});
	}

	if (data.refreshToken) {
		cookies.set('refresh_token', data.refreshToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});
	}
}

export function createAdminObject(cookies) {
	return {
		accessToken: cookies.get('access_token'),
		refreshToken: cookies.get('refresh_token')
	};
}

export function checkUpdatedTokens(res, cookies) {
	const prefix = 'Bearer ';
	const bearer = res.headers.get('Authorization');
	const accessToken = bearer?.startsWith(prefix) ? bearer.slice(prefix.length) : '';
	const refreshToken = res.headers.get('Refresh-Token');
	if (accessToken) {
		cookies.set('access_token', accessToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 // 1 hour
		});
	}
	if (refreshToken) {
		cookies.set('refresh_token', refreshToken, {
			path: '/',
			httpOnly: true,
			sameSite: 'lax',
			secure: false,
			maxAge: 60 * 60 * 24 * 365 // 1 year
		});
	}
}
