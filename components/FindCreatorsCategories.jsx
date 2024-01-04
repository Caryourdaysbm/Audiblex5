import { useState, useEffect } from "react";
import Accordion from "./Accordion";
import CreatorsJob from "./CreatorsJob";
import {
	fetchAPI,
	getCookie,
	reqOptions,
	HOST_URL,
} from "../assets/js/help_func";

const FindCreatorsCategories = () => {
	const [data, setData] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();

	useEffect(() => {
		if (data === null) {
			const requestOptions = reqOptions("GET", null, true);
			let access_url = `${HOST_URL()}/api/v1/users/freelancers/`;
			fetchAPI(setData, access_url, requestOptions, true);
		}
	}, [status]);
	return (
		<div className="container workpress">
			<Accordion />
			<CreatorsJob data={data} />
		</div>
	);
};

export default FindCreatorsCategories;
