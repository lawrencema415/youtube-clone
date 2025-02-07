import Image from 'next/image';

export default function Home() {
	return (
		<div className='flex flex-row items-center gap-2'>
			<Image src='/logo.svg' height={50} width={50} alt='Logo' />
			<p className='text-xl font-semibold tracking-tight'>YouTube</p>
		</div>
	);
}
