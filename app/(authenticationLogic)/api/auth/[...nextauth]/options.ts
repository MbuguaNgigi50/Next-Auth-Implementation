//Importing all the relevant packages that are necessary for this to work
import { Account, AuthOptions, Profile, Session, User } from "next-auth";
//Importing NextAuth
import NextAuth from "next-auth/next";
//Importing the credentials provider to enable signing in via credentials
import CredentialsProvider from 'next-auth/providers/credentials';
//Importing the prisma client from the lib folder
import prisma from '@/lib/prisma';
//Importing Bcrypt to hash and encrypt passwords
import { compare } from 'bcrypt';
//Importing JWT libraries
import jwt from 'jsonwebtoken';
import { JWT } from 'next-auth/jwt';

export const authOptions: AuthOptions = {
	debug: process.env.NODE_ENV === 'development',
	providers: [
		CredentialsProvider({
			//The Credentials Provider allows for signing in via Credentials(Email and Password)
			name: 'credentials',
			credentials: {
				email: {
					label: 'Email',
					type: 'email',
					placeholder: 'Email',
				},
				password: {
					label: 'Password',
					type: 'password',
					placeholder: 'Password',
				},
			},
			authorize: async (credentials) => {
				// Handling the Authorization functionality
				// This checks whether the email or the password exists for a given user
				if (!credentials?.email || !credentials.password) {
					throw new Error('Invalid Credentials');
				}

				//Finding the user in the database using their email
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				// Returns null if a user does not exist in the database
				if (!user) {
					throw new Error('User does not exist');
				}

				// Comparing the hashed password that is stored in the database to the one that the user has just entered during the sign in flow
				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				// Returns an error if the password entered by the user is invalid
				if (!isPasswordValid) {
					throw new Error('Invalid Credentials');
				}

				return user;
			},
		}),
	],
	//The Secret will be used to encode the JWT that will be used to store the session
	/*
	TODO
	*ADD VALIDATION WITH ZOD
	*/
	pages: {
		//These will be the pages that Next-Auth will use for authentication instead of the in-built pages provided
		signIn: '/login',
		signOut: '/',
	},
	//This will be used to sign the JWT
	secret: process.env.NEXTAUTH_SECRET,

	//Adding JWT functionality to encode and decode the JWTs
	jwt: {
		//Encoding the JWT
		async encode({ secret, token }) {
			//If the token does not exist or is invalid, we are returning undefined
			if (!token) {
				throw new Error('No token to encode');
			}
			//Returning the signed JWT
			return jwt.sign(token, secret);
		},

		//Decoding the JWT
		async decode({ secret, token }) {
			//If the token does not exist or is invalid, we are returning undefined
			if (!token) {
				throw new Error('No token to decode');
			}
			const decodedToken = jwt.verify(token, secret);
			if (typeof decodedToken === 'string') {
				//If the decodeToken is a string, trying to parse it a JSON object. If an error occurs, the string is invalid.
				return JSON.parse(decodedToken);
			} else {
				//Returning the JwtPayload
				return decodedToken;
			}
		},
	},
	session: {
		strategy: 'jwt', // This is the session storage strategy
		maxAge: 30 * 24 * 60 * 60, //This is the maximum age of the token which is 30 days
		updateAge: 24 * 60 * 60, //This is the update age of the token. It is how frequently it will be updated which is everyday
	},
	callbacks: {
		//Handles the session object that is passed around and used whenever the session is fetched
		async session(params: { session: Session; token: JWT; user: User }) {
			//If it is a valid session, then using the decoded token to set the right variables to the user
			if (params.session.user) {
				params.session.user.email = params.token.email;
			}
			console.log('session callback', params.session);
			return params.session;
		},
		async jwt(params: {
			token: JWT;
			user?: User | undefined;
			account?: Account | null | undefined;
			profile?: Profile | undefined;
			isNewUser?: boolean | undefined;
		}) {
			if (params.user) {
				//Setting the email inside of the token
				params.token.email = params.user.email;
			}
			//Returning the token
			console.log('jwt callback', params.token);
			return params.token;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
