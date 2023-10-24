'use client';

import * as React from 'react';

//Shad-cn Packages
import { cn } from '@/lib/utils';
import { Icons } from '@/components/icons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

//Next-Auth Packages
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface UserRegistrationAuthFormProps
	extends React.HTMLAttributes<HTMLDivElement> {}

export function UserRegistrationAuthForm({
	className,
	...props
}: UserRegistrationAuthFormProps) {
	//Importing Session Hooks
	const session = useSession();

	//This state will be for the loading spinner
	const [isLoading, setIsLoading] = React.useState<boolean>(false);

	//These states will be used to store the user input during the registration phase
	const [fullName, setFullName] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [password, setPassword] = React.useState('');

	//Router
	const router = useRouter();

	//Adding a useEffect to check if the user is authenticated
	React.useEffect(() => {
		if (session?.status === 'authenticated') {
			//console.log('Authenticated');
			router.refresh();
			router.push('/');
		}
	}, [session?.status, router]);

	async function onSubmit(event: React.FormEvent) {
		event.preventDefault();

		try {
			setIsLoading(true);
			const response = await fetch('api/register', {
				method: 'POST',
				body: JSON.stringify({
					fullName,
					email,
					password,
				}),
				headers: {
					'Content-Type': 'application/json',
				},
			});
			if (response.status == 201) {
				//A Toast Notification that alerts the user if there was a problem during the registration
				toast.success('Registration Successful');

				//Redirected to the Sign In Page where they can log in
				router.push('/login');

				/*
				Redirect to the email verification page where they will activate their account
				router.push('/email-verification');
				
				TODO 
				*CREATE THE EMAIL VERIFICATION PAGE

				*/
			} else if (response.status == 202) {
				//A Toast Notification that alerts the user if there was a problem during the registration
				toast.error('Email Already Exists');
			}
		} catch (error: any) {
			//A Toast Notification that alerts the user if there was a problem during the registration
			toast.error('Something Went Wrong');
		}
		setTimeout(() => {
			setIsLoading(false);
		}, 3000);
	}

	/* 
	TODO 
	*ADD FORM VALIDATION WITH ZOD
	*/

	/*
	TODO 
	*MAKE THE FORM RESPONSIVE
    *ADD THE ABILITY TO VIEW YOUR PASSWORD
	*/

	return (
		<div className={cn('grid gap-6', className)} {...props}>
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
				)}{' '}
				Google
			</Button>
		</div>
	);
}
