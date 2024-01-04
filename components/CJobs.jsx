import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import styled from "styled-components";

import {
	fetchAPI,
	reqOptions,
	HOST_URL,
	getCookie,
} from "../assets/js/help_func";
import { useEffect, useState } from "react";

const CJobs = (props) => {
	const [saved, setSaved] = useState(null);
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

	useEffect(() => {
		if (saved) {
			// When get response from the server, update the UI
			props.data.results.filter((item, index) => {
				// Changed the changed job status to true or false
				if (index === jobKey) {
					item.saved_job = saved.status;
				}
			});
			setJobKey();
			setSaved(null);
		}
	}, [saved]);

	return (
		<JobLists>
			{props.data.results.map((option, index) => {
				return (
					<div className="job_app" id="job_press" key={index}>
						<div className="mini_flex_for_save">
							<h2>
								<Link href={"/jobs/" + option.id}>{option.name}</Link>
							</h2>

							{/* <img src={Images.OptionDots} alt="" /> */}
						</div>
						<p>
							{option.description.slice(0, 50) +
								(option.description.length > 50 ? "..." : "")}
						</p>
						<p className="posted_by">
							by{" "}
							<span>{`${option.customer.first_name} ${option.customer.last_name}`}</span>
						</p>

						<div className="category_by">
							{option.categorys.map((cat, index) => {
								return <span key={index}>{cat.name}</span>;
							})}
						</div>

						<div className="location_applicant">
							<p className="locate_with">{option.location}</p>
							<p className="applicants">
								{option.accepted_job_invites_count
									? option.accepted_job_invites_count + " Applicants"
									: "Be the first to apply"}
							</p>
						</div>

						<div className="save_to_coll">
							<ReactTimeAgo date={option.timestamp} className="time_stamp" />
							<div>
								{option.saved_job ? (
									<button
										className="btn_delete"
										onClick={() => {
											handleSaveJob("DELETE", option.id);
											setJobKey(index);
										}}
									>
										Unsave
									</button>
								) : (
									<button
										className="btn_save"
										onClick={() => {
											handleSaveJob("POST", option.id);
											setJobKey(index);
										}}
									>
										Save
									</button>
								)}
								<Link href={"/jobs/" + option.id}>
									<button
										className={option.bid_job ? "btn_delete" : "native-btn"}
									>
										{option.bid_job ? "Bided" : "Bid"}
									</button>
								</Link>
							</div>
						</div>
					</div>
				);
			})}
		</JobLists>
	);
};

export default CJobs;

const JobLists = styled.div`
	width: 70%;
	.job_app {
		width: 100%;
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
`;
