import React, { useEffect, useState } from "react";
import Images from "../../assets/images/image";
import Option from "../Option";
import {
	fetchAPI,
	reqOptions,
	HOST_URL,
	getCookie,
} from "../../assets/js/help_func";
import FormError from "../forms/FormError";

// Note: This Component has 2 different Form ...
// 1. Updating the Account Settings
// 2. Deleting Account

const AccountSettings = (props) => {
	const [data, setData] = useState(null);
	const [update, setUpdate] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const [username, setUsername] = useState();
	const [message, setMessage] = useState("");

	useEffect(() => {
		if (!data) {
			const requestOptions = reqOptions("GET", null);
			let access_url = `${HOST_URL()}/api/v1/users/details/${props.username}/`;
			fetchAPI(setData, access_url, requestOptions, true);
		}

		setUsername(getCookie("username"));

		if (status === 200) {
			setMessage("Profile updated.");
			document.querySelector("form").reset();
		}
	}, [data, status]);

	const handleSubmit = (e) => {
		e.preventDefault();
		setMessage("");

		const formData = new FormData(e.target);
		if (!formData.get("thumbnail")) {
			formData.delete("thumbnail");
		}
		if (!formData.get("banner")) {
			formData.delete("banner");
		}
		let requestOptions = reqOptions("PUT", new FormData(e.target), true);
		fetchAPI(
			setData,
			`${HOST_URL()}/api/v1/users/profile_update/${data?.user?.email}/`,
			requestOptions,
			true,
			setStatus,
			setError
		);
	};
	return (
		<>
			<div className="acct_settings">
				<div className="inner_dic">
					<form onSubmit={handleSubmit}>
						<h4>Account settings</h4>
						<p>
							Personalize your experience and make big account changes here,
							This information will be displayed publicly so be careful what you
							share.
						</p>

						<div className="pic_change">
							<img src={data?.thumbnail} alt="" />
							<label htmlFor="upload_image_settings">Change thumbnail</label>
							<input type="file" id="upload_image_settings" name="thumbnail" />
						</div>

						<div className="primary_q">
							<input
								type="text"
								defaultValue={data?.username}
								readOnly
								name="username"
							/>
							<div className="form_field">
								<label htmlFor="banner_id">Change Banner</label>
								<input
									id="banner_id"
									type="file"
									defaultValue={data?.banner}
									readOnly
									name="banner"
								/>
							</div>
							<input
								type="text"
								placeholder="Cameron"
								defaultValue={data?.user.first_name}
								name="user__first_name"
							/>
							<input
								type="text"
								placeholder="Williamson"
								defaultValue={data?.user.last_name}
								name="user__last_name"
							/>
							<input
								type="text"
								placeholder="Nationality"
								defaultValue={data?.address}
								name="address"
							/>
							<input
								type="text"
								placeholder="City"
								defaultValue={data?.city}
								name="city"
							/>
							<input
								type="text"
								placeholder="Country"
								defaultValue={data?.country}
								name="country"
							/>

							{/* <div className="selected_g">
                <Select options={options} />
              </div> */}
						</div>

						{/* <div className="social_q mt-6">
							<h5 className="mb-1">Social Links</h5>
							<input type="text" placeholder="Facebook" className="f_before" />
							<input type="text" placeholder="Instagram" />
							<input type="text" placeholder="Website (Optional)" />
						</div> */}
						<FormError errors={error} status={status} />
						<button className="native-btn">Save Changes</button>
						{message ? <p className="message">{message}</p> : ""}
					</form>
				</div>

				{/* <div className="deleting">
          <form action="">
            <h5 className="mb-1">Account Deactivation</h5>
            <p>
              Would you like to delete your account? By deleting your account
              will lose all your data.
            </p>
            <button type="submit" className="native-btn">
              Delete account
            </button>
          </form>
        </div> */}
			</div>
		</>
	);
};

export default AccountSettings;
