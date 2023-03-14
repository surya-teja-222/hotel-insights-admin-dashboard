// @ts-no-check
import Header from "@/components/header"
import Head from "next/head"
import dbConnect from "@/lib/dbConnect"
import mongoose from "mongoose"
import RoomSchema from "@/models/Room.model"
import BookingSchema from "@/models/Booking.model"
import FlatSchema from "@/models/flat.model"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"
import { Pie } from "react-chartjs-2"
import { useEffect } from "react"

import { gsap } from "gsap"
ChartJS.register(ArcElement, Tooltip, Legend)
export const data = {
	labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
	datasets: [
		{
			label: "# of Votes",
			data: [12, 19, 3, 5, 2, 3],
			backgroundColor: [
				"rgba(255, 99, 132, 0.2)",
				"rgba(54, 162, 235, 0.2)",
				"rgba(255, 206, 86, 0.2)",
				"rgba(75, 192, 192, 0.2)",
				"rgba(153, 102, 255, 0.2)",
				"rgba(255, 159, 64, 0.2)",
			],
			borderWidth: 1,
		},
	],
}

export default function Home(params: {
	bookings: {
		forToday: {
			count: number
			profit: number
		}
		last7Days: {
			count: number
			profit: number
		}
		total: {
			count: number
			profit: number
		}
	}
	rooms: {
		roomCount: number
		currentlyOccupied: number
		d1: any
		d2: any
	}
}) {
	useEffect(() => {
		gsap.from("*", {
			duration: 1,
			opacity: 0,
			translateY: 20,
		})
	}, [])
	return (
		<>
			<Head>
				<title>🏢Hotel Insights | Home ☀️</title>
			</Head>
			<Header />
			<main className="p-4 bg-primaryBg">
				<div className="flex p-4 justify-between">
					<div>
						<h1 className="font-poppins text-2xl">
							Dashboard Overview
						</h1>
						<p>
							Here is some quick information regarding upcoming
							events and bookings.
						</p>
					</div>
				</div>
				<div className="w-full min-h-8 flex justify-around gap-6">
					<div className="h-[200px] p-4 text-blue-900 flex flex-col rounded-md justify-between gap-2 font-poppins w-[400px] shadow-lg bg-[#fff] hover:scale-[1.01] cursor-pointer transition-all ease-out duration-100">
						<h1 className="text-xl font-semibold">
							Total Bookings
						</h1>
						<h2 className="text-3xl">
							{params.bookings.total.count}
						</h2>
						<div className="flex justify-between">
							<div className="flex flex-col">
								<h3>Today</h3>
								<h3>{params.bookings.forToday.count}</h3>
							</div>
							<div className="flex flex-col">
								<h3>Last 7 Days</h3>
								<h3>{params.bookings.last7Days.count}</h3>
							</div>
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								fillRule="evenodd"
								clipRule="evenodd"
							>
								<path d="M0 22h1v-5h4v5h2v-10h4v10h2v-15h4v15h2v-21h4v21h1v1h-24v-1zm4-4h-2v4h2v-4zm6-5h-2v9h2v-9zm6-5h-2v14h2v-14zm6-6h-2v20h2v-20z" />
							</svg>
						</div>
					</div>
					<div className="h-[200px] p-4 text-blue-900 flex flex-col rounded-md justify-between gap-2 font-poppins w-[400px] shadow-lg  bg-[#fff] hover:scale-[1.01] cursor-pointer transition-all ease-out duration-100">
						<h1 className="text-xl font-semibold">Total Rooms</h1>
						<h2 className="text-3xl">{params.rooms.roomCount}</h2>
						<div className="flex justify-between">
							<div className="">
								<h1 className="text-xl font-semibold">
									Booked Rooms
								</h1>
								<h2 className="text-3xl">
									{params.rooms.currentlyOccupied}
								</h2>
							</div>
							<svg
								width="60"
								height="60"
								xmlns="http://www.w3.org/2000/svg"
								fillRule="evenodd"
								clipRule="evenodd"
								viewBox="0 0 24 24"
							>
								<path d="M12 2h2v2h2v3.702l7 2.618v12.68h1v1h-24v-1h1v-11h6v-8h2v-2h2v-2h1v2zm3 3h-7v18h1v-2h5v2h1v-18zm-2 17h-3v1h3v-1zm8 1h1v-11.987l-6-2.243v14.23h1v-2h4v2zm-14-10h-5v10h1v-2h3v2h1v-10zm-2 9h-1v1h1v-1zm15 0h-2v1h2v-1zm-16-5v2h-1v-2h1zm2 0v2h-1v-2h1zm5-10v12h-1v-12h1zm10 11v1h-4v-1h4zm-8-11v12h-1v-12h1zm8 9v1h-4v-1h4zm-17-2v2h-1v-2h1zm2 0v2h-1v-2h1zm15 0v1h-4v-1h4zm0-2v1h-4v-1h4zm-8-9h-3v1h3v-1z" />
							</svg>
						</div>
					</div>
					<div className="h-[200px] p-4 text-blue-900 flex flex-col rounded-md justify-between gap-2 font-poppins w-[400px] shadow-lg bg-[#fff] hover:scale-[1.01] cursor-pointer transition-all ease-out duration-100">
						<h1 className="text-xl font-semibold">Total Profits</h1>
						<h2 className="text-3xl">
							{params.bookings.total.profit}
						</h2>
						<div className="flex justify-between">
							<div className="flex flex-col">
								<h3>Today</h3>
								<h3>{params.bookings.forToday.profit}</h3>
							</div>
							<div className="flex flex-col">
								<h3>Last 7 Days</h3>
								<h3>{params.bookings.last7Days.profit}</h3>
							</div>
							<svg
								width="48"
								height="48"
								viewBox="0 0 24 24"
								xmlns="http://www.w3.org/2000/svg"
								fillRule="evenodd"
								clipRule="evenodd"
							>
								<path d="M0 22h1v-5h4v5h2v-10h4v10h2v-15h4v15h2v-21h4v21h1v1h-24v-1zm4-4h-2v4h2v-4zm6-5h-2v9h2v-9zm6-5h-2v14h2v-14zm6-6h-2v20h2v-20z" />
							</svg>
						</div>
					</div>
				</div>
				<div className="flex w-full justify-around mt-8 ">
					<div className="flex flex-col text-blue-700 text-3xl">
						<h4 className="mx-auto">Total Rooms Available</h4>
						<Pie data={params.rooms.d1} />
					</div>
					<div className="flex flex-col text-blue-700 text-3xl">
						<h4 className="mx-auto">Total Rooms Booked</h4>
						<Pie data={params.rooms.d2} />
					</div>
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps() {
	const Room = mongoose.models.Room || mongoose.model("Room", RoomSchema)
	const Booking =
		mongoose.models.Booking || mongoose.model("Booking", BookingSchema)
	const Flat = mongoose.models.Flat || mongoose.model("Flat", FlatSchema)

	await dbConnect()

	var forTodayBookings = await Booking.find({
		fromDate: new Date().toISOString().slice(0, 10),
	})
	var forTodayBookingsCount = forTodayBookings.length

	var forTodayBookingProfit = 0
	forTodayBookings.forEach((booking) => {
		forTodayBookingProfit += booking.total - booking.tips
		if (booking.refundAmount) {
			forTodayBookingProfit -= booking.refundAmount
		}
	})

	var last7DaysBookings = await Booking.find({
		fromDate: {
			$lte: new Date().toISOString().slice(0, 10),
			$gte: new Date(new Date().setDate(new Date().getDate() - 7))
				.toISOString()
				.slice(0, 10),
		},
	})
	var last7DaysBookingsCount = last7DaysBookings.length
	var last7DaysBookingProfit = 0
	last7DaysBookings.forEach((booking) => {
		last7DaysBookingProfit += booking.total - booking.tips
		if (booking.refundAmount) last7DaysBookingProfit -= booking.refundAmount
	})

	var totalBookings = await Booking.find({})
	var totalBookingsCount = totalBookings.length
	var totalBookingProfit = 0
	totalBookings.forEach((booking) => {
		totalBookingProfit += booking.total - booking.tips
		if (booking.refundAmount) totalBookingProfit -= booking.refundAmount
	})

	var rooms = await Flat.find({
		status: "Active",
	}).populate("type")
	var occupied = await Flat.find({
		occupied: true,
		status: "Active",
	}).populate("type")

	const d1 = {
		labels: [],
		datasets: [
			{
				label: "Rooms",
				data: [],
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(153, 102, 255, 0.6)",
					"rgba(255, 159, 64, 0.6)",
					"rgba(255, 105, 180, 0.6)",
					"rgba(105, 255, 180, 0.6)",
					"rgba(105, 180, 255, 0.6)",
				],
				borderWidth: 1,
			},
		],
	}

	// find rooms with same scode
	rooms.forEach((room) => {
		// @ts-ignore
		if (!d1.labels.includes(room.type.name)) {
			// @ts-ignore
			d1.labels.push(room.type.name)
			// @ts-ignore
			d1.datasets[0].data.push(1)
		} else {
			// @ts-ignore
			d1.datasets[0].data[d1.labels.indexOf(room.type.name)] += 1
		}
	})

	const d2 = {
		labels: [],
		datasets: [
			{
				label: "Rooms",
				data: [],
				backgroundColor: [
					"rgba(255, 99, 132, 0.6)",
					"rgba(54, 162, 235, 0.6)",
					"rgba(255, 206, 86, 0.6)",
					"rgba(75, 192, 192, 0.6)",
					"rgba(153, 102, 255, 0.6)",
					"rgba(255, 159, 64, 0.6)",
					"rgba(255, 105, 180, 0.6)",
					"rgba(105, 255, 180, 0.6)",
					"rgba(105, 180, 255, 0.6)",
				],
				borderWidth: 1,
			},
		],
	}

	occupied.forEach((room) => {
		// @ts-ignore
		if (!d2.labels.includes(room.type.name)) {
			// @ts-ignore
			d2.labels.push(room.type.name)
			// @ts-ignore
			d2.datasets[0].data.push(1)
		} else {
			// @ts-ignore
			d2.datasets[0].data[d2.labels.indexOf(room.type.name)] += 1
		}
	})

	return {
		props: {
			bookings: {
				forToday: {
					count: forTodayBookingsCount,
					profit: forTodayBookingProfit,
				},
				last7Days: {
					count: last7DaysBookingsCount,
					profit: last7DaysBookingProfit,
				},
				total: {
					count: totalBookingsCount,
					profit: totalBookingProfit,
				},
			},
			rooms: {
				roomCount: rooms.length,
				d1: d1,
				d2: d2,
				currentlyOccupied: occupied.length,
			},
		},
	}
}
