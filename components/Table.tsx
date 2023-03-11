type TableProps = {
	columns: string[]
	data: (string | React.ReactNode)[][]
}

export default function Table(props: TableProps) {
	const { columns, data } = props
	return (
		<div className="">
			<table className="table-auto">
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								className="px-4 py-2 text-left text-gray-500"
							>
								{column}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{data.map((row, index) => (
						<tr key={index}>
							{row.map((cell, index) => (
								<td
									key={index}
									className="px-4 py-2 text-left text-gray-500"
								>
									{cell}
								</td>
							))}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	)
}
