import Link from "next/link";
import React from "react";

const SilverPlan = () => {
	return (
		<div>
			<div className="plans">
				<div className="plan_top">
					<h3>Recommended</h3>
					<h4>Premium</h4>
					<p>
						<span>$47</span> /Monthly
					</p>
				</div>

				<ul className="access">
					<li>Limited to 3 Collection creation</li>
					<li>Limited to 13 Collection creation</li>
					<li>Limited to 3 Collection creation</li>
					<li className="">Limited to 3 Collection creation</li>
					<li className="">Support 24/7</li>
					<li className="">Find Jobs</li>
					<li className="">Limited to 3 Collection creation</li>
					<li className="">Limited to 3 Collection creation</li>
					<Link href="/accounts/payments/?types=Premium&amount=100">
						<button className="native-btn">Choose Plan</button>
					</Link>
				</ul>
			</div>
		</div>
	);
};

export default SilverPlan;
