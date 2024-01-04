import JobTabs from "../../components/JobTabs";
import Footer from "../../components/Footer";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";
import LoginRequired from "../../components/forms/LoginRequired";

const FindJobs = () => {
	LoginRequired();
	return (
		<>
			<PrimaryNavbar />
			<JobTabs />
			<Footer />
		</>
	);
};

export default FindJobs;
