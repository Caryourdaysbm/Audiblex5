import React from "react";
import Images from "../assets/images/image";

const Group = () => {
	return (
		<section className="about_page">
			<div className="about_us container">
				<h3 className="Majorheading">About Us</h3>
				<img src={Images.Group} alt="Group Picture" className="group_pic" />

				<div className="about_desc mt-6">
					<div className="ps">
						<p>
							<span>Instasew</span> is an end-to-end Measurement software
							company with offices around the world. Our team of experienced
							software engineers provides solutions that automate processes,
							improve productivity, provide real-time insights and contribute to
							bottom line results.
						</p>
						<p>
							Whether you are an individual with new ideas or a creator with an
							established brand seeking new ways to improve business functions.
							We at Brand name pinpoint the most salient and cost-effective
							approach to help each client maximize ideas and stay within
							budget.
						</p>
					</div>

					<img src={Images.Grid} alt="Grid Pics" className="grided" />
				</div>
			</div>
		</section>
	);
};
export default Group;
