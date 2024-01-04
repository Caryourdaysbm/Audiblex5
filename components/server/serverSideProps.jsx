import { reqOptions, HOST_URL } from "../../assets/js/help_func";

/* This componennt perform request on the server.
	
	1. To call: It should be below the specified component.

	export const getServerSideProps = async (context) => {
		const { params, req, res, query } = context;
		const { dashboard_user_id } = params;

		return await serverSideProps("GET", "/api/v1/blogs/details/", slug);
	};

	2. The you can destructure the component to get the following:
	{ data, status, error }
	
*/

export async function serverSideProps(method, uri) {
	const objects = {};
	const requestOptions = reqOptions(method, null);

	const response = await fetch(HOST_URL() + uri, requestOptions)
		.then((res) => {
			objects["status"] = res.status;

			// Return json if return success
			if (res.ok) {
				objects["data"] = res.json();
				return res.json();
			} else {
				objects["error"] = { message: "res.statusText" };
			}
		})
		.catch((err) => {
			// If server didn't connect.
			if (err.cause?.code === "ECONNREFUSED") {
				objects["status"] = 500;
				return { message: "Server couldn't process your request." };
			} else {
				console.log("err:::>>>>", err);
				objects["error"] = { message: err };
				return objects;
			}
		});

	// objects["data"] = await response;

	return {
		props: objects,
	};
}
