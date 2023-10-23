import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'Manage Account',
	description: 'Manage Your Account Settings',
};

export default function ManageAccountLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
			<html lang="en">
				<body className={inter.className}>
					{children}
				</body>
			</html>
	);
}
