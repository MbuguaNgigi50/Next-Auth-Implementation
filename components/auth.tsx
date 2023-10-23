'use client';

import { signIn, signOut } from 'next-auth/react';

export const LogoutButton = () => {
	return (
		<div>
			<button onClick={() => signOut()}>Sign Out</button>
		</div>
	);
};

export const LoginButton = () => {
	return (
		<div>
			<button onClick={() => signIn()}>Sign In</button>
		</div>
	);
};
