import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image';
import Droptown from './navbar/droptown';
import Profile from './navbar/profile';
import Country from './navbar/country';

const Appbar = () => {
	const router = useRouter()

	return (
		<div className='fixed top-0 left-0 z-20 w-full bg-zinc-900 pt-safe '>
			<header className='color-navbar border-b bg-zinc-100 px-safe dark:border-zinc-800 dark:bg-zinc-900'>
				<div className='mx-auto flex h-20 max-w-screen-xl items-center justify-between px-6'>
					<Link href='/'>
						<Image src="/images/iconHitch.png" alt="Icon Hitch" width="120" height="120" />
					</Link>
					<nav className='flex items-center space-x-6'>
						<div className='hidden sm:block'>
							<a href="/" className=" center-text large-text color-link-white pr-4">
								INICIO
							</a>
							<Droptown />
							<a href="/trackingPage" className="center-text large-text color-link-white pr-4">
								RASTREO
							</a>
						</div>
					</nav>
					<nav className='center-text large-text flex items-center space-x-6'>
						<Country />
						<Profile />
					</nav>
				</div>
			</header>
		</div>
	)
}

export default Appbar
