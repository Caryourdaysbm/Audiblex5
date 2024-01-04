import React from "react";
import FJBAnner from "../../components/FJBanner";
import Footer from "../../components/Footer";
import Categories from "../../components/FindCreatorsCategories";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";

const FindJobs = () => {
	return (
		<>
			<PrimaryNavbar />
			<FJBAnner />
			<Categories />
			<Footer />
		</>
	);
};

export default FindJobs;
