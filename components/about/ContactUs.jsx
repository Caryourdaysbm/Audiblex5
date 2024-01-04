import Image from "next/image";
import React, { useEffect, useState } from "react";
import Images from "../../assets/images/image";
import { fetchAPI, reqOptions, HOST_URL } from "../../assets/js/help_func";
import FormError from "../forms/FormError";

const ContactUs = () => {
	const [data, setData] = useState();
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const [message, setMessage] = useState("");

	const handleSubmit = (e) => {
		e.preventDefault();
		setMessage("");
		let requestOptions = reqOptions("post", new FormData(e.target));
		fetchAPI(
			setData,
			HOST_URL() + "/api/v1/chats/contacts/",
			requestOptions,
			true,
			setStatus,
			setError
		);
	};

	useEffect(() => {
		if (status === 201) {
			setMessage("Message received, we will get in touch!");
			document.querySelector("form").reset();
		}
	}, [status]);

	return (
		<section className="container contact_us mini_flex">
			<div className="thanks">
				<h2>
					Thanks for your interest in <span>Instasew!</span>{" "}
				</h2>
				<p>
					Want to learn more about the end-to-end business automation platform?
					Submit this form and our representative will contact you soon.
				</p>
				<Image src={Images.Grid} alt="Video" width={430.648} height={291.828} />
			</div>

			<div className="the_form">
				<form onSubmit={handleSubmit}>
					<input
						type="text"
						placeholder="FullName*"
						name="full_name"
						required
					/>
					<input
						type="email"
						placeholder="Email Address*"
						name="email"
						required
					/>
					<textarea
						placeholder="Enter your enquiry here"
						name="message"
						required
					></textarea>
					<button className="native-btn">Submit </button>
					<FormError errors={error} status={status} />

					{/* Success Message */}
					{message ? <p className="message">{message}</p> : ""}
					<p className="contact_privacy">
						By clicking “Submit form” you agree to receiving Marketing
						communications from us in accordance with our{" "}
						<a href="">Privacy policy.</a>
					</p>
				</form>
			</div>
		</section>
	);
};
export default ContactUs;
