import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
		unique: true,
	},
	_id: {
		type: String,
	},
})

export default UserSchema
