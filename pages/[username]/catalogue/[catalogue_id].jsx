import React, { useEffect, useState } from "react";
import CType from "../../../components/CType";
import Gallery from "../../../components/catalogues/Gallery";
import Footer from "../../../components/Footer";
import PrimaryNavbar from "../../../components/navbar/PrimaryNavbar";
import {
	fetchAPI,
	getCookie,
	reqOptions,
	HOST_URL,
} from "../../../assets/js/help_func";
import Error404 from "../../404";
import Error500 from "../../500";

const CatalogueItems = ({ data, status, error, slug, username }) => {
	if (status === 200) {
		return (
			<div>
				<PrimaryNavbar />
				<CType items={data} />
				<Gallery items={data} slug={slug} username={username} />
				<Footer />
			</div>
		);
	} else if (status === 404) {
		return <Error404 />;
	} else if (status === 500) {
		return <Error500 />;
	}
};
export default CatalogueItems;

export async function getServerSideProps(context) {
	const { params, req, res, query } = context;
	const { username, catalogue_id } = params;

	const objects = { slug: catalogue_id, username: username };

	const requestOptions = reqOptions("GET", null);
	const endpoint = `/api/v1/catalogues/details/${catalogue_id}/`;

	const response = await fetch(HOST_URL() + endpoint, requestOptions)
		.then((res) => {
			objects["status"] = res.status;

			// Return json if return success
			if (res.ok) {
				return res.json();
			}
			if (objects.status === 401) {
				return { message: "You do not have permission to content." };
			}
		})
		.catch((err) => {
			// If server didn't connect.
			if (err.cause.code === "ECONNREFUSED") {
				objects["status"] = 500;
				return { message: "Server couldn't process your request." };
			} else {
				if (objects.status === 401) {
					return { message: "You do not have permission to content." };
				} else {
					console.log(":::404");
					// objects["error"] = err;
				}
			}
		});

	const resData = await response;
	if (resData) {
		objects["data"] = await response;
	} else {
		objects["data"] = {};
	}

	return {
		props: objects,
	};
}
