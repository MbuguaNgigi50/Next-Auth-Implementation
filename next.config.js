/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		serverComponentsExternalPackages: [
			'@prisma/client',
			'bcrypt',
			'@types/bcrypt',
		],
	},
};

module.exports = nextConfig;
