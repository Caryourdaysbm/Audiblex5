import React from "react";
import Link from "next/link";
import Images from "../assets/images/image";
import Image from "next/image";
import styled from "styled-components";
import ReactTimeAgo from "react-time-ago";

const AvailableJobs = (props) => {
	return (
		<ReactDiv arrow={Images.forward_arrow}>
			<div id="Jdescription" className="container">
				<div className="job_app container">
					<ul className="breadcrumb">
						<li>
							<Link href="/jobs">Find Job</Link>
							<Image
								src={Images.forward_arrow}
								width={24}
								height={24}
								alt="Arrow Icon"
							/>
						</li>

						<li>Apply</li>
					</ul>
					<div className="mini_flex_for_save">
						<h2>{props.data?.name}</h2>

						{/* <img src={Images.OptionDots} alt="" /> */}
					</div>
					<p className="posted_by">
						by{" "}
						<span>{`${props.data?.customer?.first_name} ${props.data?.customer?.last_name}`}</span>
					</p>

					<div className="category_by">
						{props.data?.categorys &&
							props.data?.categorys.map((option, index) => {
								return <span key={index}>Suit</span>;
							})}
					</div>

					<div className="location_applicant">
						<p className="locate_with">{props.data?.location}</p>
						{props.data?.accepted_job_invites_count ? (
							<p className="applicants">
								{props.data?.accepted_job_invites_count}94 Applicants
							</p>
						) : (
							""
						)}
					</div>

					<p className="time_stamp">
						<ReactTimeAgo date={props.data.timestamp} />
					</p>
				</div>
			</div>
		</ReactDiv>
	);
};

export default AvailableJobs;

const ReactDiv = styled.div`
	ul.breadcrumb li + li:before {
		content: url(${(prop) => prop.arrow});
	}
`;
