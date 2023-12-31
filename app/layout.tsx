import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from '@/providers/providers';
import { ToastProvider } from '@/providers/toastProvider';
import { ModalProvider } from '@/providers/modalProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
	title: 'SaaS Application',
	description: 'This is my first SaaS Application',
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<ModalProvider />
					{children}
					<ToastProvider />
				</Providers>
			</body>
		</html>
	);
}
