'use client';

import { trpc } from '@/trpc/client';
import { ErrorBoundary } from 'react-error-boundary';
import { Suspense } from 'react';
import { FilterCarousel } from '@/components/filter-carousel';
import { useRouter } from 'next/navigation';

interface CategorySectionProps {
	categoryId?: string;
}

export const CategoriesSection = ({ categoryId }: CategorySectionProps) => {
	return (
		<Suspense fallback={<CategoriesSkeleton />}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<CategoriesSectionSuspense categoryId={categoryId} />
			</ErrorBoundary>
		</Suspense>
	);
};

const CategoriesSkeleton = () => {
	return <FilterCarousel isLoading data={[]} onSelectAction={() => {}} />;
};

const CategoriesSectionSuspense = ({ categoryId }: CategorySectionProps) => {
	const router = useRouter();
	const [categories] = trpc.categories.getMany.useSuspenseQuery();

	const data = categories.map(({ name, id }) => ({
		value: id,
		label: name,
	}));

	const onSelect = (value: string | null) => {
		const url = new URL(window.location.href);

		if (value) {
			url.searchParams.set('categoryId', value);
		} else {
			url.searchParams.delete('categoryId');
		}
		router.push(url.toString());
	};

	return (
		<FilterCarousel onSelectAction={onSelect} value={categoryId} data={data} />
	);
};
