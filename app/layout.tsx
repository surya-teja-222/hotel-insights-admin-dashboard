import "./globals.css"

export const metadata = {
	title: "Hotel360 - Admin Dashboard",
	description:
		"Hotel360 - Admin Dashboard - React, Tailwind, TypeScript, Next",
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1"
				/>
				<meta name="description" content={metadata.description} />
				<title>{metadata.title}</title>
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
				<meta http-equiv="X-UA-Compatible" content="IE=7" />
				<link rel="icon" href="/favicon.ico" />
			</head>

			<body>{children}</body>
		</html>
	)
}
