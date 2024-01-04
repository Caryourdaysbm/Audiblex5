import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Images from "../assets/images/image";
import Image from "next/image";

export default class Responsive extends Component {
	render() {
		const settings = {
			dots: true,
			infinite: false,
			speed: 500,
			slidesToShow: 1,
			slidesToScroll: 1,
		};
		return (
			<div className="container testimonial_class contract">
				{/* <h2>What our users say</h2> */}
				<Slider {...settings} className="testimonial_carousels">
					<div>
						<div className="per_review" id="Advert">
							<div className="ad_desc">
								<h2>Maximize your Gig’s potentials</h2>
								<p>
									Reach a larger target audience when you upgrade to our Premium
									plans.
								</p>
							</div>

							<Image src={Images.Advert} height={225.953} width={300} />
						</div>
					</div>
					<div>
						<div className="per_review" id="Advert">
							<div className="ad_desc">
								<h2>Spend more time working on projects you love,</h2>
								<p>
									Reach a larger target audience when you upgrade to our Premium
									plans.
								</p>
							</div>

							<div className="ad_image">
								<Image
									src={Images.Advert}
									alt=""
									height={225.953}
									width={300}
								/>
							</div>
						</div>
					</div>
					<div>
						<div className="per_review" id="Advert">
							<div className="ad_desc">
								<h2>
									You define the scope, timeline, and price for each project.
								</h2>
								<p>up front so clients can come to you</p>
							</div>

							<div className="ad_image">
								<Image
									src={Images.Advert}
									alt=""
									height={225.953}
									width={300}
								/>
							</div>
						</div>
					</div>
				</Slider>
			</div>
		);
	}
}
