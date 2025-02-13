import { HomeView } from '@/modules/home/ui/views/home-view';
import { HydrateClient, trpc } from '@/trpc/server';

export const dynamic = 'force-dynamic';

interface PageProps {
	searchParams: Promise<{
		categoryId?: string;
	}>;
}

const Page = async ({ searchParams }: PageProps) => {
	const { categoryId } = await searchParams;
	// where we prefatch we hydrate client
	void trpc.categories.getMany.prefetch();

	return (
		<HydrateClient>
			<HomeView categoryId={categoryId} />
		</HydrateClient>
	);
};

export default Page;
