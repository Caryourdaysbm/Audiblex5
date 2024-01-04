import React from "react";
import Footer from "../components/Footer";
import PlanList from "../components/payments/PlanList";
import Heading from "../components/Heading";
import PrimaryNavbar from "../components/navbar/PrimaryNavbar";

import {
	fetchAPI,
	spinBtn,
	handleError,
	setCookie,
	HOST_URL,
	reqOptions,
} from "../assets/js/help_func";
import Loading from "../components/forms/Loading";

const Settings = ({ data, status }) => {
	if (status === 200) {
		return (
			<>
				<PrimaryNavbar />
				<Heading />

				{/* Add yearly toggle */}
				<PlanList data={data} />

				<Footer />
			</>
		);
	} else {
		return <Loading />;
	}
};

export default Settings;

export async function getServerSideProps(context) {
	const { params, req, res, query } = context;
	// const { username, slug } = params;

	const objects = {};

	let requestOptions = reqOptions("GET", null);
	const response = await fetch(
		HOST_URL() + `/api/v1/plans/`,
		requestOptions
	).then((res) => {
		objects["status"] = res.status;
		if (res.ok) return res.json();
		else return { message: "No record" };
	});

	objects["data"] = await response;
	console.log(objects);

	return {
		props: objects,
	};
}
