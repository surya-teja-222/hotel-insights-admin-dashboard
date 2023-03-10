import { DataGrid, GridColDef, GridRowsProp } from "@mui/x-data-grid"
import Modal from "@mui/material/Modal"

import { useState } from "react"
import dbConnect from "@/lib/dbConnect"
import Rooms from "@/models/Room.model"
import { useRouter } from "next/router"
import Header from "@/components/header"

const columns: GridColDef[] = [
	{
		field: "name",
		headerName: "Name",
		width: 200,
	},
	{
		field: "price",
		headerName: "Price",
		width: 200,
	},
	{
		field: "shortCode",
		headerName: "Short Code",
		width: 200,
	},
	{
		field: "count",
		headerName: "Count",
		width: 200,
	},
	{
		field: "status",
		headerName: "Status",
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
						<h1 className="font-poppins text-2xl">Room Type</h1>
						<p>
							Here are various types of rooms in the hotel. Click
							add to add new type of room.
						</p>
					</div>
					<button
						className="p-3 my-auto w-fit h-fit bg-blue-500 rounded-full scale-1 hover:scale-[1.1] transition-all ease-in-out duration-100"
						onClick={() => setEditModalOpen(true)}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="24"
							height="24"
							viewBox="0 0 24 24"
						>
							<path
								fill="white"
								d="M24 10h-10v-10h-4v10h-10v4h10v10h4v-10h10z"
							/>
						</svg>
					</button>
				</div>
				<div className="h-[60vh] min-h-[60vh]  w-fit p-4">
					<DataGrid
						rows={rooms}
						columns={columns}
						getRowClassName={(params) => {
							return params.row.status === "Active"
								? "bg-green-400 cursor-pointer text-white hover:bg-green-600"
								: "bg-red-400 cursor-pointer text-white hover:bg-red-600"
						}}
					/>
				</div>

				<Modal
					open={editModalOpen}
					onClose={() => setEditModalOpen(false)}
					aria-labelledby="modal-modal-title"
					aria-describedby="modal-modal-description"
				>
					<div className="bg-white rounded-md m-6 p-4 min-h-[400px] w-fit mx-auto px-60">
						<h1 className="p-2 font-poppins font-bold text-2xl">
							Add New Room Type:
						</h1>
						<form onSubmit={handleSubmit}>
							<table>
								<tr>
									<td>
										<label
											className="p-2 mr-6"
											htmlFor="name"
										>
											Name:
										</label>
									</td>
									<td>
										<input
											className="border p-2 outline-none focus:border-2"
											type="text"
											name="name"
											id="name"
											placeholder="Enter Room Name"
										/>
									</td>
								</tr>
								<tr>
									<td>
										<label
											className="p-2 mr-6"
											htmlFor="price"
										>
											Price:
										</label>
									</td>
									<td>
										<input
											className="border p-2 outline-none focus:border-2"
											type="number"
											name="price"
											id="price"
											placeholder="Enter Room Price"
										/>
									</td>
								</tr>
								<tr>
									<td>
										<label
											className="p-2 mr-6"
											htmlFor="shortCode"
										>
											Short Code:
										</label>
									</td>
									<td>
										<input
											className="border p-2 outline-none focus:border-2"
											type="text"
											name="shortCode"
											id="shortCode"
											placeholder="Enter Room Short Code"
										/>
									</td>
								</tr>
								<tr>
									<td>
										<label
											className="p-2 mr-6"
											htmlFor="count"
										>
											Count:
										</label>
									</td>
									<td>
										<input
											className="border p-2 outline-none focus:border-2"
											type="number"
											name="count"
											id="count"
											placeholder="Enter Room Count"
										/>
									</td>
								</tr>
								<tr>
									<td>
										<label
											className="p-2 mr-6"
											htmlFor="status"
										>
											Status:
										</label>
									</td>
									<td>
										<select
											name="status"
											id="status"
											className="border p-2 outline-none focus:border-2"
										>
											<option value="Active" selected>
												Active
											</option>
											<option value="InActive">
												InActive
											</option>
										</select>
									</td>
								</tr>
							</table>

							<div className="flex mt-4">
								<button
									type="submit"
									className="p-2 bg-green-500 w-[100px] text-white rounded-md hover:scale-[1.1] transition-all ease-in-out duration-100"
								>
									Add
								</button>
								<button
									type="button"
									onClick={() => setEditModalOpen(false)}
									className="p-2 w-[100px] text-blue-500 rounded-md ml-2 hover:scale-[1.1] transition-all ease-in-out duration-100"
								>
									Cancel
								</button>
							</div>
						</form>
					</div>
				</Modal>
			</main>
		</>
	)
}

export async function getServerSideProps() {
	await dbConnect()
	const res = await Rooms.find({})
	const data = res.map((doc, idx) => {
		const room = doc.toObject()
		room.id = idx + 1
		delete room._id
		return room
	})

	return {
		props: {
			rooms: data,
		},
	}
}
