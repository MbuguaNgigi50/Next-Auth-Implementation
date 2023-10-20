export { default } from "next-auth/middleware";

/*
The Middleware is going to be applied to the entire application apart from the following routes:
	1) Home Page
	2) Register
	3) Login
	4) API
	5) Password Reset
	6) About
	7) FAQs
	8) Features
	9) Pricing
	10) Privacy Policy
	11) Terms & Conditions

All other Routes not stated here will be protected by the Next-Auth.js Middleware
*/

export const config = {
	matcher: ['/dashboard']
}
/*export const config = {
	matcher: [
		"/((?!|register|api|login|password-reset|about|faqs|features|pricing|privacy-policy|terms-and-conditions|/).*)",
	],
};
*/

