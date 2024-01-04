import React from "react";
// import Contact from "../components/ContactUs";
import CreateRequest from "../../components/CreateRequest";
import Footer from "../../components/Footer";
import LoginRequired from "../../components/forms/LoginRequired";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";

const CreateJob = () => {
	LoginRequired();
	return (
		<div>
			<PrimaryNavbar />
			<CreateRequest />
			<Footer />
		</div>
	);
};
export default CreateJob;
