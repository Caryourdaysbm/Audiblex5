import { HOST_URL, reqOptions } from "../../assets/js/help_func";
import BlogBanner from "../../components/BlogBanner";
import BlogComments from "../../components/BlogComments";
import Footer from "../../components/Footer";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";
import SeoHeader from "../../components/navbar/SeoHeader";
import Error404 from "../404";
import Error500 from "../500";

const Home = ({ data, status, error }) => {
	if (status === 200) {
		return (
			<div>
				<SeoHeader />
				<PrimaryNavbar />
				<BlogBanner data={data} />
				<BlogComments />
				<Footer />
			</div>
		);
	} else if (status === 404) {
		return <Error404 />;
	} else if (status === 500) {
		return <Error500 />;
	}
};
export default Home;

export async function getServerSideProps(context) {
	const { params, req, res, query } = context;
	const { slug } = params;

	const objects = {};
	const requestOptions = reqOptions("GET", null);
	const endpoint = `/api/v1/blogs/details/${slug}/`;

	const response = await fetch(HOST_URL() + endpoint, requestOptions)
		.then((res) => {
			objects["status"] = res.status;

			// Return json if return success
			if (res.ok) {
				return res.json();
			} else {
				objects["error"] = res;
			}
		})
		.catch((err) => {
			// If server didn't connect.
			if (err.cause.code === "ECONNREFUSED") {
				objects["status"] = 500;
				return { message: "Server couldn't process your request." };
			} else {
				objects["error"] = err;
			}
		});

	objects["data"] = await response;

	return {
		props: objects,
	};
}
