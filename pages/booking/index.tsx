import Link from "next/link"
import {
	DataGrid,
	GridColDef,
	GridRenderCellParams,
	GridToolbar,
} from "@mui/x-data-grid"

import dbConnect from "@/lib/dbConnect"
import BookingModel, { BookingType } from "@/models/Booking.model"
import Head from "next/head"
import Header from "@/components/header"
// @ts-ignore
function Item(params: GridRenderCellParams<string>) {
	return (
		<>
			<div className="flex">
				<Link href={`/booking/edit/?id=${params.id}`}>
					<svg
						clipRule="evenodd"
						fillRule="evenodd"
						strokeLinejoin="round"
						strokeMiterlimit="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
					>
						<path
							d="m4.481 15.659c-1.334 3.916-1.48 4.232-1.48 4.587 0 .528.46.749.749.749.352 0 .668-.137 4.574-1.492zm1.06-1.061 3.846 3.846 11.321-11.311c.195-.195.293-.45.293-.707 0-.255-.098-.51-.293-.706-.692-.691-1.742-1.74-2.435-2.432-.195-.195-.451-.293-.707-.293-.254 0-.51.098-.706.293z"
							fillRule="nonzero"
						/>
					</svg>
				</Link>
				<Link href={`/booking/delete/?id=${params.id}`}>
					<svg
						clipRule="evenodd"
						fillRule="evenodd"
						strokeLinejoin="round"
						strokeMiterlimit="2"
						viewBox="0 0 24 24"
						xmlns="http://www.w3.org/2000/svg"
						width={24}
						height={24}
					>
						<path
							d="m20.015 6.506h-16v14.423c0 .591.448 1.071 1 1.071h14c.552 0 1-.48 1-1.071 0-3.905 0-14.423 0-14.423zm-5.75 2.494c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-4.5 0c.414 0 .75.336.75.75v8.5c0 .414-.336.75-.75.75s-.75-.336-.75-.75v-8.5c0-.414.336-.75.75-.75zm-.75-5v-1c0-.535.474-1 1-1h4c.526 0 1 .465 1 1v1h5.254c.412 0 .746.335.746.747s-.334.747-.746.747h-16.507c-.413 0-.747-.335-.747-.747s.334-.747.747-.747zm4.5 0v-.5h-3v.5z"
							fillRule="nonzero"
						/>
					</svg>
				</Link>
			</div>
		</>
	)
}

const columns: GridColDef[] = [
	{
		field: "firstName",
		headerName: "Name",
		width: 200,
	},
	{
		field: "email",
		headerName: "Email",
		width: 200,
	},
	{
		field: "phone",
		headerName: "Phone",
		width: 100,
	},
	{
		field: "fromDate",
		headerName: "From Date",
		width: 150,
	},
	{
		field: "toDate",
		headerName: "To Date",
		width: 100,
	},
	{
		field: "roomType",
		headerName: "R.Type",
		width: 100,
	},
	{
		field: "numberOfGuests",
		headerName: "Guests",
		width: 100,
	},
	{
		field: "total",
		headerName: "Total",
		width: 100,
	},
	{
		field: "status",
		headerName: "Status",
		width: 100,
	},
	{
		field: "id",
		headerName: "",
		renderCell: Item,
		width: 100,
	},
]

columns.forEach((column) => {
	column.headerClassName =
		"font-poppins text-lg font-semibold bg-blue-500 text-white"
})

export default function Booking(props: { booking: BookingType[] }) {
	return (
		<>
			<Header />
			<main className="p-4 bg-primaryBg">
				<Head>
					<title>Bookings | All Bookings</title>
				</Head>
				<div className="flex p-4 justify-between">
					<div>
						<h1 className="font-poppins text-2xl">Bookings</h1>
						<p>
							Here is a list of upcoming bookings. You can also
							add a new booking, or Edit or Delete an existing
							booking.
						</p>
					</div>
					<Link
						href={"/booking/add"}
						className="p-3 my-auto w-fit h-fit bg-blue-500 rounded-full scale-1 hover:scale-[1.1] transition-all ease-in-out duration-200"
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
					</Link>
				</div>
				<div className="h-[75vh] min-h-[60vh]  w-fit p-4">
					<DataGrid
						rows={props.booking}
						columns={columns}
						slots={{ toolbar: GridToolbar }}
						getRowClassName={(params) => {
							if (params.row.status === "Cancelled")
								return "bg-red-200 "
							return "bg-white cursor-pointer "
						}}
						initialState={{
							sorting: {
								sortModel: [
									{ field: "fromDate", sort: "asce" },
								],
							},
						}}
					/>
				</div>
			</main>
		</>
	)
}

export async function getServerSideProps() {
	await dbConnect()
	const res = await BookingModel.find({}).populate("roomType")
	const data = res.map((doc, idx) => {
		const booking: BookingType = doc.toObject()
		// @ts-ignore
		booking.id = booking._id.toString()
		// @ts-ignore
		delete booking._id

		// @ts-ignore
		var roomType = booking.roomType.shortCode
		// @ts-ignore
		delete booking.roomType
		booking.roomType = roomType

		var fromDate = new Date(booking.fromDate).toLocaleDateString()
		// @ts-ignore
		delete booking.fromDate
		// @ts-ignore
		booking.fromDate = fromDate

		var toDate = new Date(booking.toDate).toLocaleDateString()
		// @ts-ignore-10
		delete booking.toDate
		// @ts-ignore
		booking.toDate = toDate
		return booking
	})
	return {
		props: {
			booking: data,
		},
	}
}
