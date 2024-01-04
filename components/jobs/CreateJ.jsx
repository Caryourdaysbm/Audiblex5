import React, { useEffect, useState } from "react";
import Link from "next/link";
import { getCookie } from "../../assets/js/help_func";

const CreateJButton = () => {
	const [userType, setUserType] = useState();
	useEffect(() => {
		setUserType(getCookie("user_type"));
	});
	if (userType === "CUSTOMER") {
		return (
			<div className="container">
				<div className="btn-position mt-3 mb-3">
					<Link href="/jobs/create-job">
						<button className="btn_only">Create Job</button>
					</Link>
				</div>
			</div>
		);
	}
};

export default CreateJButton;
