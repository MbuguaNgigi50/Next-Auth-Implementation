export { default } from 'next-auth/middleware';

/*
The Middleware is going to be applied to the entire application apart from the following routes:
	1) Home Page
	2) Register
	3) Login
	4) API
	5) Password Reset
	6) Email Verification
	7) About
	8) FAQs
	9) Features
	10) Pricing
	11) Privacy Policy
	12) Terms & Conditions
	13) _next/static (static files)
	14) _next/image (image optimization files)
	15) favicon.ico (favicon file) 

All other Routes not stated here will be protected by the Next-Auth.js Middleware
*/

export const config = {
	matcher: [
		'/((?!register|login|api|password-reset|email-verification|about|faqs|features|pricing|privacy-policy|terms-and-conditions|_next/static|_next/image|favicon.ico).*)',
	],
};
