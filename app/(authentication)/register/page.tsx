/*
- This is the registration page. From here, a user will be able to register their details via the Credential Login.
- There is also an option to register via a Provider(Google or any other  provider that has been set up)
- The page will contain the Registration form that will be called from the components folder in the root directory.
- The Registration form will trigger the Registration flow that will allow the user to registration themselves.
- For more information on how the Registration flow works, refer to the API route to see the functionality.
- There is also a link that will direct them to the Sign In page as well.
*/

import { Metadata } from "next";
//import Image from "next/image";
import Link from "next/link";

import { cn } from "../../../lib/utils";
import { buttonVariants } from "../../../components/ui/button";
import { UserRegistrationAuthForm } from "../../../components/registrationForm";

export const metadata: Metadata = {
	title: "Register for an Account",
	description: "Registration Flow.",
};

export default function RegistrationPage() {
	return (
		<>
			<div className="container relative hidden h-[740px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<Link
					href="/login"
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"absolute right-4 top-4 md:right-8 md:top-8"
					)}
				>
					Login
				</Link>
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-500" />
					<div className="relative z-20 flex items-center text-lg font-medium">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 24 24"
							fill="none"
							stroke="currentColor"
							strokeWidth="2"
							strokeLinecap="round"
							strokeLinejoin="round"
							className="mr-2 h-6 w-6"
						>
							<path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
						</svg>
						<Link href="/">Maverick Inc.</Link>
					</div>
					<div className="relative z-20 mt-auto">
						<blockquote className="space-y-2">
							<p className="text-lg">
								&ldquo;This library has saved me countless hours of work and
								helped me deliver stunning designs to my clients faster than
								ever before.&rdquo;
							</p>
							<footer className="text-sm">Sofia Davis</footer>
						</blockquote>
					</div>
				</div>
				<div className="lg:p-8">
					<div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
						<div className="flex flex-col space-y-2 text-center">
							<h1 className="text-2xl font-semibold tracking-tight">
								Create Your Account
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your email and password below to create your account
							</p>
						</div>
						<UserRegistrationAuthForm />
						<p className="px-8 text-center text-sm text-muted-foreground">
							By clicking continue, you agree to our{" "}
							<Link
								href="/terms-and-conditions"
								className="underline underline-offset-4 hover:text-primary"
							>
								Terms of Service
							</Link>{" "}
							and{" "}
							<Link
								href="/privacy-policy"
								className="underline underline-offset-4 hover:text-primary"
							>
								Privacy Policy
							</Link>
							.
						</p>
					</div>
				</div>
			</div>
		</>
	);
}
