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

export default async function Handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	console.log(req.body.id)
	try {
		await dbConnect()
		const { id, refundAmount } = req.body
		const booking = await Booking.findByIdAndUpdate(id, {
			status: "Cancelled",
			refundAmount: refundAmount,
		})

		sendMail(
			`<h1>Booking Cancellation</h1>
				<p>Dear ${booking.firstName} ${booking.lastName},</p>
				<p>We are sorry to inform you that your booking has been cancelled.</p>
				<p>For any queries, please contact us at +91 1234567890.</p>
				<p>We will be happy to assist you.</p>
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
}
