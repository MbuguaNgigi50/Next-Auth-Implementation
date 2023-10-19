/*This is the registration API endpoint that will handle all the registration functionality when a new user is signing up.
The registration process involves signing up with:
- Email
- Password
- Confirm Password
- Any other detail that would be appropriate

****This route ONLY accepts POST requests****

*/

import { hash } from "bcrypt";
import prisma from "../../../../../lib/prisma";
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { email, password } = await request.json();
        //Validation
        const hashedPassword = await hash(password, 12)
        const user = await prisma.user.create({
            data: {
                email, password: hashedPassword
            }
        })
        return NextResponse.json({
            user: {
                email: user.email,
            }
        })
    } catch (err: any) {
        return new NextResponse(JSON.stringify({
            error: err.message
        })), {
            status: 500
        }
    }
}
