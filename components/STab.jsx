import React, { useState } from "react";
import SAccount from "./accounts/AccountSettings";
import SSecurity from "./SSecurity";
import SNotification from "./SNotification";
import { useRouter } from "next/router";
import { getCookie } from "../assets/js/help_func";
// import AppliedJobs from "./AppliedJobs";

const Settings = () => {
	const router = useRouter();
	const { type } = router.query;

	const [username, setUsername] = useState(getCookie("username"));
	const [activeIndex, setActiveIndex] = useState(1);
	const handleClick = (index) => setActiveIndex(index);
	const checkActive = (index, className) =>
		activeIndex === index ? className : "";
	return (
		<>
			<div className="container job_tab">
				<div className="mt-10 tab_flex">
					<div className="tabs flex_1 dummy_height" id="settings">
						<button
							className={`tab ${type === "ACCOUNT" || !type ? "active" : ""}`}
							onClick={() => router.push("?type=ACCOUNT")}
						>
							Account
						</button>
						<button
							className={`tab ${type === "SECURITY" ? "active" : ""}`}
							onClick={() => router.push("?type=SECURITY")}
						>
							Security
						</button>
						{/* <button
							className={`tab ${type === "NOTIFICATION" ? "active" : ""}`}
							onClick={() => router.push("?type=NOTIFICATION")}
						>
							Notification
						</button> */}
					</div>

					<div className="panels flex_2">
						{/*==========
             ACCOUNT SETTINGS
            =========== */}
						{type === "ACCOUNT" || !type ? (
							<div className={`panel ${checkActive(1, "active")}`}>
								<SAccount username={username} />
							</div>
						) : type === "SECURITY" ? (
							<div className={`panel ${checkActive(2, "active")}`}>
								<SSecurity />
							</div>
						) : type === "NOTIFICATION" ? (
							<div className={`panel ${checkActive(3, "active")}`}>
								<SNotification />
							</div>
						) : (
							""
						)}
					</div>
				</div>
			</div>
		</>
	);
};

export default Settings;
