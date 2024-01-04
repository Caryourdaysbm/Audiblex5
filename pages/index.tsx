import React, { useEffect } from "react";
import PrimaryNavbar from "../components/navbar/PrimaryNavbar";
import Banner from "../components/Banner";
import Partners from "../components/Partners";
import Discover from "../components/Discover";
import Footer from "../components/Footer";
import Numbers from "../components/Numbers";
import Choose from "../components/Choose";
import Newsletter from "../components/Newsletter";
import Testimonial from "../components/Testimonial";
import RadioStations from "../components/RadioStations";
import TopRadioStations from "../components/TopRadioStations";

const Home = () => {

	
	
	return (
		<div>
			<PrimaryNavbar />
			<Banner />
			<Testimonial />
			<RadioStations />
			
			<Newsletter />
			<TopRadioStations />
			<Footer />
			{/* <Numbers /> */}
			{/* <Partners /> */}
			{/* <Discover /> */}
			{/* <Choose /> */}
		</div>
	);
};
export default Home;
