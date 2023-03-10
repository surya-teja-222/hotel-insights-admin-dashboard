import dbConnect from "@/lib/dbConnect"
import RoomType from "@/models/Room.model"
import FlatModel from "@/models/flat.model"
export default async function POST(request: Request) {
	return new Promise(async (resolve, reject) => {
		try {
			const { name, price, shortCode, count, status } = JSON.parse(
				// @ts-ignore
				request.body
			)
			dbConnect()
			console.log(name, price, shortCode, count, status)

			const roomType = new RoomType({
				name,
				price,
				shortCode,
				count,
				status,
			})
			roomType.save()
			console.log("Room type added successfully")

			// create count number of flats
			for (let i = 1; i <= count; i++) {
				const flat = new FlatModel({
					name: `${name} ${i}`,
					type: roomType._id,
					scode: shortCode,
					occupied: false,
					status: "Active",
				})
				flat.save()
			}
			resolve({
				status: 200,
				message: "Room type added successfully",
			})
		} catch (err) {
			reject({
				status: 500,
				// @ts-ignore
				message: err?.message || "Internal server error",
			})
		}
	})
}
