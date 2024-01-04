import { React, useEffect, useState } from "react";
import Images from "../assets/images/image";
import ProfileOnlineOffline from "./ProfileOnlineOffline";
import {
	fetchAPI,
	reqOptions,
	HOST_URL,
	getCookie,
} from "../assets/js/help_func";
import ReactTimeAgo from "react-time-ago";
import Image from "next/image";
import Link from "next/link";

const ProfileInfo = (props) => {
	const [data, setData] = useState(null);
	const [error, setError] = useState();
	const [status, setStatus] = useState();
	const [username, setUsername] = useState();

	useEffect(() => {
		if (!data) {
			const requestOptions = reqOptions("GET", null);
			let access_url = `${HOST_URL()}/api/v1/users/details/${props.username}/`;
			fetchAPI(setData, access_url, requestOptions, true);
		}

		setUsername(getCookie("username"));
	}, [data]);

	if (data && data.username) {
		return (
			<section className="container">
				<div className="p_info">
					{data.thumbnail ? (
						<Image
							src={data.thumbnail}
							alt={`${data.user.first_name} ${data.user.last_name}`}
							width={96}
							height={96}
						/>
					) : (
						<div></div>
					)}
					<div className="f_info">
						<div className="p_name">
							<h3>{`${data.user.first_name} ${data.user.last_name}`}</h3>
							<ProfileOnlineOffline online={props.online} />
						</div>
						<p>
							{data.description
								? data.description
								: "I love finding new opportunities for growth by improving, increasing motivation, reducing friction, and creating new triggers for engagement. I've worked on growth in both product and marketing."}
						</p>

						<div className="p_location">
							{data.city && data.country ? (
								<p className="am_in">{`${data.city} - ${data.country}`}</p>
							) : (
								""
							)}
							<p>
								{data.timestamp ? (
									<span>
										Member since <ReactTimeAgo date={data.timestamp} />
									</span>
								) : (
									""
								)}
							</p>
						</div>

						{props.username === username ? (
							<Link href="/accounts/settings">
								<button className="btn_only edit_p">Edit Profile</button>
							</Link>
						) : (
							<div className="edit_p">
								<div className="socials">
									<a href="https://www.linkedin.com/in/makinde-sodiq-926824216/">
										<img src={Images.G_ig} alt="" />
									</a>
									<a href="">
										<img src={Images.G_fb} alt="" />
									</a>
									<a href="">
										<img src={Images.G_world} alt="" />
									</a>
								</div>
							</div>
						)}
						{data?.username !== getCookie("username") ? (
							<Link
								href={`/${username}/messages/${getCookie("username")}/${
									data?.username
								}`}
							>
								<span class="material-symbols-outlined">chat</span>
								<span className="icon_text">Chat</span>
							</Link>
						) : (
							""
						)}
					</div>
				</div>
			</section>
		);
	}
};
export default ProfileInfo;
