import mongoose from "mongoose"

const RoomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	shortCode: {
		type: String,
		required: true,
	},
	count: {
		type: Number,
		required: true,
	},
	status: {
		type: String,
		required: true,
	},
})

export type RoomType = {
	_id: string
	name: string
	price: number
	shortCode: string
	count: number
	status: "Active" | "InActive"
}

export default RoomSchema
