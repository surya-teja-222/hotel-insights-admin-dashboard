import "../styles/globals.css"
import type { AppProps } from "next/app"

import Head from "next/head"
export const metadata = {
	title: "Hotel360 - Admin Dashboard",
	description:
		"Hotel360 - Admin Dashboard - React, Tailwind, TypeScript, Next",
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<>
			<Head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="description" content={metadata.description} />
				<meta name="og:country-name" content="INDIA" />
				<meta name="og:locale" content="en_IN" />
				<meta name="og:title" content={metadata.title} />
				<meta
					property="og:url"
					content="https://hotel360-insights.vercel.app"
				/>
				<meta property="og:type" content="website" />
				<meta name="og:image" content="/favicon.ico" />
				<meta name="og:description" content={metadata.description} />
				<meta httpEquiv="X-UA-Compatible" content="IE=7" />
				<link rel="icon" href="/vercel.svg" />
			</Head>
			<Component {...pageProps} />
		</>
	)
}
