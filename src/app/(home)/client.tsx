'use client';

import { trpc } from '@/trpc/client';

export const PageClient = () => {
	const [data] = trpc.hello.useSuspenseQuery({
		text: 'text',
	});

	return <div>page client {data.greeting}</div>;
};
