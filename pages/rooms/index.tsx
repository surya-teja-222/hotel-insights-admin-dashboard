import { DataGrid, GridColDef } from "@mui/x-data-grid"

import { useEffect, useState } from "react"
import dbConnect from "@/lib/dbConnect"
import { useRouter } from "next/router"
import Header from "@/components/header"
import BookingModel from "@/models/Booking.model"
import Flats from "@/models/flat.model"
import mongoose from "mongoose"
import RoomSchema from "@/models/Room.model"
import gsap from "gsap"
import Head from "next/head"
const columns: GridColDef[] = [
	{
		field: "Name",
		headerName: "Name",
		width: 200,
	},
	{
		field: "Room Type",
		headerName: "Room Type",
		width: 200,
	},
	{
		field: "Price",
		headerName: "Price",
		width: 200,
	},
	{
		field: "AC/Non-AC",
		headerName: "AC/Non-AC",
		width: 200,
	},
	{
		field: "Occupied",
		headerName: "Occupied ?",
		width: 200,
	},
	{
		field: "Status",
		headerName: "Status",
		width: 200,
	},
	{
		field: "Last Booked By",
		headerName: "Last Booked By",
		width: 200,
	},
]

columns.forEach((column) => {
	column.headerClassName = "room-table-header"
})
// @ts-ignore
export default function Roo({ rooms }) {
	const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
	const router = useRouter()
	const refreshData = () => {
		router.replace(router.asPath)
	}
	useEffect(() => {
		// apply a fade in animation to everything in the body
		gsap.from("*", {
			duration: 1,
			translateY: 10,
			opacity: 0,
		})
	}, [])

	return (
		<>
			<Header />
			<Head>
				<title>🏢Hotel Insights | Rooms</title>
			</Head>
			<main className="p-4 bg-primaryBg">
				<div className="flex p-4 justify-between">
					<div>
						<h1 className="font-poppins text-2xl">Room List</h1>
						<p>
							Here are various rooms in the hotel with their
							current status.
						</p>
					</div>
				</div>
				<div className="h-[60vh] min-h-[60vh]  w-fit p-4">
					<DataGrid
						rows={rooms}
						columns={columns}
						getRowClassName={(params) => {
							if (params.row.Status === "Occupied") {
								return "bg-green-100 cursor-pointer"
							} else {
								return "bg-blue-100 cursor-pointer"
							}
						}}
					/>
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps() {
	await dbConnect()
	var FlatsS = mongoose.models.Flat || mongoose.model("Flat", Flats)
	var BookingSchema =
		mongoose.models.Booking || mongoose.model("Booking", BookingModel)
	var RoomS = mongoose.models.Room || mongoose.model("Room", RoomSchema)

	const res = await FlatsS.find({}).populate("type").populate("user")
	const data = res.map((doc, idx) => {
		return doc.toObject()
	})
	// console.log(data)
	const k: { [x: string]: string | number }[] = []

	data.forEach(
		(room: {
			name: string | number
			type: string | number
			occupied: any
			user: { firstName: string | number }
		}) => {
			var d: { [x: string]: string | number } = {}
			d["id"] = room.name
			d["Name"] = room.name
			// @ts-ignore
			d["Room Type"] = room.type.name
			// @ts-ignore
			d["Price"] = room.type ? room.type.price : "N/A"
			d["AC/Non-AC"] = "AC"
			d["Occupied"] = room.occupied ? "Yes" : "No"
			d["Status"] = room.occupied ? "Occupied" : "Vacant"
			d["Last Booked By"] = room.user ? room.user.firstName : "N/A"
			k.push(d)
		}
	)

	return {
		props: {
			rooms: k,
		},
	}
}
