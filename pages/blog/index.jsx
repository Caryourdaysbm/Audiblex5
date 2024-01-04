import { React, useEffect, useState } from "react";
import {
	fetchAPI,
	spinBtn,
	handleError,
	setCookie,
	HOST_URL,
	reqOptions,
} from "../../assets/js/help_func";
import Footer from "../../components/Footer";
import BlogHead from "../../components/BlogHead";
import EachBlogList from "../../components/blog/EachBlogList";
import Error500 from "../500";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";
// import Newsletter from "../components/Newsletter";

const Blog = ({ data, status, error }) => {
	useState(() => {}, [status]);

	if (status == 500) {
		return <Error500 />;
	} else if (data && status === 200) {
		return (
			<div>
				<PrimaryNavbar />
				<BlogHead data={data["results"]} />
				<section className="container card_on_blog">
					<h3 className="blog_head mt-5">Recommended</h3>
					<div className="card_flex blog_list_wrapper">
						<EachBlogList data={data} />
					</div>
				</section>
				<Footer />
			</div>
		);
	}
};
export default Blog;

export async function getServerSideProps(context) {
	const { params, req, res, query } = context;
	// const { company, slug } = params

	const objects = {};

	let requestOptions = reqOptions("GET", null);
	const response = await fetch(HOST_URL() + `/api/v1/blogs/`, requestOptions)
		.then((res) => {
			objects["status"] = res.status;
			return res.json();
		})
		.catch((err) => {
			// If server didn't connect.
			if (err.cause.code === "ECONNREFUSED") {
				objects["status"] = 500;
				return { message: "Server couldn't process your request." };
			} else {
				objects["error"] = err.error;
			}
		});

	objects["data"] = await response;
	// console.log(objects);

	return {
		props: objects,
	};
}
