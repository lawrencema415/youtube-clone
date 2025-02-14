'use client';

import { Button } from '@/components/ui/button';
import { trpc } from '@/trpc/client';
import { Loader2Icon, PlusIcon } from 'lucide-react';
import { toast } from 'sonner';

export const StudioUploadModal = () => {
	const utils = trpc.useUtils();
	const create = trpc.videos.create.useMutation({
		// This callback is triggered after a successful video creation mutation.
		// It invalidates the 'getMany' query in the 'studio' namespace to ensure
		// that the UI reflects the most up-to-date list of videos by refetching
		// the data from the server. This helps maintain data consistency in the UI.
		onSuccess: () => {
			utils.studio.getMany.invalidate();
			toast.success('Video created!');
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	return (
		<Button
			variant='secondary'
			onClick={() => create.mutate()}
			disabled={create.isPending}
		>
			{create.isPending ? (
				<Loader2Icon className='animate-spin' />
			) : (
				<PlusIcon />
			)}
			Create
		</Button>
	);
};
