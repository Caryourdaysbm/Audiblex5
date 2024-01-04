import React, { useState, useEffect } from "react";

import Sideavatar from "../../Sideavatar";
import Images from "../../../assets/images/image";
import Link from "next/link";
import {
	reqOptions,
	fetchAPI,
	HOST_URL,
	setCookie,
	getCookie,
	ApiCall,
} from "../../../assets/js/help_func";
import SignupSteps from "./SignupSteps";
import { useRouter } from "next/router";
import Interest from "../Interest";
import FormError from "../../forms/FormError";

/*
  Stages of registration.
  1. Pick user_type
  2. Create account account
  3. Verify
  4. Add details

  if business, add business info
  else go to landing page. 
*/

function CreateAccount(props) {
	const [page, setPage] = useState(0);
	const [data, setData] = useState([]);
	const [status, setStatus] = useState();
	const [error, setError] = useState(null);
	const [userID, setUserID] = useState();
	const [endpoint, setEndPoint] = useState("/api/v1/auth/registration/");
	const [methods, setMethods] = useState("POST");
	const [requestOptions, setRequestOptions] = useState("POST");
	const router = useRouter();
	const { query, stage } = router;

	const updateParams = (params) => {
		// Update query params.
		const newQuery = { ...query };
		newQuery["stage"] = params;
		router.replace({
			query: newQuery,
		});
	};

	const [side_desc, setSide_desc] = useState({
		img: Images.D2,
		header: "You just a few steps from becoming a creator.",
		paragraph: "Start your account set up in minutes, save time and money. ",
	});

	const [formData, setFormData] = useState({
		username: "",
		first_name: "",
		last_name: "",
		email: "",
		password1: "",
		password2: "",
		user_type: props.types,
		gender: "",
		date_of_birth: "",
		nationality: "",
		mobile: "",
		address: "",
		business_name: "",
		description: "",
		country: "",
		city: "",
		otp: "",
	});

	const FormTitles = ["Create an account", "Bio data", "Business information"];

	const displaySideImage = (p) => {
		// update side description state.
		if (p === 0) {
			setSide_desc({
				img: Images.D2,
				header: "You just a few steps from becoming a creator.",
				paragraph:
					"Start your account set up in minutes, save time and money. ",
			});
		} else if (p === 1) {
			setSide_desc({
				img: Images.Bio2,
				header: "You just a few steps from becoming a creator.",
				// paragraph: "This is paragraph 2!",
			});
		} else if (p === 2) {
			setSide_desc({
				img: Images.Bio3,
				header: "You just a few steps from becoming a creator.",
				paragraph: "This is paragraph 3!",
			});
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setError(null);

		const newFormData = new FormData(e.target);

		for (const key in formData) {
			newFormData.append(key, formData[key]);
		}
		console.log(formData);

		const get_access_token =
			query["stage"] === "Create" || query["stage"] === "Verify" ? false : true;
		let requestOptions = reqOptions(methods, newFormData, get_access_token);
		fetchAPI(
			setData,
			HOST_URL() + endpoint,
			requestOptions,
			true,
			setStatus,
			setError
		);
	};

	useEffect(() => {
		if (data["message"] === "Please verify your email address.") {
			setEndPoint("/api/v1/auth/verify_account/");
			updateParams("Verify");
		} else if (data["message"] === "Successfully verify your mail") {
			setEndPoint(`/api/v1/users/profile_update/${formData.email}/`);
			updateParams("Details");
			setMethods("PUT");
			setCookie("verified", true);
			
		} else if (data.user?.verified) {
			setEndPoint(`/api/v1/users/profile_update/${formData.email}/`);
			setMethods("PUT");
			// Change state to eigther interest or biz info
			if (formData.user_type === "CUSTOMER") {
				updateParams("Interest");
			} else if (formData.user_type === "FREELANCER" && !data.business_name) {
				updateParams("Biz-info");
			} else if (formData.user_type === "FREELANCER" && data.business_name) {
				updateParams("Interest");
			}
		}

		// Update stage params to interest after userprofile details or business details
		if (
			data["profile"] &&
			data["profile"].business_name &&
			query["type"] === "FREELANCER"
		) {
			updateParams("Interest");
		}

		// Store token
		if (data["token"]) {
			setCookie("access", data["token"].access);
			setCookie("refresh", data["token"].refresh);
			setCookie("first_name", data["user"].first_name);
			setCookie("last_name", data["user"].last_name);
			setCookie("email", data["user"].email);
			setCookie("user_type", data["user"].user_type);
			// setCookie("verified", data["user"].verified);
			setCookie("is_staff", data["user"].is_staff);
			setCookie("u_id", data["user"].id);
		}
		if (data["business_name"]) {
			setCookie("profile_image", data["profile_image"]);
			setCookie("business_name", data["business_name"]);
			setCookie("gender", data["gender"]);
			setCookie("username", data["username"]);
		}

		// Redirect users to landing page when finalized signup
		console.log("DATATATATA: ", stage, data);
		if (data && data.interest?.length) {
			router.push(`/${data?.user?.username || formData?.username}/dashboard`);
		}
	}, [data]);

	return (
		<form className="control_Grid" onSubmit={handleSubmit}>
			{props.stages !== "Interest" ? (
				<>
					{query["stage"] !== "Interest" && (
						<Sideavatar
							header={side_desc.header}
							paragraph={side_desc.paragraph}
							image={side_desc.img}
						/>
					)}
					<div className="structure2">
						<div className="">
							<div className="form">
								<div
									className={
										query["stage"] !== "Interest" ? "get_started_form" : ""
									}
								>
									{query["stage"] !== "Interest" && (
										<div className="header">
											<h2>{FormTitles[page]}</h2>
											<p>
												We’ll be using this information to create your business
												account on this platform.
											</p>
										</div>
									)}
									<div>
										<SignupSteps
											formData={formData}
											setFormData={setFormData}
											page={page}
											stages={query["stage"]}
											interests={props.interests}
											types={props.type}
										/>
									</div>

									<FormError errors={error} status={status} />

									<div>
										{query["stage"] !== "Interest" && (
											<button type="submit" className="native-btn">
												{query["stage"]}
											</button>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</>
			) : (
				<Interest interests={props.interests} />
			)}
		</form>
	);
}

export default CreateAccount;
