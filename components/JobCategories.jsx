import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Accordion from "./Accordion";
import CJobs from "./CJobs";
import {
	fetchAPI,
	reqOptions,
	HOST_URL,
} from "../assets/js/help_func";

const JobCategories = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const router = useRouter();
	const { category, search } = router.query;

	useEffect(() => {
		if (!data || category || search) {
			let cat_params = category ? `?cat=${category}` : "";
			let s_params = search ? `?search=${search}` : "";

			const requestOptions = reqOptions("GET", null, true);
			let access_url = `${HOST_URL()}/api/v1/jobs/${cat_params}${s_params}`;
			fetchAPI(setData, access_url, requestOptions, true, setStatus, setError);
		}
	}, [category, search]);
	return (
		<div className="container workpress">
			<Accordion />
			{data?.results ? (
				<CJobs data={data} setData={setData} />
			) : data?.results.length === 0 ? (
				<p>No result found</p>
			) : (
				<p>Loading...</p>
			)}
			{/* <PaginationBtn /> */}
		</div>
	);
};

export default JobCategories;
