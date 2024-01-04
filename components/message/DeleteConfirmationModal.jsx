import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
import {
	reqOptions,
	fetchAPI,
	HOST_URL,
	getCookie,
} from "../../assets/js/help_func";

const DeleteConfirmationModal = (props) => {
	const [disableDelete, setDisableDelete] = useState(true);
	const [message, setMessage] = useState("");
	const [data, setData] = useState(0);
	const [status, setStatus] = useState();
	const [error, setError] = useState();
	const router = useRouter();

	useEffect(() => {
		if (data || status === 200) {
			// Redirect when item is deleted
			props.setShowDelete(false);
			if (props.redirects) {
				router.push(props.redirects);
			}
		}
	}, [data, status]);

	const handleOnchange = (e) => {
		if (props.itemTitle === e.target.value) {
			setDisableDelete(false);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		if (!disableDelete) {
			const requestOptions = reqOptions("DELETE", null, true);
			let access_url = `${HOST_URL() + props.urlPath}`;
			fetchAPI(setData, access_url, requestOptions, true, setStatus, setError);
		} else {
			setMessage("Something went wrong.");
		}
	};
	if (props.showDelete) {
		return (
			<DeleteModal
				onClick={() => props.setShowDelete(false)}
				className="bills_on_me"
			>
				<div
					onClick={(e) => {
						e.stopPropagation();
					}}
					className="modalContainer"
				>
					<form className="modal" onSubmit={handleSubmit}>
						<h4>Delete {props.itemTitle} ?</h4>

						<p className="something_bad">
							Unexpected bad things will happen if you don’t read this!
						</p>
						<p>
							This action cannot be undone. This will permanently delete the{" "}
							<strong>{props.itemTitle}</strong> repository, feedbacks,
							schedules, and remove all team associations.
							<br />
							<br />
							Please type <strong>{props.itemTitle}</strong> to confirm.
							<input type="text" onChange={handleOnchange} />
						</p>
						<div className="action_btn">
							<button type="submit" disabled={disableDelete}>
								Delete
							</button>
							<button
								type="button"
								onClick={() => props.setShowDelete(false)}
								className="cancel_btn"
							>
								Cancel
							</button>
						</div>
						{message && <p>{message}</p>}
					</form>
				</div>
			</DeleteModal>
		);
	}
};

export default DeleteConfirmationModal;

let DeleteModal = styled.div`
	.modalContainer {
		display: flex;
		justify-content: center;
		align-items: center;
		margin-top: 120px;
		// width: 100%;
		// height: 100%;
	}
	.modal {
		padding: 30px;
		background: #fff;
		box-shadow: var(
			--ds-shadow-overlay,
			0 0 0 1px rgba(9, 30, 66, 0.08),
			0 2px 1px rgba(9, 30, 66, 0.08),
			0 0 20px -6px rgba(9, 30, 66, 0.31)
		);
		.something_bad {
			margin-top: 10px;
			padding: 15px;
			background: tomato;
			color: #fff;
			border-radius: 5px;
		}
	}
	.action_btn {
		text-align: right;
		.cancel_btn {
			background: none;
			color: #42526e;
		}
		button {
			-webkit-box-align: baseline;
			align-items: baseline;
			box-sizing: border-box;
			display: inline-flex;
			font-size: inherit;
			font-style: normal;
			font-family: inherit;
			font-weight: 500;
			max-width: 100%;
			position: relative;
			text-align: center;
			white-space: nowrap;
			cursor: pointer;
			margin-left: 10px;
			height: 2.28571em;
			line-height: 2.28571em;
			vertical-align: middle;
			width: auto;
			-webkit-box-pack: center;
			justify-content: center;
			color: #fff;
			border-width: 0px;
			border-radius: 3px;
			text-decoration: none;
			transition: background 0.1s ease-out 0s,
				box-shadow 0.15s cubic-bezier(0.47, 0.03, 0.49, 1.38) 0s;
			background: var(--ds-background-danger-bold, #de350b);
			padding: 0px 10px;
		}
	}
`;
