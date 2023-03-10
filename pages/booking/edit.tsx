import TextField from "@mui/material/TextField"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import dbConnect from "@/lib/dbConnect"
import Rooms, { RoomType } from "@/models/Room.model"
import Booking, { BookingType } from "@/models/Booking.model"
import React, { useEffect, useState } from "react"
import { useRouter } from "next/router"
import Header from "@/components/header"

export default function EditBookingPage(props: {
	rooms: RoomType[]
	booking: BookingType
}) {
	// @ts-ignore
	const [roomType, setRoomType] = useState<string>(props.booking.roomType.id)
	const [fromDate, setFromDate] = useState<number>(
		new Date(props.booking.fromDate).getTime() + 86400000
	)
	const [toDate, setToDate] = useState<number>(
		new Date(props.booking.toDate).getTime() + 86400000
	)
	const [tip, setTip] = useState<number>(props.booking.tips)
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
		// @ts-ignore
		data["id"] = props.booking.id
		const res = await fetch("/api/edit/booking", {
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
		<>
			<Header />
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
									defaultValue={props.booking.firstName}
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
									defaultValue={props.booking.lastName}
								/>
							</div>
							<div className="p-3 flex flex-col">
								<label
									htmlFor="gender"
									className="text-blue-600 "
								>
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
								<label
									htmlFor="email"
									className="text-blue-600"
								>
									Email
								</label>
								<TextField
									required
									label="Required"
									variant="filled"
									placeholder="Email"
									name="email"
									fullWidth
									defaultValue={props.booking.email}
								/>
							</div>
							<div className="p-3">
								<label
									htmlFor="phone"
									className="text-blue-600 "
								>
									Phone
								</label>
								<TextField
									required
									label="Required"
									variant="filled"
									placeholder="Phone"
									name="phone"
									fullWidth
									defaultValue={props.booking.phone}
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
									// @ts-ignore
									defaultValue={props.booking.roomType.id}
									onChange={(e) =>
										setRoomType(e.target.value)
									}
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
									defaultValue={new Date(fromDate)
										.toISOString()
										.slice(0, 10)}
									onChange={(e) =>
										setFromDate(
											new Date(e.target.value).getTime()
										)
									}
								/>
							</div>
							<div className="p-3">
								<label
									htmlFor="toDate"
									className="text-blue-600 "
								>
									To Date
								</label>
								<TextField
									required
									variant="filled"
									placeholder="To Date"
									name="toDate"
									id="toDate"
									fullWidth
									defaultValue={new Date(toDate)
										.toISOString()
										.slice(0, 10)}
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
									defaultValue={props.booking.numberOfGuests}
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
									defaultValue={props.booking.paymentMethod}
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
									{new Date(
										fromDate as number
									).toDateString()}
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
								UPDATE
							</button>
						</div>
					</form>
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps(q: any) {
	console.log(q.query.id)

	const roomType = q.query.id
	await dbConnect()
	const res = await Rooms.find({})
	const data = res.map((doc: { toObject: () => any }) => {
		const el = doc.toObject()
		el.id = el._id.toString()
		delete el._id
		return el
	})

	const booking = await Booking.findById(roomType).populate("roomType")
	const bookingData = booking.toObject()
	bookingData.id = bookingData._id.toString()
	delete bookingData._id
	bookingData.roomType.id = bookingData.roomType._id.toString()
	delete bookingData.roomType._id
	var from = bookingData.fromDate
	var to = bookingData.toDate
	delete bookingData.fromDate
	delete bookingData.toDate
	bookingData.fromDate = from.toDateString()
	bookingData.toDate = to.toDateString()
	console.log(bookingData)

	return {
		props: {
			rooms: data as RoomType[],
			booking: bookingData as BookingType,
		},
	}
}
