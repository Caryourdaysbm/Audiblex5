import React from "react";
import Images from "../assets/images/image";
import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";

const CreatorsJob = (props) => {
	return (
		<ReactCreatorsJob className="client_section">
			{props.data &&
				props.data?.results.map((option, index) => {
					return (
						<div className="per_creators" key={index}>
							<Link href={`/${option.username}/`}>
								{option.banner ? (
									<Image
										src={option.banner}
										alt="Job Poster"
										className="post_pic"
										width={365.258}
										height={150}
									/>
								) : (
									<Image
										src={Images.smile}
										alt="Job Poster"
										className="post_pic"
										width={365.258}
										height={150}
									/>
								)}
								{/* Sub */}

								<div className="wrap_desc">
									<div className="job_bider">
										{option.thumbnail ? (
											<Image
												src={option.thumbnail}
												alt={`${option.user.first_name} ${option.user.last_name}`}
												className="profile"
												height={32}
												width={32}
											/>
										) : (
											<div className="thumbnail_text">
												<p>{option.user.first_name.slice(0, 1)}</p>
											</div>
										)}
										<div className="grace">
											<h2>{`${option.user.first_name} ${option.user.last_name}`}</h2>
											<p>Level 2 seller</p>
										</div>
										<img src={Images.medal} alt="medal" />
									</div>
									<div className="about_project">
										{/* Shorten the description with (...) */}
										<p>
											{`${
												option.description
													? option.description.slice(0, 50)
													: ""
											}
												${option.description ? option.description.length > 50 && "..." : ""}`}
										</p>
										<h5>
											<Image
												src={Images.stars}
												width={24}
												height={24}
												alt="Star Icons"
												className="stars"
											/>
											4.5 <span>(355)</span>
										</h5>
									</div>

									{/* <div className="howmuch">
										<h4>$500</h4>
									</div> */}
								</div>
							</Link>
							{/* Sub */}
						</div>
					);
				})}
		</ReactCreatorsJob>
	);
};

export default CreatorsJob;

const ReactCreatorsJob = styled.section`
	.stars {
		width: auto;
		top: 7px;
		position: relative;
	}
	.thumbnail_text {
		width: 32px;
		height: 32px;
		background: var(--OldRose);
		border-radius: 100%;
		color: var(--white);
		margin-right: 15px;
		position: relative;
		p {
			position: absolute;
			color: var(--white);
			right: 10px;
			top: 4px;
			font-weight: 700;
		}
	}
`;
