import mongoose from "mongoose"

const FlatSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	type: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Room",
		required: true,
	},
	scode: {
		type: String,
		required: true,
	},
	occupied: {
		type: Boolean,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Booking",
	},
	email: {
		type: String,
	},
})

export type FlatType = {
	_id: string
	name: string
	type: string
	occupied: boolean
	status: "Active" | "InActive"
}

export default FlatSchema
