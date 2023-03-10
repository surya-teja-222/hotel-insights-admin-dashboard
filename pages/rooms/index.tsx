import { DataGrid, GridColDef } from "@mui/x-data-grid"

import { useState } from "react"
import dbConnect from "@/lib/dbConnect"
import Flats from "@/models/flat.model"
import { useRouter } from "next/router"
import Header from "@/components/header"

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
	column.headerClassName =
		"font-poppins text-lg font-semibold bg-blue-500 text-white"
})
// @ts-ignore
export default function Roo({ rooms }) {
	const [editModalOpen, setEditModalOpen] = useState<boolean>(false)
	const router = useRouter()
	const refreshData = () => {
		router.replace(router.asPath)
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// get form data
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())
		const res = fetch("/api/add/roomType", {
			method: "POST",
			body: JSON.stringify(data),
		})
		setEditModalOpen(false)
		refreshData()
	}

	return (
		<>
			<Header />
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
	const res = await Flats.find({}).populate("type").populate("user")
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
			d["Price"] = room.type.price
			d["AC/Non-AC"] = "AC"
			d["Occupied"] = room.occupied ? "Yes" : "No"
			d["Status"] = room.occupied ? "Occupied" : "Vacant"
			d["Last Booked By"] = room.user ? room.user.firstName : "N/A"
			k.push(d)
		}
	)
	console.log(k)
	return {
		props: {
			rooms: k,
		},
	}
}
