// Displays single image with next next and previous button

import Image from "next/image";
import Link from "next/link";
import React from "react";
import styled from "styled-components";
import { getCookie } from "../../assets/js/help_func";

export default function CatalogueModal({
	showModal,
	setSelectedImageIndex,
	selectedImageIndex,
	images,
	handleCloseModal,
	user,
	username,
}) {
	return (
		<ReactCatalogueModal>
			{showModal && (
				<div className="modal-overlay">
					<div className="modal">
						<div className="modal-header">
							<h2>
								{images[selectedImageIndex]?.price ? (
									<Link href="#">
										{images[selectedImageIndex]?.price.toLocaleString("en", {
											style: "currency",
											currency: "USD",
										})}
										<span>Order</span>
									</Link>
								) : (
									""
								)}
								{username !== getCookie("username") ? (
									<Link
										href={`/${username}/messages/${images[selectedImageIndex]?.freelancer}`}
										className="chat_link"
									>
										<span class="material-symbols-outlined">chat</span>
										<span className="icon_text">Chat</span>
									</Link>
								) : (
									""
								)}
							</h2>
							<button onClick={handleCloseModal}>Close</button>
						</div>
						<div className="modal-body">
							<Image
								src={images[selectedImageIndex]?.image}
								alt={images[selectedImageIndex]?.name}
								width={800}
								height={600}
							/>
						</div>
						<div className="title">
							<h3>{images[selectedImageIndex]?.name}</h3>
						</div>
						<div className="modal-footer">
							{selectedImageIndex > 0 && (
								<button
									onClick={() => setSelectedImageIndex(selectedImageIndex - 1)}
								>
									Previous
								</button>
							)}
							{selectedImageIndex < images.length - 1 && (
								<button
									onClick={() => setSelectedImageIndex(selectedImageIndex + 1)}
								>
									Next
								</button>
							)}
						</div>
					</div>
				</div>
			)}
		</ReactCatalogueModal>
	);
}

const ReactCatalogueModal = styled.div`
	.modal-overlay {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: rgba(0, 0, 0, 0.5);
		z-index: 100;
	}

	.modal {
		position: fixed;
		top: 46%;
		left: 50%;
		transform: translate(-50%, -50%);
		height: 600px;
		width: 90%;
		max-width: 1000px;
		background: white;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		z-index: 101;
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		max-width: 90%;
		margin: 0px auto;
		padding: 1rem;
		h2 {
			font-size: 1.3em;
			margin-top: 30px;
			margin-bottom: 0px;
		}
		span {
			margin-left: 10px;
		}
	}

	.modal-body {
		text-align: center;
		img {
			max-width: 90%;
			max-height: 320px;
		}
	}
	.title {
		padding: 0px 1rem;
		text-align: center;
		h3 {
			font-size: 1.2em;
			margin-top: 0px;
			line-height: 120%;
		}
	}

	.modal-footer {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
	}
	.chat_link {
		display: ;
	}
`;
