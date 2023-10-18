/*
Importing all the relevant packages that are necessary for this to work
*/
import NextAuth, { type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
//Importing the credentials provider to enable signing in via credentials
import prisma from "../../../../../lib/prisma";
//Importing the prisma client from the lib folder
import { compare } from "bcrypt";

export const authOptions: NextAuthOptions = {
	session: {
		strategy: "jwt",
	},
	providers: [
		CredentialsProvider({
			//The Credentials Provider allows for signing in via Credentials(Email and Password)
			name: "Credentials",
			credentials: {
				email: {
					label: "Email",
					type: "email",
					placeholder: "hello@example.com",
				},
				password: {
					label: "Password",
					type: "password",
					placeholder: "password",
				},
			},
			async authorize(credentials) {
				// Handling the Authorization functionality
				// This checks whether the email or the password exists for a given user
				if (!credentials?.email || !credentials.password) {
					return null;
				}
				//Finding the user in the database using their email
				const user = await prisma.user.findUnique({
					where: {
						email: credentials.email,
					},
				});

				// Returns null if a user does not exist in the database
				if (!user) {
					return null;
				}

				// Comparing the hashed password that is stored in the database to the one that the user has just entered during the sign in flow
				const isPasswordValid = await compare(
					credentials.password,
					user.password
				);

				// Returns null if the password entered by the user is invalid
				if (!isPasswordValid) {
					return null;
				}

				return {
					id: user.id + "",
					email: user.email,
					name: user.name,
					randomKey: "Hey Cool",
				};
			},
		}),
	],
	callbacks: {
		//Handles the session object that is passed around and used whenever the session is fetched
		session: ({ session, token }) => {
			console.log("Session Callback", { session, token });

			return {
				...session,
				user: {
					...session.user,
					id: token.id,
					randomKey: token.randomKey,
				},
			};
		},
		//Handles the creation and management of the JWT token
		//The user param is only passed into this function the first time the user logs in. This can be through OAuth or Credentials
		//It has to be checked to see if there is a user object before using it then taking some of the properties and adding them to the JWT
		jwt: ({ token, user }) => {
			console.log("JWT Callback", { token, user });
			if (user) {
				const u = user as unknown as any;
				return {
					...token,
					id: u.id,
					randomKey: u.randomKey,
				};
			}
			return token;
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
