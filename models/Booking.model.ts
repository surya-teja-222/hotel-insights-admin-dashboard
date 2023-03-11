import mongoose from "mongoose"
import flatModel from "./flat.model"
import roomModel from "./Room.model"

const BookingSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	roomType: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room",
	},
	fromDate: {
		type: Date,
		required: true,
	},
	toDate: {
		type: Date,
		required: true,
	},
	numberOfGuests: {
		type: Number,
		required: true,
	},
	paymentMethod: {
		type: String,
		required: true,
	},
	tips: {
		type: Number,
		required: true,
	},
	tax: {
		type: Number,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	flat: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Flat",
	},
	refundAmount: {
		type: Number,
	},
})

export type BookingType = {
	id: string
	firstName: string
	lastName: string
	email: string
	phone: string
	roomType: string
	fromDate: Date
	toDate: Date
	numberOfGuests: number
	paymentMethod: string
	tips: number
	tax: number
	total: number
	status: string
}

export default BookingSchema
