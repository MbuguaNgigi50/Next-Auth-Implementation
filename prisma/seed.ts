import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const password = await hash("testUser", 12);
	const user = await prisma.user.upsert({
		where: { email: "testUser@test.com" },
		update: {},
		create: {
			email: "testUser@test.com", //Test Email
			name: "Test User", //Test User
			password, //Test Password
		},
	});
	console.log({ user });
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
		process.exit(1);
	});
