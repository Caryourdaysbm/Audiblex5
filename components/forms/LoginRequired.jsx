import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
	getCookie,
	fetchAPI,
	HOST_URL,
	setCookie,
	reqOptions,
} from "../../assets/js/help_func";

/*
    Calling Component
    1. import { LoginRequired } from '../components/forms/LoginRequired';
    2. LoginRequired()
*/

const LoginRequired = () => {
	const router = useRouter();
	const [data, setData] = useState(0);
	const [status, setStatus] = useState();
	const [error, setError] = useState(0);

	useEffect(() => {
		if (
			status === 401 ||
			!getCookie("access") 
		)
		/* if (
			status === 401 ||
			!getCookie("access") ||
			(getCookie("access") &&
				!getCookie("access").includes("eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9"))
		) */ {
			//alert(data["token"].access)
			//set access token
			
			// Redirect to login page
			let redirect_url = `/accounts/login/?next=${
				window.location.pathname + window.location.search
			}`;
			router.push(redirect_url);
		}
		// If access token exist, verify from server if access and ID is valid.
	/*	else if (!data && !error) {
alert(getCookie("u_id"))
			setCookie("access", data.token);
			setCookie("u_id", data.user);
			
			fetchAPI(
				setData,
				`${HOST_URL()}/api/v1/users/auth/verify_token/?access_token=${getCookie(
					"access"
				)}&user_id=${getCookie("u_id")}`,
				reqOptions("GET"),
				true,
				setStatus,
				setError
			);
		}*/
	}, [data, error, status]);

	return data;
};

export default LoginRequired;
