import type { Metadata } from 'next';
// import { Geist, Geist_Mono } from 'next/font/google';
import { Inter } from 'next/font/google';
import { ClerkProvider } from '@clerk/nextjs';

import './globals.css';
import { TRPCProvider } from '@/trpc/client';

const inter = Inter({ subsets: ['latin'] });

// const geistSans = Geist({
// 	variable: '--font-geist-sans',
// 	subsets: ['latin'],
// });

// const geistMono = Geist_Mono({
// 	variable: '--font-geist-mono',
// 	subsets: ['latin'],
// });

export const metadata: Metadata = {
	title: 'Youtube',
	description: 'Youtube Clone',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<ClerkProvider afterSignOutUrl='/'>
			<html lang='en'>
				<body className={inter.className}>
					<TRPCProvider>{children}</TRPCProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
