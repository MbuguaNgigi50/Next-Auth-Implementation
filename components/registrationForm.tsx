"use client";

import * as React from "react";

//Shad-cn Packages
import { cn } from "../lib/utils";
import { Icons } from "../components/icons";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

//Next-Auth Packages
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast/headless";

interface UserRegistrationAuthFormProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegistrationAuthForm({
	className,
	...props
}: UserRegistrationAuthFormProps) {
	//This state will be for the loading spinner
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	//These states will be used to store the user input during the registration phase
	const [fullName, setFullName] = React.useState("");
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");

	//Router
	const router = useRouter();

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault();
		setIsLoading(true);

		try {
			const res = await fetch("api/register", {
				method: "POST",
				body: JSON.stringify({
					fullName,
					email,
					password,
				}),
				headers: {
					"Content-Type": "application/json",
				},
			});
			if (res.ok) {
				//redirect to the email verification page
				toast.success('Registration Successful');
				router.push('/email-verification');
				//TODO ADD A TOAST NOTIFICATION FEATURE THAT WILL SHOW THE USER THAT THE REGISTRATION PROCESS WAS SUCCESSFUL

				//TODO CHANGE THE FEATURE SO THAT UPON SUCCESSFUL REGISTRATION, THE USER WILL BE PUSHED TO THE EMAIL VERIFICATION PAGE.
			}
		} catch (error) {
			//TODO ADD A TOAST NOTIFICATION THAT WILL NOTIFY THE USER IF THERE WAS A PROBLEM DURING THE REGISTRATION PROCESS
			toast.error('Something Went Wrong');
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	return (
		<div className={cn("grid gap-6", className)} {...props}>
			<form onSubmit={onSubmit}>
				<div className="grid gap-2">
					<div className="grid gap-1">
						<Input
							id="fullName"
							value={fullName}
							onChange={(e) => setFullName(e.target.value)}
							placeholder="Full Name"
							type="text"
							autoCapitalize="none"
							autoComplete="none"
							autoCorrect="off"
							disabled={isLoading}
							required
						/>
						<Label className="sr-only" htmlFor="email">
							Email
						</Label>
						<Input
							id="email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
							placeholder="Email"
							type="email"
							autoCapitalize="none"
							autoComplete="email"
							autoCorrect="off"
							disabled={isLoading}
							required
						/>
						<Input
							id="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Password"
							type="password"
							autoComplete="password"
							autoCorrect="off"
							disabled={isLoading}
							required
						/>
					</div>
					<Button disabled={isLoading}>
						{isLoading && (
							<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
						)}
						Sign Up
					</Button>
				</div>
			</form>
			<div className="relative">
				<div className="absolute inset-0 flex items-center">
					<span className="w-full border-t" />
				</div>
				<div className="relative flex justify-center text-xs uppercase">
					<span className="bg-background px-2 text-muted-foreground">
						Or continue with
					</span>
				</div>
			</div>
			<Button variant="outline" type="button" disabled={isLoading}>
				{isLoading ? (
					<Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
				) : (
					<Icons.google className="mr-2 h-4 w-4" />
				)}{" "}
				Google
			</Button>
		</div>
	);
}
