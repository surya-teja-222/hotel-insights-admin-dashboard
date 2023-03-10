import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"

import dbConnect from "@/lib/dbConnect"
import Booking, { BookingType } from "@/models/Booking.model"
import Header from "@/components/header"

const CancelBooking = (params: { booking: BookingType }) => {
	const router = useRouter()
	var refundAmt = 0

	// if from date is > 48 hours from now, refund 100%
	// if from date is < 48 hours from now, refund 50%
	// if from date is < 24 hours from now, refund 0%

	var now = new Date()
	var from = new Date(params.booking.fromDate)
	var to = new Date(params.booking.toDate)
	var diff = from.getTime() - now.getTime()
	var diffDays = Math.ceil(diff / (1000 * 3600 * 24))
	if (diffDays > 2) {
		refundAmt = params.booking.total
	} else if (diffDays > 1) {
		refundAmt = params.booking.total / 2
	} else {
		refundAmt = 0
	}

	return (
		<>
			<Header />
			<div className="bg-gray-100 min-h-screen">
				<Head>
					<title>Cancel Booking | Hotel Name</title>
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<div className="bg-white mx-auto max-w-4xl shadow-md rounded-md p-6 my-10">
					<h1 className="text-3xl font-bold mb-6">Cancel Booking</h1>
					<div className="mb-4">
						<p>
							Do you want to cancel the booking for{" "}
							{params.booking.firstName} {params.booking.lastName}
							?
						</p>
						{/* @ts-ignore */}
						<p>
							The booking is from {params.booking.fromDate} to{" "}
							{params.booking.toDate}.
						</p>
						<p>You will be refunded ₹{refundAmt}.</p>
					</div>
					<button
						type="submit"
						className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md"
						onClick={async () => {
							fetch(`/api/delete/booking`, {
								method: "POST",
								headers: {
									"Content-Type": "application/json",
								},
								body: JSON.stringify({
									id: params.booking.id,
									refundAmount: refundAmt,
								}),
							})
								.then((res) => res.json())
								.then((data) => {
									console.log(data)
									router.push("/booking")
								})
						}}
					>
						Cancel Booking
					</button>
					<Link href="/booking" className="ml-4">
						Go back to home page
					</Link>
				</div>
			</div>
		</>
	)
}

export default CancelBooking

export async function getServerSideProps(context: { query: { id: any } }) {
	var id = context.query.id
	await dbConnect()
	var d = await Booking.findById(id)
	var data = d.toObject()
	data.id = data._id.toString()
	delete data._id
	delete data.__v
	var from = data.fromDate
	var to = data.toDate
	delete data.fromDate
	delete data.toDate
	data.fromDate = from.toDateString()
	data.toDate = to.toDateString()
	delete data.roomType
	return {
		props: {
			booking: data,
		}, // will be passed to the page component as props
	}
}
