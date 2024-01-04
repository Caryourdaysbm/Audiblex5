import React from "react";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";
import STab from "../../components/STab";
import Footer from "../../components/Footer";
import LoginRequired from "../../components/forms/LoginRequired";

const Settings = () => {
	LoginRequired();
	return (
		<>
			<PrimaryNavbar />
			<STab />
			<Footer />
		</>
	);
};

export default Settings;
