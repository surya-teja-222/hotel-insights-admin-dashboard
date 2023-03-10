import Link from "next/link"

export default function Header() {
	return (
		<header className="w-full bg-blue-300 h-[75px] p-4 flex justify-between">
			<Link
				href="/"
				className="flex font-poppins text-xl font-bold  flex-col justify-center "
			>
				Hotel Insights
			</Link>
			<div className="flex font-poppins text-lg font-semibold  flex-col justify-center">
				<div className="gap-6 flex">
					<Link
						className="hover:underline transition-all ease-in-out duration-100 hover:scale-[1.1] focus:outline outline-none "
						href="/"
					>
						Home
					</Link>
					<Link
						className="hover:underline transition-all ease-in-out duration-100 hover:scale-[1.1] focus:outline outline-none "
						href="/booking"
					>
						Bookings
					</Link>
					<Link
						className="hover:underline transition-all ease-in-out duration-100 hover:scale-[1.1] focus:outline outline-none "
						href="/rooms"
					>
						Rooms
					</Link>
				</div>
			</div>
		</header>
	)
}
