/*
This is the registration API endpoint that will handle all the registration functionality when a new user is signing up.
The registration process involves signing up with:
- Full Name
- Email
- Password
- Any other detail that would be appropriate

****THIS ROUTE ONLY ACCEPTS POST REQUESTS****

*/

import { hash } from 'bcryptjs';
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	try {
		/*
        Destructuring the contents of the registration form. 
        The Full Name, Email and Password will be passed from the form to the Registration API
        */
		const { fullName, email, password } = await request.json();

		/*
		User Registration Validation. Checking if a user with that email address already exist
		*/
		const emailExists = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (emailExists) {
			return NextResponse.json(
				{
					user: null,
					message: 'Email Already Exists',
				},
				//Status Code (202): Failed Registration - Email Already Exists
				{ status: 202 }
			);
		}

		/*
        This is where the user's password is hashed. The API receives the password from the Registration Form and applies a hashing algorithm consistently to it.
        The resulting value is stored in a new hashedPassword variable
        */
		const hashedPassword = await hash(password, 12);

		/*
        This is where the user is created. The Prisma Client is called that creates the new user using the variables that have been passed to it.
        - name: Full Name passed by the form
        - email: Email passed by the form 
        - password: Hashed Password
        */
		const user = await prisma.user.create({
			data: {
				name: fullName,
				email,
				password: hashedPassword,
			},
		});

		return NextResponse.json(
			{
				user: {
					name: user.name,
					email: user.email,
					message: 'Registration Successful',
				},
			},
			//Status Code (201): Successful Registration
			{ status: 201 }
		);
	} catch (err: any) {
		return (
			new NextResponse(
				JSON.stringify({
					error: err.message,
				})
			),
			{
				status: 500,
			}
		);
	}
}
