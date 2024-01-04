import { useState, useEffect } from "react";
import Images from "../assets/images/image";
import {
	getCookie,
	fetchAPI,
	reqOptions,
	HOST_URL, 
} from "../assets/js/help_func";

const StatBag = (props) => {
	const [data, setData] = useState();
 
	useEffect(() => {
		const requestOptions = reqOptions("GET", null, true);
		let access_url = `${HOST_URL()}/api/v1/virtual_wallets/wallet/`;
		fetchAPI(setData, access_url, requestOptions, true);
	}, []);

	return (
		<section className="container statbags">
			<div className="stat_bag">
				<div className="bank_log">
					<img src={Images.PostsSvg} alt="Post" />
					<p>{data?.catalogue}</p>
				</div>
				<h3>Total Post</h3>
			</div>
			<div className="stat_bag">
				<div className="bank_log">
					<img src={Images.JobSvg} alt="Post" />
					<p>{data?.active_jobs}</p>
				</div>
				<h3>Active Projects</h3>
			</div>
			<div className="stat_bag">
				<div className="bank_log">
					<img src={Images.pending} alt="Post" />
					<p>
						{Number(data?.balance).toLocaleString("en", {
							style: "currency",
							currency: "USD",
						})}
					</p>
				</div>
				<h3>Earning</h3>
			</div>
		</section>
	);
};
export default StatBag;
