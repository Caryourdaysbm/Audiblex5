import React, { useEffect, useState } from "react";
import AvailableJobs from "./AvailableJobs";
import ActiveJobs from "./ActiveJobs";
import { useRouter } from "next/router";
import { fetchAPI, reqOptions, HOST_URL } from "../assets/js/help_func";

const JobTabs = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const router = useRouter();
	const { category, search } = router.query;

	useEffect(() => {
		if (!data || category || !category || search) {
			let cat_params = category ? `?cat=${category}` : "";
			let s_params = search ? `?search=${search}` : "";

			const requestOptions = reqOptions("GET", null, true);
			let access_url = `${HOST_URL()}/api/v1/jobs/saved_jobs/?category=${category}`;
			fetchAPI(setData, access_url, requestOptions, true, setStatus, setError);
		}
	}, [category, search]);

	const [activeIndex, setActiveIndex] = useState(1);
	const handleClick = (index) => setActiveIndex(index);
	const checkActive = (index, className) =>
		activeIndex === index ? className : "";
	return (
		<>
			<div className="container job_tab">
				<div className="mt-10 tab_flex">
					<div className="tabs flex_1 dummy_height">
						<button
							className={`tab ${
								category === "active" || !category ? "active" : ""
							}`}
							onClick={() => {
								setData(null);
								router.push("?category=active");
							}}
						>
							Active
						</button>
						<button
							className={`tab ${
								category === "saved" || !category ? "active" : ""
							}`}
							onClick={() => {
								setData(null);
								router.push("?category=saved");
							}}
						>
							Saved
						</button>
						<button
							className={`tab ${category === "bid" ? "active" : ""}`}
							onClick={() => {
								setData(null);
								router.push("?category=bid");
							}}
						>
							Bids
						</button>
					</div>

					<div className="panels flex_2">
						{/*==========
             JOB AVAILABLE
            =========== */}
						{category === "saved" || !category ? (
							<div className="panel">
								<AvailableJobs data={data} />
							</div>
						) : (category === "active" || category === "bid") &&
						  data?.results ? (
							<div className="panel">
								<ActiveJobs data={data} />
							</div>
						) : (
							""
						)}

						{/*==========
           APPLIED JOBS
            =========== */}
					</div>
				</div>
			</div>
		</>
	);
};

export default JobTabs;
