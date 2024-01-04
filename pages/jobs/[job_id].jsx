import React, { useEffect, useState } from "react";
import JDescription from "../../components/JDescription";
import Footer from "../../components/Footer";
import POverview from "../../components/POverview";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";

import {
	fetchAPI,
	getCookie,
	reqOptions,
	HOST_URL,
} from "../../assets/js/help_func";
import { useRouter } from "next/router";
import Error404 from "../404";
import Error500 from "../500";
import BidedFreelancers from "../../components/jobs/BidedFreelancers";

const FindJobs = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const router = useRouter();
	const { job_id, category, search } = router.query;

	useEffect(() => {
		if (!data || category || search) {
			let cat_params = category ? `?cat=${category}` : "";
			let s_params = search ? `?search=${search}` : "";

			const requestOptions = reqOptions("GET", null, true);
			let access_url = `${HOST_URL()}/api/v1/jobs/${job_id}/`;
			fetchAPI(setData, access_url, requestOptions, true, setStatus, setError);
		}
	});
	if (status === 200) {
		return (
			<>
				<PrimaryNavbar />
				<JDescription data={data} />
				<BidedFreelancers data={data} />
				<POverview data={data} />
				<Footer />
			</>
		);
	} else if (status === 404) {
		return <Error404 />;
	} else if (status === 500) {
		return <Error500 />;
	}
};
export default FindJobs;

// export async function getServerSideProps(context) {
// 	const { params, req, res, query } = context;
// 	const { job_id } = params;

// 	console.log(">>>>>: ", job_id);

// 	const objects = {};
// 	const requestOptions = reqOptions("GET", null);
// 	const endpoint = `/api/v1/jobs/${job_id}/`;

// 	const response = await fetch(HOST_URL() + endpoint, requestOptions)
// 		.then((res) => {
// 			objects["status"] = res.status;

// 			// Return json if return success
// 			if (res.ok) {
// 				return res.json();
// 			}
// 			if (objects.status === 401) {
// 				return { message: "You do not have permission to content." };
// 			}
// 		})
// 		.catch((err) => {
// 			// If server didn't connect.
// 			if (err.cause.code === "ECONNREFUSED") {
// 				objects["status"] = 500;
// 				return { message: "Server couldn't process your request." };
// 			} else {
// 				if (objects.status === 401) {
// 					return { message: "You do not have permission to content." };
// 				} else {
// 					objects["error"] = err;
// 				}
// 			}
// 		});

// 	objects["data"] = await response;

// 	return {
// 		props: objects,
// 	};
// }
