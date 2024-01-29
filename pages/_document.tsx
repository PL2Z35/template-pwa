import { SpeedInsights } from '@vercel/speed-insights/next'
import { Analytics } from '@vercel/analytics/react';
import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
	return (
		<Html lang='es'>
			<Head>
				<meta charSet='utf-8' />
				<meta name="google-adsense-account" content="ca-pub-5139828550656259"></meta>
				<link rel='icon' type='image/png' href='/images/favicon.ico' />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta
					name='theme-color'
					content='#18181b'
					media='(prefers-color-scheme: dark)'
				/>
				<meta name='theme-color' content='#f4f4f5' />
				<link rel='apple-touch-icon' href='/images/apple-touch-ico.png' />
				<link rel='manifest' href='/manifest.json' />
				<title>Hitch</title>
			</Head>
			<body>
			<SpeedInsights/>
			<Analytics />
				<Main />
				<NextScript />
			</body>
		</Html>
	)
}
