import { useEffect, useState } from "react";
import Images from "../assets/images/image";
import { getCookie } from "../assets/js/help_func";

const DashboardBanner = () => {
	const [firstName, setFirstName] = useState('');
	useEffect(() => {
		setFirstName(getCookie("first_name"));
		
	});

	return (
		<section className="container">
			<div className="db_banner">
				<span>Friday, June 21st</span>
				<h2>Hello, {firstName}!</h2>
				<p>
					Join the fashion industry's digital revolution and discover the power
					of our SaaS product. Sign up for a free trial today and experience the
					ease and convenience of creating and wearing fashion like never
					before.
				</p>

				<img src={Images.Dashboard} alt="Avatar" />
			</div>
		</section>
	);
};
export default DashboardBanner;
