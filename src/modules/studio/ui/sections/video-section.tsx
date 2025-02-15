'use client';

import { Suspense } from 'react';
import { DEFAULT_LIMIT } from '@/constants';
import { trpc } from '@/trpc/client';
import { ErrorBoundary } from 'react-error-boundary';
import { InfiniteScroll } from '@/components/infinite-scroll';
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import Link from 'next/link';

export const VideosSection = () => {
	return (
		<Suspense fallback={<p>Loading...</p>}>
			<ErrorBoundary fallback={<p>Error...</p>}>
				<VideosSectionSuspense />
			</ErrorBoundary>
		</Suspense>
	);
};

const VideosSectionSuspense = () => {
	const [videos, query] = trpc.studio.getMany.useSuspenseInfiniteQuery(
		{
			limit: DEFAULT_LIMIT,
		},
		{
			getNextPageParam: (lastPage) => lastPage.nextCursor,
		}
	);

	return (
		<div>
			<div className='border-y'>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className='pl-6 w-[510px]'>Video</TableHead>
							<TableHead>Visibility</TableHead>
							<TableHead>Status</TableHead>
							<TableHead>Date</TableHead>
							<TableHead className='text-right'>Views</TableHead>
							<TableHead className='text-right'>Comments</TableHead>
							<TableHead className='text-right pr-6'>Likes</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{videos.pages.flatMap((page) =>
							page.items.map((video) => (
								<Link
									href={`/studio/videos/${video.id}`}
									key={video.id}
									// NOTE: If legacyBehavior don't work we need to use router push, which is slower
									legacyBehavior
								>
									<TableRow className='cursor-pointer'>
										<TableCell>{video.title}</TableCell>
										<TableCell>Visibility</TableCell>
										<TableCell>Status</TableCell>
										<TableCell>Date</TableCell>
										<TableCell>View</TableCell>
										<TableCell>Comment</TableCell>
										<TableCell>Likes</TableCell>
									</TableRow>
								</Link>
							))
						)}
					</TableBody>
				</Table>
			</div>
			Video Section:
			<InfiniteScroll
				isManual
				hasNextPage={query.hasNextPage}
				isFetchingNextPage={query.isFetchingNextPage}
				fetchNextPage={query.fetchNextPage}
			/>
		</div>
	);
};
