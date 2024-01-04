import Link from "next/link";
import Images from "../../assets/images/image";
import Image from "next/image";
import {
	fetchAPI,
	getCookie,
	reqOptions,
	HOST_URL,
} from "../../assets/js/help_func";
import DeleteConfirmationModal from "../message/DeleteConfirmationModal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";

const BidedFreelancers = (props) => {
	const router = useRouter();
	const { job_id } = router.query;

	const [items, setItems] = useState(props.data);
	const [showDelete, setShowDelete] = useState();
	const [update, setUpdate] = useState();
	const [status, setStatus] = useState();
	const [error, setError] = useState();
	const [objKey, setObjKey] = useState();
	const [bided, setBided] = useState(false);

	const dateOptions = {
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	const handleDelete = (indexToDelete, option) => {
		const newItems = items.filter((item, index) => index !== indexToDelete);
		setShowDelete(option);
		setItems(newItems);
	};

	const handleAcceptBider = (bider, key) => {
		// Send project ID and project_stage to db.

		const shouldDelete = window.confirm(
			`Are you sure you want to accept ${bider.profile.username}?`
		);
		if (!shouldDelete) {
			return;
		}

		setObjKey(key); // used the state to update items
		const requestOptions = reqOptions("PUT", null, true);
		let access_url = `${HOST_URL()}/api/v1/jobs/bid_jobs/accept/${
			bider.id
		}/accept/`;
		fetchAPI(setUpdate, access_url, requestOptions, true, setStatus, setError);
	};

	if (items?.bidders && !bided) {
		// Check if there has been any accepted bidder
		// Disable app accept btn
		items?.bidders.filter((bd, index) => bd.accepted && setBided(true));
	}

	useEffect(() => {
		if (update) {
			// Filter with index and replace project_stage
			const newItems = items.bidders.filter((item, index) => {
				if (index === objKey) {
					item["accepted"] = update.accepted;
					return item;
				}
			});
			// setItems(newItems);
			setUpdate();
		}
	}, [update]);
	if (items?.owner) {
		return (
			<ReactManageTable className="container">
				{showDelete ? (
					<DeleteConfirmationModal
						itemTitle={showDelete?.name}
						showDelete={showDelete}
						setShowDelete={setShowDelete}
						urlPath={`/api/v1/jobs/${showDelete?.id}/`}
						redirects={`/accounts/jobs/`}
					/>
				) : (
					<div className="overflow-table">
						<table className="">
							<caption>
								<h3>Job Bidders: </h3>
								<p>You can only accept one bidder for the job.</p>
							</caption>
							<thead>
								<tr>
									<th>Name</th>
									<th>Description</th>
									<th>Date</th>
									<th>Accepted</th>
									<th>Action</th>
								</tr>
							</thead>

							<tbody>
								{items?.bidders.map((option, index) => {
									return (
										<tr className="track_data" key={index}>
											<td className="row_title">
												<Link
													href={"/" + option.profile.username}
													target="_blank"
													rel="noopener noreferrer"
												>
													{option.freelancer.first_name}{" "}
													{option.freelancer.last_name}
												</Link>
											</td>
											<td className="row_desc">
												{option.profile.description?.slice(0, 100)}...
											</td>
											<td className="row_date">
												{new Date(option.timestamp).toLocaleString(
													"en-US",
													dateOptions
												)}
											</td>
											<td>{option.accepted ? "Accepted" : "Pending"}</td>

											{/* <td>
												{option.budget.toLocaleString("en", {
													style: "currency",
													currency: "USD",
												})}
											</td>
											<td>{option.accepted_job_invites_count}</td>

											 */}

											<td>
												<div className="delete_pause">
													<button
														className="native-btn"
														onClick={() => handleAcceptBider(option, index)}
														disabled={bided}
													>
														Accept
													</button>
												</div>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
						{error?.message ? <p>{error?.message}</p> : ""}
					</div>
				)}
			</ReactManageTable>
		);
	}
};

export default BidedFreelancers;

const ReactManageTable = styled.div`
	margin-bottom: 80px;
	.row_title {
		min-width: 250px;
		a {
			text-decoration: none !important;
			font-weight: 600;
		}
	}
	.row_date {
		min-width: 150px;
	}
	.row_desc {
		min-width: 400px;
	}
	caption {
		text-align: left;
		margin-bottom: 20px;
		font-size: 1.2em;
		h3 {
			margin-bottom: 10px;
		}
	}
`;
