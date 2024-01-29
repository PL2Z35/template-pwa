import Link from 'next/link';
import { useRouter } from 'next/router';

const BottomNav = () => {
  const router = useRouter();

  return (
    <div className='sm:hidden'>
      <nav className='color-navbar fixed bottom-0 w-full border-t bg-zinc-100 pb-safe dark:border-zinc-800 dark:bg-zinc-900'>
        <div className='mx-auto flex h-16 max-w-md items-center justify-around px-6'>
          {links.map(({ href, label, icon }) => (
            <Link
              key={label}
              href={href}
              className={`color-link-white flex h-full w-full flex-col items-center justify-center space-y-1 ${router.pathname === href
                ? 'color-link-blue'
                : 'color-link-white'
                }`}
            >
              {icon}
              <span  className={`${router.pathname === href
                ? 'color-link-blue'
                : 'color-link-white'
                }`}>
                {label}
              </span>
            </Link>
          ))}
        </div>
      </nav>
    </div>
  );
};

export default BottomNav;

const links = [
	{
		label: 'Home',
		href: '/',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" fill='none'
			width='18'
			height='18'>
				<path fill='currentColor' d="M575.8 255.5c0 18-15 32.1-32 32.1h-32l.7 160.2c0 2.7-.2 5.4-.5 8.1V472c0 22.1-17.9 40-40 40H456c-1.1 0-2.2 0-3.3-.1c-1.4 .1-2.8 .1-4.2 .1H416 392c-22.1 0-40-17.9-40-40V448 384c0-17.7-14.3-32-32-32H256c-17.7 0-32 14.3-32 32v64 24c0 22.1-17.9 40-40 40H160 128.1c-1.5 0-3-.1-4.5-.2c-1.2 .1-2.4 .2-3.6 .2H104c-22.1 0-40-17.9-40-40V360c0-.9 0-1.9 .1-2.8V287.6H32c-18 0-32-14-32-32.1c0-9 3-17 10-24L266.4 8c7-7 15-8 22-8s15 2 21 7L564.8 231.5c8 7 12 15 11 24z"/></svg>
		),
	},
	{
		label: 'Categorías',
		href: '/categoryPage',
		icon: (
			<svg fill='none'
			width='18'
			height='18' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill='currentColor' d="M0 48V487.7C0 501.1 10.9 512 24.3 512c5 0 9.9-1.5 14-4.4L192 400 345.7 507.6c4.1 2.9 9 4.4 14 4.4c13.4 0 24.3-10.9 24.3-24.3V48c0-26.5-21.5-48-48-48H48C21.5 0 0 21.5 0 48z"/></svg>
		),
	},
	{
		label: 'Rastreo',
		href: '#',
		icon: (
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"
			fill='none'
				width='18'
				height='18'>
				<path d="M408 120c0 54.6-73.1 151.9-105.2 192c-7.7 9.6-22 9.6-29.6 0C241.1 271.9 168 174.6 168 120C168 53.7 221.7 0 288 0s120 53.7 120 120zm8 80.4c3.5-6.9 6.7-13.8 9.6-20.6c.5-1.2 1-2.5 1.5-3.7l116-46.4C558.9 123.4 576 135 576 152V422.8c0 9.8-6 18.6-15.1 22.3L416 503V200.4zM137.6 138.3c2.4 14.1 7.2 28.3 12.8 41.5c2.9 6.8 6.1 13.7 9.6 20.6V451.8L32.9 502.7C17.1 509 0 497.4 0 480.4V209.6c0-9.8 6-18.6 15.1-22.3l122.6-49zM327.8 332c13.9-17.4 35.7-45.7 56.2-77V504.3L192 449.4V255c20.5 31.3 42.3 59.6 56.2 77c20.5 25.6 59.1 25.6 79.6 0zM288 152a40 40 0 1 0 0-80 40 40 0 1 0 0 80z"
					fill='currentColor' />
			</svg>
		),
	},
]
