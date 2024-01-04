import React from "react";
import Images from "../assets/images/image";
import ReactTimeAgo from "react-time-ago";

// Note: Component that shows all available Jobs when you Click on FIND JOBS.
// 1. Shows Location,Categories and how long you've posted it.
const AvailableJobs = (props) => {
	if (props.data && props.data.results) {
		return (
			<>
				{props.data.results.jobs.map((option, index) => {
					return (
						<div className="job_app" key={index}>
							<div className="mini_flex_for_save">
								<h2>{option.name}</h2>

								{/* <img src={Images.OptionDots} alt="" /> */}
							</div>
							<p className="posted_by">
								by{" "}
								<span>
									{`${option.customer.first_name} ${option.customer.last_name}`}
								</span>
							</p>

							<div className="category_by">
								{option.categorys.map((cat, catIndex) => {
									return <span key={catIndex}>{cat.name}</span>;
								})}
							</div>

							<div className="location_applicant">
								<p className="locate_with">{option.location}</p>
								<p className="applicants">
									{option.accepted_job_invites_count
										? option.accepted_job_invites_count + " Applicants"
										: "Be the first to apply"}
								</p>
							</div>

							<p className="time_stamp">
								<ReactTimeAgo date={option.timestamp} />
							</p>
						</div>
					);
				})}
			</>
		);
	}
};

export default AvailableJobs;
