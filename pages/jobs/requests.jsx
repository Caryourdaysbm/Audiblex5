import React from "react";
import Footer from "../../components/Footer";
import ManageRequest from "../../components/ManagePeople";
import ClientNav from "../../components/navbar/PrimaryNavbar";
import LoginRequired from "../../components/forms/LoginRequired";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";

const PostedJobsList = () => {
	LoginRequired;
	return (
		<>
			<PrimaryNavbar />
			<ManageRequest />
			<Footer />
		</>
	);
};

export default PostedJobsList;
