// @ts-no-check
/* eslint-disable @next/next/no-img-element */
import dbConnect from "@/lib/dbConnect"
import BookingModel, { BookingType } from "@/models/Booking.model"
import { useRouter } from "next/router"
import { useEffect } from "react"
import Link from "next/link"
import Header from "@/components/header"
type propType = {
	notFound?: boolean
	id?: string
	booking?: BookingType
}

export default function Success(props: propType) {
	const router = useRouter()
	// @ts-ignore
	const booking = JSON.parse(props.booking) as BookingType
	console.log(booking)
	const keys = Object.keys(booking)
	useEffect(() => {
		if (props.notFound) {
			router.push({
				pathname: "/booking",
			})
		}
	}, [])

	return (
		<>
			<Header />
			<div className="bg-blue-400 w-full min-h-[100vh] flex flex-col justify-center">
				<div className="bg-primaryBg mx-auto flex flex-col justify-center w-fit text-center rounded-lg p-6">
					<img
						src="/icon-thank-you.svg"
						className="w-[100px] self-center"
						alt=""
					/>
					<h1>Thank You!</h1>
					<div className="mx-auto">
						<table className="text-left w-[500px] mt-6 ">
							<tbody>
								{keys.map((key, index) => {
									return (
										<tr key={index}>
											<td className="uppercase pr-2">
												{key}
											</td>
											{/* @ts-ignore */}
											<td>{booking[key]}</td>
										</tr>
									)
								})}
							</tbody>
						</table>
					</div>
					<div className="flex justify-center gap-3">
						<Link
							href="/booking"
							className="p-4 bg-blue-400 w-fit mx-auto rounded-md mt-4"
						>
							Continue
						</Link>
						<button
							type="button"
							className="p-4 w-fit mx-auto rounded-md mt-4 border-2 border-blue-400"
							onClick={() => window.print()}
						>
							Print
						</button>
					</div>
				</div>
			</div>
		</>
	)
}

export async function getServerSideProps(q: any) {
	await dbConnect()
	console.log(q.query.id)

	try {
		const booking = await BookingModel.findById(q.query.id)
			.populate("roomType")
			.populate("flat")

		if (!booking) {
			return {
				notFound: true,
			}
		}

		const b: {
			[key: string]: string | number
		} = {}

		b["id"] = booking._id.toString()
		b["FirstName"] = booking.firstName
		b["LastName"] = booking.lastName
		b["Email"] = booking.email
		b["Phone"] = booking.phone
		b["From"] = booking.fromDate.toISOString().split("T")[0]
		b["To"] = booking.toDate.toISOString().split("T")[0]
		b["Number of Guests"] = booking.numberOfGuests
		b["Payment Method"] = booking.paymentMethod
		b["Tip"] = booking.tips
		b["Total"] = booking.total
		b["Status"] = booking.status
		b["Room Type"] = booking.roomType.name
		b["Flat"] = booking.flat.name
		console.log(b)
		return {
			props: {
				id: q.query.id,
				booking: JSON.stringify(b),
			},
		}
	} catch (e) {
		console.log(e)
		return {
			props: {
				notFound: true,
			},
		}
	}
}
