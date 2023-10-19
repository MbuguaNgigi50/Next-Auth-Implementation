/*
- This is the login page. From here, a user will be able to login to the application either via the Credential Login or via a Provider(Google or any other  provider that has been set up)
- The page will contain the Login form that will be called from the components folder in the root directory.
- The Login form will trigger the Login flow that will allow the user to log into the application.
- For more information on how the Login flow works, refer to the API route to see the functionality.
- There is also a link that will direct them to the Sign Up page as well.
- There is a password reset link that is also available on this page that will direct the user to the Password reset page in the event that the user is having trouble with logging in. 
*/

import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { cn } from "../../../lib/utils";
import { buttonVariants } from "../../../components/ui/button";
import { UserLoginAuthForm } from "../../../components/loginForm";

export const metadata: Metadata = {
	title: "Login to your Account",
	description: "Login Flow.",
};

export default function LoginPage() {
	return (
		<>
			<div className="container relative hidden h-[740px] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
				<Link
					href="/register"
					className={cn(
						buttonVariants({ variant: "ghost" }),
						"absolute right-4 top-4 md:right-8 md:top-8"
					)}
				>
					Register
				</Link>
				<div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
					<div className="absolute inset-0 bg-zinc-900" />
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
								Sign In To Your Account
							</h1>
							<p className="text-sm text-muted-foreground">
								Enter your email and password below to continue
							</p>
						</div>
						<UserLoginAuthForm />
					</div>
				</div>
			</div>
		</>
	);
}
