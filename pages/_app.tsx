import type { AppProps } from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/globals.css'
import { useEffect } from 'react'
import { Poppins} from '@next/font/google'
import { ConfigProvider} from 'antd';
import { SpeedInsights } from "@vercel/speed-insights/next"
import { Analytics } from '@vercel/analytics/react'


const poppins = Poppins({
	subsets: ['latin'],
	weight: ['400', '500', '700'],
})

export default function App({ Component, pageProps }: AppProps) {
	useEffect(() => {
		if (!localStorage.getItem('country')) {
			localStorage.setItem('country', 'COLOMBIA')
		}
	}, [])

	return (

		<ConfigProvider
		theme={{
		  token: {
			// Seed Token
			colorPrimary: '#030140',
			fontFamily: poppins.style.fontFamily

		  },
		}}
	  >
			<main className={poppins.className}>
			<SpeedInsights/>
			<Analytics />
				<ThemeProvider
					attribute='class'
					defaultTheme='light'
					disableTransitionOnChange
				>
					<Component {...pageProps} />
				</ThemeProvider>
			</main>
			</ConfigProvider>

	)
}
