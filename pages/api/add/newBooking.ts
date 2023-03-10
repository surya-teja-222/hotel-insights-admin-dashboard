import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/dbConnect"
import Booking, { BookingType } from "@/models/Booking.model"
import Room from "@/models/Room.model"
export type inputType = {
	firstName: string
	lastName: string
	email: string
	phone: string
	roomType: string
	fromDate: number
	toDate: number
	numberOfGuests: number
	paymentMethod: string
	tip: number
}

const dayBtwn = (fromDate: number, toDate: number) => {
	const diff = toDate - fromDate
	const days = diff / (1000 * 60 * 60 * 24)
	return days
}

export default async function Handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		await dbConnect()

		const data = JSON.parse(req.body) as inputType
		data.tip = parseInt(data.tip.toString())
		const days = dayBtwn(data.fromDate, data.toDate)
		const room = await Room.findById(data.roomType)
		const roomPrice = room.price
		const tax = roomPrice * days * 0.18
		const total = roomPrice * days + tax + data.tip

		const newBooking = {
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			phone: data.phone,
			roomType: data.roomType,
			fromDate: new Date(data.fromDate),
			toDate: new Date(data.toDate),
			numberOfGuests: data.numberOfGuests,
			paymentMethod: data.paymentMethod,
			tips: data.tip,
			tax,
			total,
			status: "Accepted",
		}

		try {
			const booking = await Booking.create(newBooking)
			res.status(200).json({ success: true, data: booking })
		} catch (error) {
			console.log(error)
			res.status(400).json({ success: false })
		}
	} catch (error) {
		console.log(error)
		res.status(400).json({ success: false })
	}
}
