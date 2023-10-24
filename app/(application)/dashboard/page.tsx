'use client'

import { LogoutButton } from '@/components/auth';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Dashboard() {
	const { data: session } = useSession({
		required: true,
		onUnauthenticated() {
			redirect('/login?callbackUrl=/dashboard')
		}
	})
	return (
		<main>
			<div>This is the Dashboard. It is a PROTECTED ROUTE
				Welcome {session?.user?.name}
			</div>
			<LogoutButton />
		</main>
	);
}
