import { useRouter } from "next/router";
import { useEffect } from "react";

const Logout = () => {
	const router = useRouter();

	useEffect(() => {
		const handleLogout = () => {
			// clear user cookies
			document.cookie.split(";").forEach((c) => {
				document.cookie = c
					.replace(/^ +/, "")
					.replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
			});

			// clear local storage
			localStorage.clear();

			// redirect to login page
			router.push("/accounts/login");
		};

		handleLogout();
	});

	return <button>Logout</button>;
};

export default Logout;
