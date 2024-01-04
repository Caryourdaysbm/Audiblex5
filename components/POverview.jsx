import { useEffect, useState } from "react";
import Link from "next/link";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import {
	fetchAPI,
	reqOptions,
	HOST_URL,
	getCookie,
} from "../assets/js/help_func";

const POverview = (props) => {
	const [saved, setSaved] = useState(null);
	const [bidJobs, setBidJobs] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const [jobKey, setJobKey] = useState();

	const handleSaveJob = (methods, job_ids) => {
		// Send job ID and user ID to the server for update
		const formData = new FormData();
		formData.append("user", getCookie("u_id"));
		formData.append("saved_jobs", [job_ids]);

		let requestOptions = reqOptions(methods, formData, true);
		fetchAPI(
			setSaved,
			HOST_URL() + "/api/v1/jobs/saved_jobs/",
			requestOptions,
			true,
			setStatus,
			setError
		);
	};

	const handleBidJob = (methods, job_ids) => {
		// Send job ID and user ID to the server for update
		const formData = new FormData();
		formData.append("freelancer", getCookie("u_id"));
		formData.append("job", [job_ids]);
		setError({});

		let requestOptions = reqOptions(methods, formData, true);
		fetchAPI(
			setBidJobs,
			HOST_URL() + "/api/v1/jobs/bid_jobs/",
			requestOptions,
			true,
			setStatus,
			setError
		);
	};

	useEffect(() => {
		if (saved) {
			// When get response from the server, update the UI
			props.data.saved_job = saved.status;
			setSaved(null);
		} else if (bidJobs) {
			// When get response from the server, update the UI
			props.data.bid_job = bidJobs.status;
			setBidJobs(null);
		}
	}, [saved, bidJobs]);

	return (
		<ReactJobDescription className="container">
			<section className="project_overview">
				<h5>Project Overview</h5>
				<ReactMarkdown>{props.data.description}</ReactMarkdown>

				<div className="save_to_coll">
					<div>
						{props.data.bid_job ? (
							<button
								className="btn_only"
								onClick={() => {
									handleBidJob("DELETE", props.data.id);
								}}
							>
								Unbid
							</button>
						) : (
							<button
								className="native-btn"
								onClick={() => {
									handleBidJob("POST", props.data.id);
								}}
							>
								Bid
							</button>
						)}
						{props.data.saved_job ? (
							<button
								className="btn_delete"
								onClick={() => {
									handleSaveJob("DELETE", props.data.id);
								}}
							>
								Unsave
							</button>
						) : (
							<button
								className="btn_save"
								onClick={() => {
									handleSaveJob("POST", props.data.id);
								}}
							>
								Save
							</button>
						)}
						{error?.message ? <p>{error.message}</p> : ""}
					</div>
				</div>
			</section>
		</ReactJobDescription>
	);
};

export default POverview;

const ReactJobDescription = styled.div`
	h1 {
		font-size: 2em;
	}
	h2 {
		font-size: 1.5em;
	}
	h3 {
		font-size: 1.3em;
	}
	h4 {
		font-size: 1em;
	}
	h1,
	h2,
	h3,
	h4 {
		margin-bottom: 10px;
		margin-top: 20px;
	}
	.save_to_coll > div {
		position: relative;
		margin-top: 40px;
	}
	.btn_delete,
	.btn_save {
		color: var(--Gunmetal);
		border-width: 1px;
		border-style: solid;
		margin: 15px 0;
		border-radius: var(--r);
		display: flex;
		align-items: center;
		justify-content: center;
		transition: 0.4s ease;
		position: relative;
		text-decoration: none;
		padding: 15px 30px;
		margin-right: auto;
		margin-left: auto;
		border-color: #f4f4f4;
	}
	.btn_save {
		border-color: #f4f4f4;
		background: #f4f4f4;
	}
	.native-btn {
		width: 141px;
		margin: 15px 9px;
	}
`;
