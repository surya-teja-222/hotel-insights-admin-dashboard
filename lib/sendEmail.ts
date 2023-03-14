import nodemailer from "nodemailer"

var transporter = nodemailer.createTransport({
	service: "gmail",
	auth: {
		user: process.env.EMAIL_USER as string,
		pass: process.env.EMAIL_PASS as string,
	},
})

export default function sendMail(
	respText: string,
	email: string,
	subject: string
) {
	/**
	 * Default mail options
	 */
	var mailOptions = {
		from: `"HOTEL INSIGHTS" <${process.env.EMAIL_USER}>`,
		to: email,
		subject: subject,
		html: respText,
	}

	transporter.sendMail(mailOptions, function (error, info) {
		if (error) {
			console.log(error)
		} else {
			console.log("Email sent: " + info.response)
		}
	})
}
