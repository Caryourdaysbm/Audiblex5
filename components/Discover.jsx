import React from "react";
import Link from "next/link";
import Images from "../assets/images/image";

const Discover = () => {
	return (
		<>
			<section className="container" id="discover_container">
				<div className=" discover">
					<h2>Discover the unique Features of The brand name.</h2>
					<p>
						Welcome to the future of fashion – a platform designed to
						revolutionize the way you create and wear clothes. Our SaaS product
						is the ultimate solution for both fashion enthusiasts and industry
						professionals, offering a comprehensive suite of tools to streamline
						the fashion design process from start to finish.
					</p>
					<Link href="/accounts/signup">
						<button className="btn_only">Become a Creator</button>
					</Link>
				</div>

				{/* Add Customer Service */}
				<div className="support">
					<div className="p_support">
						<img src={Images.custom} alt="measure" />
						<h3>Custom Measurement</h3>
						<p>
							As a general user, you can create your profile, save your
							measurements, and styles for easy access anytime, anywhere. You
							can also share your measurements and styles with others, making it
							easier for tailors and creators to understand your needs. Our
							platform is designed to connect you with the best tailors and
							creators, so you can find the perfect match for your fashion
							needs. Whether you're looking for a custom-made outfit or a unique
							piece of jewelry, our platform has you covered.
						</p>
					</div>
					<div className="p_support efcc">
						<img src={Images.support} alt="support" />
						<h3>Support 24/7</h3>
						<p>
							You can make payments easily and securely through our platform,
							and create jobs to request specific designs from tailors and
							creators. With a 3-tier subscription plan, you can choose the best
							option that fits your needs – free, premium, or platinum.
						</p>
					</div>
					<div className="p_support">
						<img src={Images.universe} alt="universe" />
						<h3>+1000 Creators Worldwide</h3>
						<p>
							For tailors and creators, our platform offers an excellent
							opportunity to showcase your talent to the world. You can create
							your profile, create your catalogue, and see the posted jobs. You
							can bid for jobs and connect directly with clients, receiving
							payments easily and securely through our platform.
						</p>
					</div>
				</div>
			</section>
		</>
	);
};
export default Discover;
