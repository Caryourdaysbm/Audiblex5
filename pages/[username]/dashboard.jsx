// URI: /accounts/2c9a996e-6893-4f9c-887f-3b1315c07d8d/
import React from "react";
import Footer from "../../components/Footer";
import Stats from "../../components/StatBag";
import DashbordBanner from "../../components/DashboardBanner";
import CreateJButton from "../../components/jobs/CreateJ";
import DashboardAds from "../../components/DashboardAds";
import ClientNav from "../../components/navbar/PrimaryNavbar";
import LoginRequired from "../../components/forms/LoginRequired";
import { serverSideProps } from "../../components/server/serverSideProps";
import Error404 from "../404";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";
import { HOST_URL } from "../../assets/js/help_func";

// Note: This component works for both CLient and Creators
// 1. Client can Create Job while Creators can not
// 2. You can remove the CREATE JOB Component for Creators later
// 3. You can locate the Client Dashboard under Views/Clients.

const Dashboard = ({ data, status, error }) => {
	LoginRequired();

	if (status === 404) {
		return <Error404 />;
	} else {
		return (
			<div>
				<PrimaryNavbar />
				<DashbordBanner />
				<CreateJButton />
				<Stats data={data} />
				<DashboardAds />
				<Footer />
			</div>
		);
	}
};
export default Dashboard;

export const getServerSideProps = async (context) => {
	const { params, req, query } = context;
	const { username } = params;
	const res = await fetch(HOST_URL()+`/api/v1/users/profile_stats/` + username + `/`)
	const data = await res.json()
	if(!data){
		return {
			notFound: true
		}
	}	
	return {props: {data}}
	/* return await serverSideProps(
		"GET",
		"/api/v1/users/profile_stats/" + username + "/"
	); 
	*/
};
