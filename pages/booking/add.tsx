import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import dbConnect from "@/lib/dbConnect"
import Rooms, { RoomType } from "@/models/Room.model"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"

export default function AddBookingPage(props: { rooms: RoomType[] }) {
	const [roomType, setRoomType] = useState<string>("")
	const [fromDate, setFromDate] = useState<number>(new Date().getTime())
	const [toDate, setToDate] = useState<number>(new Date().getTime())
	const [tip, setTip] = useState<number>(0)
	const router = useRouter()

	useEffect(() => {
		var fromDate = document.getElementById("fromDate") as HTMLInputElement
		var toDate = document.getElementById("toDate") as HTMLInputElement

		// set the min date to today
		fromDate.min = new Date().toISOString().split("T")[0]
		toDate.min = new Date().toISOString().split("T")[0]
	}, [])

	const days = (fromDate: number, toDate: number) => {
		const diff = toDate - fromDate
		const days = diff / (1000 * 60 * 60 * 24)
		return days
	}
	// @ts-ignore
	const daysBetween = days(fromDate, toDate)
	const tax = props.rooms
		.filter((room) => {
			// @ts-ignore
			return room.id === roomType
		})
		.map((room) => {
			return ((room.price * Math.ceil(days(fromDate, toDate))) / 100) * 18
		})
	const totalAmount = props.rooms
		.filter((room) => {
			// @ts-ignore
			return room.id === roomType
		})
		.map((room) => {
			return room.price * Math.ceil(days(fromDate, toDate))
		})

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		// get form data
		const formData = new FormData(e.currentTarget)
		const data = Object.fromEntries(formData.entries())
		// @ts-ignore
		data["fromDate"] = fromDate
		// @ts-ignore
		data["toDate"] = toDate
		const res = await fetch("/api/add/newBooking", {
			method: "POST",
			body: JSON.stringify(data),
		})
		if (res.status === 200) {
			var resp = await res.json()
			console.log(resp)
			// route to booking/success with data
			router.push({
				pathname: "/booking/success",
				query: {
					// @ts-ignore
					id: resp.data._id,
				},
			})
		} else {
			alert("Something went wrong| Try again")
		}
	}

	return (
		<main className="bg-primaryBg p-4">
			<h1 className="font-poppins font-bold text-2xl">Add Booking</h1>
			<div className="mt-6 bg-white py-4 border shadow-sm rounded-md min-h-[300px]">
				<form onSubmit={handleSubmit}>
					<div className="grid grid-cols-3 gap-4 px-4 font-poppins">
						<div className="p-3 ">
							<label
								htmlFor="firstName"
								className="text-blue-600 "
							>
								First Name
							</label>
							<TextField
								required
								label="Required"
								variant="filled"
								placeholder="First Name"
								name="firstName"
								fullWidth
							/>
						</div>
						<div className="p-3">
							<label
								htmlFor="lastName"
								className="text-blue-600 "
							>
								Last Name
							</label>
							<TextField
								required
								label="Required"
								variant="filled"
								placeholder="Last Name"
								name="lastName"
								fullWidth
							/>
						</div>
						<div className="p-3 flex flex-col">
							<label htmlFor="gender" className="text-blue-600 ">
								Gender
							</label>
							<Select
								required
								label="Gender"
								variant="filled"
								defaultValue={"Male"}
								name="gender"
							>
								<MenuItem value={"Male"}>Male</MenuItem>
								<MenuItem value={"Female"}>Female</MenuItem>
								<MenuItem value={"Others"}>Others</MenuItem>
							</Select>
						</div>
						<div className="p-3">
							<label htmlFor="email" className="text-blue-600">
								Email
							</label>
							<TextField
								required
								label="Required"
								variant="filled"
								placeholder="Email"
								name="email"
								fullWidth
							/>
						</div>
						<div className="p-3">
							<label htmlFor="phone" className="text-blue-600 ">
								Phone
							</label>
							<TextField
								required
								label="Required"
								variant="filled"
								placeholder="Phone"
								name="phone"
								fullWidth
							/>
						</div>
						<div className="p-3 flex flex-col">
							<label
								htmlFor="roomType"
								className="text-blue-600 "
							>
								Room Type
							</label>
							<Select
								required
								label="Room Type"
								variant="filled"
								name="roomType"
								defaultValue={"Select"}
								onChange={(e) => setRoomType(e.target.value)}
							>
								<MenuItem value={"Select"} disabled>
									Select
								</MenuItem>
								{props.rooms.map((room) => {
									return (
										<MenuItem
											// @ts-ignore
											key={room.id}
											// @ts-ignore
											value={room.id}
											disabled={
												room.status === "Active"
													? false
													: true
											}
										>
											{room.name}
										</MenuItem>
									)
								})}
							</Select>
						</div>
						<div className="p-3">
							<label
								htmlFor="fromDate"
								className="text-blue-600 "
							>
								From Date
							</label>
							<TextField
								required
								variant="filled"
								placeholder="From Date"
								name="fromDate"
								fullWidth
								id="fromDate"
								type={"date"}
								onChange={(e) =>
									setFromDate(
										new Date(e.target.value).getTime()
									)
								}
							/>
						</div>
						<div className="p-3">
							<label htmlFor="toDate" className="text-blue-600 ">
								To Date
							</label>
							<TextField
								required
								variant="filled"
								placeholder="To Date"
								name="toDate"
								id="toDate"
								fullWidth
								type={"date"}
								onChange={(e) =>
									setToDate(
										new Date(e.target.value).getTime()
									)
								}
							/>
						</div>
						<div className="p-3">
							<label
								htmlFor="numberOfGuests"
								className="text-blue-600 "
							>
								Number of Persons
							</label>
							<TextField
								required
								variant="filled"
								placeholder="Number of Persons"
								name="numberOfGuests"
								fullWidth
								type={"number"}
							/>
						</div>
						<div className="p-3 flex flex-col">
							<label
								htmlFor="paymentMethod"
								className="text-blue-600 "
							>
								Payment Method
							</label>
							<Select
								required
								label="Payment Method"
								variant="filled"
								defaultValue={"Cash"}
								name="paymentMethod"
							>
								<MenuItem value={"Cash"}>Cash</MenuItem>
								<MenuItem value={"Card"}>Card</MenuItem>
								<MenuItem value={"UPI"}>UPI</MenuItem>
							</Select>
						</div>
						<div className="p-3">
							<label htmlFor="tip" className="text-blue-600 ">
								Tip
							</label>
							<TextField
								required
								variant="filled"
								placeholder="Tip"
								name="tip"
								fullWidth
								defaultValue={tip}
								type={"number"}
								onChange={(e) =>
									setTip(parseInt(e.target.value))
								}
							/>
						</div>
					</div>
					<hr />
					<div className="p-4">
						<h2 className="font-poppins font-bold text-xl">
							Summary
						</h2>

						<div className="flex mt-4 justify-between w-[50%]">
							<p className="font-poppins ">From Date</p>
							<p className="font-poppins ">
								{new Date(fromDate as number).toDateString()}
							</p>
						</div>
						<div className="flex mt-4 justify-between w-[50%]">
							<p className="font-poppins ">To Date</p>
							<p className="font-poppins ">
								{new Date(toDate as number).toDateString()}
							</p>
						</div>
						<div className="flex mt-4 justify-between w-[50%]">
							<p className="font-poppins ">Room Type</p>
							<p className="font-poppins ">
								{props.rooms
									.filter((room) => {
										// @ts-ignore
										return room.id === roomType
									})
									.map((room) => {
										return room.name
									})}
							</p>
						</div>
						<div className="flex mt-4 justify-between w-[50%]">
							<p className="font-poppins ">
								Number of Days of Stay
							</p>
							<p className="font-poppins ">
								{Math.ceil(days(fromDate, toDate))}
							</p>
						</div>
						{/* gst */}
						<div className="flex mt-4 justify-between w-[50%]">
							<p className="font-poppins ">
								GST (18% of Total Amount)
							</p>
							<p className="font-poppins ">
								{"₹"}
								{tax}
								{"/-"}
							</p>
						</div>

						<div className="flex mt-4 justify-between w-[50%]">
							<p className="font-poppins ">
								Total Amount to be Paid
							</p>
							<p className="font-poppins ">
								{"₹"}
								{/* @ts-ignore */}
								{parseFloat(totalAmount) + tax[0] + tip}
								{"/-"}
							</p>
						</div>
					</div>
					<hr />
					<div
						className="p-3"
						style={{
							gridColumn: "2/1",
						}}
					>
						<button
							type="submit"
							className="p-4 bg-green-300 w-[100px] hover:scale-[1.1] transition-all duration-100 ease-in-out rounded-md text-blue-900 font-semibold"
						>
							BOOK
						</button>
					</div>
				</form>
			</div>
		</main>
	)
}

export async function getServerSideProps() {
	await dbConnect()
	const res = await Rooms.find({})
	const data = res.map((doc: { toObject: () => any }) => {
		const el = doc.toObject()
		el.id = el._id.toString()
		delete el._id
		return el
	})

	return {
		props: {
			rooms: data as RoomType[],
		},
	}
}
