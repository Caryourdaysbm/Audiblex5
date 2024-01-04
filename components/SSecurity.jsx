import React, { useEffect, useState } from "react";
import Image from "../assets/images/image";
import {
	fetchAPI,
	reqOptions,
	HOST_URL,
	getCookie,
} from "../assets/js/help_func";
import FormError from "./forms/FormError";

// Note: This is Account Security Component ...
// 1. Security alert bell
// 2. Two - factor Authentication
// 3. Set password
// 4. Detect Connected Devices

const Security = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();

	useEffect(() => {
		if (status === 200) {
			document.querySelector("form").reset();
		}
	}, [data, status]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setData();
		setError();

		const formData = new FormData(e.target);
		if (!formData.get("thumbnail")) {
			formData.delete("thumbnail");
		}
		let requestOptions = reqOptions("PUT", new FormData(e.target), true);
		fetchAPI(
			setData,
			`${HOST_URL()}/api/v1/users/change_password/`,
			requestOptions,
			true,
			setStatus,
			setError
		);
	};
	return (
		<>
			<div className="acct_settings">
				<form onSubmit={handleSubmit}>
					{/* ============
            Security alert
          =============== */}
					<div className="rec_banner">
						{/* <h4 className="mb-3">Recommended</h4>
						<div className="change_flex">
							<div className="sec_alert">
								<h5 className="mb-1">Security alert</h5>
								<p>
									Improve the security of your account by getting alerts when
									someone tries logging in to your account from an unknown
									deciceor browser.
								</p>
							</div>

							<div>
								<div className="switch_parent">
									<label className="switch">
										<input type="checkbox" />
										<span className="slider round"></span>
									</label>
								</div>
							</div>
						</div> */}

						{/* =====================
          2 FACTORS AUTHENTICATION
          ======================== */}
						{/* <div className="change_flex mt-4">
							<div className="sec_alert">
								<h5 className="mb-1">Two - factor Authentication</h5>
								<p>
									To help keep your account secure, we'll ask you to submit a
									code when using a new device to log in. We'll send the code
									via SMS, email, or Fiver notification.
								</p>
							</div>

							<div className="mt-2">
								<div className="switch_parent">
									<label className="switch">
										<input type="checkbox" />
										<span className="slider round"></span>
									</label>
								</div>
							</div>
						</div> */}
					</div>

					<div className="set_password mt-5">
						<h4>Set password</h4>
						<p>
							<input
								type="text"
								placeholder="Current password"
								name="old_password"
								required
							/>
						</p>
						<p>
							<input
								type="text"
								placeholder="New password"
								name="new_password"
								required
							/>
						</p>
						<p>
							<input
								type="text"
								placeholder="Confirm password"
								className="mb-1"
								name="confirm_password"
								required
							/>
						</p>
						<p>
							8 characters or longer. Combine upper and lowercase letters and
							numbers.
						</p>

						{/* <FormError errors={error} status={status} /> */}
						<button className="native-btn">Change password</button>
						{data && data.detail ? (
							<p className="message">{data.detail}</p>
						) : (
							""
						)}
						{error && error.detail ? (
							<p className="message">{error.detail}</p>
						) : (
							""
						)}
					</div>

					{/* <div className="connected pt-4">
						<h4>Connected Devices</h4>

						<div className="all_devices">
							<div className="d_wrap">
								<div className="devices desktop">
									<h5>Desktop - Lagos, Nigeria</h5>
									<p>
										Chrome - <span> Active now</span>
									</p>
								</div>

								<img src={Image.close} alt="" />
							</div>
							<div className="d_wrap bdt">
								<div className="devices phones">
									<h5>Iphone - Port Harcourt, Nigeria</h5>
									<p>
										Safari - <span> June 21 2022 @ 4:00 PM</span>
									</p>
								</div>

								<img src={Image.close} alt="" />
							</div>
						</div>
					</div> */}
				</form>
			</div>
		</>
	);
};

export default Security;
