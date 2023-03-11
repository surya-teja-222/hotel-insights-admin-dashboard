import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/dbConnect"

import mongoose from "mongoose"
import RoomSchema from "@/models/Room.model"
import BookingSchema from "@/models/Booking.model"
import FlatSchema from "@/models/flat.model"

const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema)
const Booking =
	mongoose.models.Booking || mongoose.model("Booking", BookingSchema)
const Flat = mongoose.models.Flat || mongoose.model("Flat", FlatSchema)

import sendMail from "@/lib/sendEmail"

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
			const booking = await Booking.findByIdAndUpdate(
				// @ts-ignore
				data.id,
				newBooking,
				{ new: true }
			)
				.populate("roomType")
				.populate("flat")
			sendMail(
				`<h1>Booking Modification</h1>
					<p>Dear ${booking.firstName} ${booking.lastName},</p>
					<p>Your booking has been confirmed.</p>
					<p>Room Type: ${room.name}</p>
					<p>From: ${new Date(booking.fromDate).toLocaleDateString()}</p>
					<p>To: ${new Date(booking.toDate).toLocaleDateString()}</p>
					<p>Number of Guests: ${booking.numberOfGuests}</p>
					<p>Payment Method: ${booking.paymentMethod}</p>
					<p>Allotment: ${booking.flat.name}</p>
					<p>Room Price: ${roomPrice}</p>
					<p>Number of Days: ${days}</p>
					<p>Tax: ${tax}</p>
					<p>Tips: ${booking.tips}</p>
					<p>Total: ${total}</p>
					<p>Thank you for choosing Hotel Insights.</p>
					`,
				booking.email,
				"Booking Modification Update"
			)
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
