import React, { useState, useEffect } from "react";
import Images from "../../assets/images/image";
import DummyData from "../../assets/json/examples.json";
import AddCatalogueItem from "./AddCatalogueItem";
import {
	fetchAPI,
	getCookie,
	reqOptions,
	HOST_URL,
} from "../../assets/js/help_func";
import styled from "styled-components";
import Image from "next/image";
import CatalogueModal from "./CatalogueModal";

const Gallery = (props) => {
	const [data, setData] = useState(props.items?.catalogue_items);
	const [uploads, setUploads] = useState(null);
	const [uploadForm, setUploadForm] = useState(false);
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const [showModal, setShowModal] = useState(false);
	const [selectedImageIndex, setSelectedImageIndex] = useState(null);
	const [deleteItem, setDeleteItem] = useState();
	// const [deleteIndex, setDeleteIndex] = useState();

	const handleImageClick = (index) => {
		setSelectedImageIndex(index);
		setShowModal(true);
	};

	const handleCloseModal = () => {
		setShowModal(false);
		setSelectedImageIndex(null);
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		let requestOptions = reqOptions("post", new FormData(e.target), true);
		fetchAPI(
			setUploads,
			`${HOST_URL()}/api/v1/catalogues/catalogue_items/${props.items.id}/`,
			requestOptions,
			true,
			setStatus,
			setError
		);
	};
	const handleDeleteUI = (indexToDelete) => {
		const newItems = data.filter((item, index) => index !== indexToDelete);
		setData(newItems);
	};

	const handleDelete = (cat_item_id, index) => {
		const shouldDelete = window.confirm("Are you sure you want to delete?");
		if (!shouldDelete) {
			return;
		}
		const formData = new FormData();
		let requestOptions = reqOptions("DELETE", formData, true);
		fetchAPI(
			setDeleteItem,
			`${HOST_URL()}/api/v1/catalogues/catalogue/item/${cat_item_id}/`,
			requestOptions,
			true
		);
		handleDeleteUI(index);
	};

	useEffect(() => {
		if (status === 201 && uploads) {
			data.unshift(uploads);
			setUploads(null);
			setStatus(0);
			setUploadForm(false);
		}
	}, [status, uploadForm]);

	return (
		<ReactCatalogItems className="container">
			<button
				className="btn_only upload_image"
				onClick={() => setUploadForm(true)}
			>
				Upload Image
			</button>
			<div className="card_flex" id="gallery_cells">
				{data.length ? (
					data.map((option, index) => {
						return (
							<div className="each_card" key={index}>
								<div className="per_photo">
									<img
										src={option.image}
										alt={option.name}
										onClick={() => handleImageClick(index)}
									/>
									<div className="meta">
										<p className="name">{option.name +" | $" +option.price}</p>
										<Image
											className="delete"
											src={Images.delete}
											width={24}
											height={24}
											onClick={() => handleDelete(option.id, index)}
										/>
									</div>
								</div>
							</div>
						);
					})
				) : (
					<p>No item...</p>
				)}

				{/* Upload new item */}
				{uploadForm && (
					<AddCatalogueItem
						handleSubmit={handleSubmit}
						status={status}
						error={error}
						setUploadForm={setUploadForm}
						user={props.items.user}
					/>
				)}

				{/* Image carousel */}
				<CatalogueModal
					showModal={showModal}
					setSelectedImageIndex={setSelectedImageIndex}
					selectedImageIndex={selectedImageIndex}
					images={data}
					handleCloseModal={handleCloseModal}
					username={props.username}
				/>
			</div>
		</ReactCatalogItems>
	);
};
export default Gallery;

const ReactCatalogItems = styled.section`
	.upload_image {
		display: inline-block;
	}
	#add_to_collection {
		position: relative;
		z-index: 100;
		img {
			position: absolute !important;
			top: 0px;
			right: -259px;
		}
	}
	.per_photo {
		position: relative;
		.meta {
			display: flex;
			justify-content: space-between;
			padding: 10px;
			backdrop-filter: blur(50px);
			background: var(--Glass);
			box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.05),
				0px 2px 8px rgba(0, 0, 0, 0.05);
			width: 100%;
			bottom: 0px;
			position: absolute;
			.name {
				color: var(--white);
			}
			.delete {
				width: 24px;
				height: 24px;
				margin-top: 10px;
			}
		}
	}
`;
