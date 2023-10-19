export { default } from "next-auth/middleware";

export const config = {
	matcher: [
		"/((?!register|api|login|password-reset|about|faqs|features|pricing|privacy-policy|terms-and-conditions).*)",
	],
};
