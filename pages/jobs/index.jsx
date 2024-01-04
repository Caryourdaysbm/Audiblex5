// URI: http://localhost:3000/accounts/2c9a996e-6893-4f9c-887f-3b1315c07d8d/find-jobs
import FJBAnner from "../../components/FJBanner";
import Footer from "../../components/Footer";
import JobCategories from "../../components/JobCategories";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";

const FindJobs = () => {
	return (
		<>
			<PrimaryNavbar />
			<FJBAnner />
			<JobCategories />
			<Footer />
		</>
	);
};

export default FindJobs;
