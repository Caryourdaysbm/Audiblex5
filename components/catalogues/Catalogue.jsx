import React, { useEffect, useState } from "react";
import Link from "next/link";
import DummyData from "../../assets/json/samples.json";
import Images from "../../assets/images/image";
import CatalogueCreateBtn from "./CatalogueCreateBtn";
import {
	fetchAPI,
	reqOptions,
	HOST_URL,
	getCookie,
} from "../../assets/js/help_func";
import { useRouter } from "next/router";
import RadioButton from "../forms/RadioButton";

const Catalogue = (props) => {
	const router = useRouter();
	const { username } = router.query;
	const usernameParams = username;

	const [showOverlay, setShowOverlay] = useState("add_new_member");
	const [data, setData] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const [categories, setCategories] = useState(null);
	const [close, setClose] = useState("close_btn");
	const [cookieUsername, setCookieUsername] = useState();
	const [userID] = useState(getCookie("u_id"));

	const OverlayForm = () => {
		showOverlay === "add_new_member"
			? setShowOverlay("add_new_member show_overlay")
			: setShowOverlay("add_new_member");
		close === "close_btn" ? setClose("close_btn") : setClose("close_btn");
	};

	useEffect(() => {
		if (categories === null) {
			const requestOptions = reqOptions("GET", null);
			let access_url = `${HOST_URL()}/api/v1/categorys/category_list/`;
			fetchAPI(setCategories, access_url, requestOptions, true);
		}
		if (status === 201 && data) {
			props.catalogues.results.unshift(data.data);
			setData(null);
			setShowOverlay("add_new_member");
			document.querySelector("#create_collection").reset();
		}
		setCookieUsername(getCookie("username"));
	}, [categories, status, props.catalogues]);

	const handleSubmit = (e) => {
		e.preventDefault();
		let requestOptions = reqOptions("post", new FormData(e.target), true);
		fetchAPI(
			setData,
			HOST_URL() + "/api/v1/catalogues/" + props.username,
			requestOptions,
			true,
			setStatus,
			setError
		);
	};

	return (
		<>
			<section className="container">
				<div className="mt-10">
					<h3 className="blog_head mt-7">My Catalogue</h3>
				</div>
				<div className="card_flex">
					{props.catalogues &&
						props.catalogues.results &&
						props.catalogues.results.map((option, index) => {
							return (
								<div className="each_card" key={index}>
									<Link
										href={`/${props.username || usernameParams}/catalogue/${
											option.id
										}`}
									>
										<div className="each_catelogue">
											<img src={option.image} alt={option.name} />
											<div className="catelogue_desc">
												<h3>{option.name}</h3>
												<p>
													{option.catalogue_items_count} Collection
													{option.catalogue_items_count > 1 && "s"}
												</p>
											</div>
										</div>
									</Link>
								</div>
							);
						})}

					{/* ADDING A NEW COLLECTION */}
					{props.username === cookieUsername ? (
						<CatalogueCreateBtn
							overlay={OverlayForm}
							listCount={props.catalogues.results.length}
						/>
					) : (
						""
					)}
				</div>

				<div style={{zIndex: 500}} className={showOverlay}>
					<div className="member_form" id="add_to_collection">
						<div className="easy_apply">
							<h5>Create Collection</h5>
							<p>
							You have a limit of 1 collection and 500MB of image upload space on
								<b> your free plan,</b> upgrade for <b>unlimited uploads</b>
							</p>
							<img
								src={Images.close}
								alt="close"
								onClick={OverlayForm}
								className={close}
							/>
						</div>

						<form action="" id="create_collection" onSubmit={handleSubmit}>
							<input
								type="file"
								accept="image/*"
								name="image"
								placeholder="Collection Name"
							/>
							<input type="text" name="name" placeholder="Collection Name" />
							<select name="category">
								<option value={""}>Select Category</option>
								{categories &&
									categories.results &&
									categories.results.map((option, index) => {
										return (
											<option value={option.id} key={index}>
												{option.name}
											</option>
										);
									})}
							</select>
							<textarea
								name="description"
								id=""
								cols="30"
								rows="10"
								placeholder="Description"
							></textarea>

							<RadioButton
								objects={[
									{ title: "Private", value: true },
									{ title: "Public", value: false },
								]}
								name="private"
								heading="Visibility"
							/>

							<input
								type="text"
								name="freelancer"
								defaultValue={userID}
								hidden
							/>
							<button className="native-btn">Create Collection</button>
						</form>
					</div>
				</div>
			</section>
		</>
	);
};
export default Catalogue;
