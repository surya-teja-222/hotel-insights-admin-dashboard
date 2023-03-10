import { NextApiRequest, NextApiResponse } from "next"
import dbConnect from "@/lib/dbConnect"
import Booking from "@/models/Booking.model"

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
		res.status(200).json({ success: true, data: booking })
	} catch (error) {
		console.log(error)
		res.status(400).json({ success: false })
	}
}
