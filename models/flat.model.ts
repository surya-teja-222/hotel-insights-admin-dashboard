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
	occupied: {
		type: Boolean,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
})

export type FlatType = {
	_id: string
	name: string
	type: string
	occupied: boolean
	status: "Active" | "InActive"
}

export default mongoose.models.Flat || mongoose.model("Flat", FlatSchema)
