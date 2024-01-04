import React from "react";
import ReactMarkdown from "react-markdown";
import Categories from "./catalogues/Categories";
import Image from "next/image";

// Note: Component for Blog Details Page
// 1. Dynamically change details of each blog respectively
const BlogBanner = (props) => {
	if (props.data.title) {
		let author =
			props.data.user_profile["user"].first_name +
			" " +
			props.data.user_profile["user"].last_name;

		return (
			<section>
				<div
					className="b-image blog_details_bg"
					style={{ backgroundImage: `url(${props.data.image})` }}
				></div>

				<div className="container">
					<div className="blog_title">
						<div className="blog_author">
							<div className="author">
								{props.data.user_profile["user"].profile_image && (
									<Image
										src={props.data.user_profile["user"].profile_image}
										alt={props.data.title}
										width={50}
										height={50}
									/>
								)}
								<span>
									by <a href="">{author}</a>
								</span>
							</div>
							<h5 className="posted_date">{props.data.date_published}</h5>
						</div>
						<h1>{props.data.title}</h1>
						<div className="span_tags categories">
							{/* {props.data.blog_categorys.forEach((cat)=>{
              document.querySelector('categories').append(
                document.createElement('span').classList.add('label_tags').textContent = cat.name
              )
            })} */}
							<Categories categories={props.data.blog_categorys} />

							<span className="label_tags">Creative</span>
							<span className="label_tags">Business</span>
						</div>
						<div className="blog_details mt-5">
							<ReactMarkdown>{props.data.description}</ReactMarkdown>
						</div>
						<div className="next_post">
							<div className="press_next">
								<div>
									<span>Next</span>
									<h4>Pellentesque molestie facilisi.</h4>
								</div>
								<button className="btn_only">N</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		);
	} else {
		return <></>;
	}
};

export default BlogBanner;
