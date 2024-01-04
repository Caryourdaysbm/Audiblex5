import React from "react";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/Footer";
import Group from "../../components/GroupH";
import Teams from "../../components/Teams";
import Newsletter from "../../components/Newsletter";

const About = () => {
	return (
		<div>
			<Navbar />
			<Group />
			<Teams />
			<Newsletter />
			<Footer />
		</div>
	);
};
export default About;
