// URI: http://localhost:3000/accounts/2c9a996e-6893-4f9c-887f-3b1315c07d8d/catalogues

import { React, useEffect, useState } from "react";
import Footer from "../../../components/Footer";
import Catalogue from "../../../components/catalogues/Catalogue";
import ProfileInfo from "../../../components/ProfileInfo";
import PrimaryNavbar from "../../../components/navbar/PrimaryNavbar";

import Error404 from "../../404";
import { HOST_URL, reqOptions } from "../../../assets/js/help_func";

const Catalogues = (props) => {
	const [catalogues, setCatalogues] = useState(props.data);

	if (props.status !== 404) {
		return (
			<div className=" mt-5">
				<PrimaryNavbar />
                <div className="mt-3"></div>
				<Catalogue
					catalogues={catalogues}
					setCatalogues={setCatalogues}
					username={props.username}
				/>
				<Footer />
			</div>
		);
	} else {
		return <Error404 />;
	}
};
export default Catalogues;

export async function getServerSideProps(context) {
	const { params, req, res, query } = context;
	const { username, slug } = params;

	const objects = { username: username };

	let requestOptions = reqOptions("GET", null);
	const response = await fetch(
		HOST_URL() + `/api/v1/catalogues/${username}`,
		requestOptions
	).then((res) => {
		objects["status"] = res.status;
		if (res.ok) return res.json();
		else return { message: "No record" };
	}); 

	objects["data"] = await response;

	return {
		props: objects,
	};
}
