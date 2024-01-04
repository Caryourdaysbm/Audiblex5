import React, { useEffect, useState } from "react";
import Images from "../assets/images/image";
import { fetchAPI, reqOptions, HOST_URL } from "../assets/js/help_func";
import ReactTimeAgo from "react-time-ago";

const Comments = (props) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();

	useEffect(() => {
		if (!data) {
			const requestOptions = reqOptions("GET", null);
			let access_url = `${HOST_URL()}/api/v1/jobs/reviews/received/${
				props.username
			}/`;
			fetchAPI(setData, access_url, requestOptions, true);
		}
	}, [data]);

	if (data?.results.length) {
		return (
			<section className="container">
				<div className="main_comment">
					<div className="buyers_comment">
						<h5>Reviews from Buyers</h5>
						{/* <select name="" id="">
							<option value="">Most Recents</option>
							<option value=""></option>
							<option value="">Most Recents</option>
						</select> */}
					</div>
					{data.results.map((option, index) => {
						return (
							<div className="p_comment" key={index}>
								<img src={Images.DummyP} alt="person1" />
								<div className="per_comment">
									<h5>{`${option.customer_profile.user.first_name} ${option.customer_profile.user.last_name}`}</h5>
									<p>{option.description}</p>
									<span>
										<ReactTimeAgo date={option.timestamp} />
									</span>
								</div>
							</div>
						);
					})}
				</div>
			</section>
		);
	}
};
export default Comments;
