import withAuth from 'next-auth/middleware';
import { authOptions } from '@/app/(authenticationLogic)/api/auth/[...nextauth]/options';
import { NextRequest } from 'next/server';

export default withAuth({
	jwt: {
		decode: authOptions.jwt?.decode,
	},
	callbacks: {
		authorized: ({ token }) => !!token,
	},
});

export async function middleware(req: NextRequest) {
	const token = req.cookies.get('user-token')?.value

	/*const verifiedToken = token && await verifyAuth(token).catch((error) => {
		console.log(error)
	})
}
*/
}

export const config = {
	matcher: ['/dashboard/:path*'],
};
