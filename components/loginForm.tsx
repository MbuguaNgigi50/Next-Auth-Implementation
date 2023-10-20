"use client";

import * as React from "react";

//Shad-cn Packages
import { cn } from "../lib/utils";
import { Icons } from "../components/icons";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";

//Next && Next-Auth Packages
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast/headless";

interface UserLoginAuthFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function UserLoginAuthForm({
	className,
	...props
}: UserLoginAuthFormProps) {
	//This state will be for the loading spinner
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	//These states will be used to store the user input during the registration phase
	const [email, setEmail] = React.useState("");
	const [password, setPassword] = React.useState("");
	//const [error, setError] = React.useState("");

	/*
	Search Parameters. This will call out the callbackUrl and take us there upon sign up or sign in. If the callbackUrl does not exist, it will default to the dashboard
	 */
	const searchParams = useSearchParams();
	const callbackUrl = searchParams.get("callbackUrl") || "/dashboard";

	//Router
	const router = useRouter();

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault();
		setIsLoading(true);

		try {
			const res = await signIn("credentials", {
				redirect: false,
				email,
				password,
				callbackUrl,
			});
			if (!res?.error) {
				//redirect to the sign in page
				router.push(callbackUrl);
				toast.success("Login Successful");
				//TODO ADD A TOAST NOTIFICATION FEATURE THAT WILL SHOW THE USER THAT THE LOGIN PROCESS WAS SUCCESSFUL
			} else {
				toast.error("Invalid Email or Password");
				//setError("Invalid Email or Password");
				//TODO ADD A TOAST NOTIFICATION FEATURE THAT WILL SHOW THE USER THAT THE LOGIN PROCESS FAILED
			}
		} catch (err: any) {
			toast.error('Something Went Wrong')
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
						Sign In
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
