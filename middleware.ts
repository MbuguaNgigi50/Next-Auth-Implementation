import withAuth from 'next-auth/middleware';
import { authOptions } from '@/app/(authenticationLogic)/api/auth/[...nextauth]/options';

export default withAuth({
	jwt: {
		decode: authOptions.jwt?.decode
	},
	callbacks: {
		authorized: ({ token }) => !!token,
	},
})

export const config = {
	matcher: ['/dashboard/:path*'],
};
