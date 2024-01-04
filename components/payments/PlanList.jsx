import Link from "next/link";
import React, { useState } from "react";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import styled from "styled-components";
import ToggleButton from "../forms/ToggleButton";

const PlanList = (props) => {
	const [premiumPrice, setPremiumPrice] = useState(0);
	const [platinumPrice, setPlatinumPrice] = useState(0);
	const [yearly, setYearly] = useState("Monthly");
	const [quantity, setQuantity] = useState("1");

	const handleToggle = (isYearly) => {
		setYearly(isYearly ? "Yearly" : "Monthly");
		if (isYearly) {
			setPremiumPrice(premiumPrice * 10); // update price to yearly
			setPlatinumPrice(platinumPrice * 10); // update price to yearly
			setQuantity("10");
		} else {
			setPremiumPrice(premiumPrice / 10); // update price to monthly
			setPlatinumPrice(platinumPrice / 10); // update price to monthly
			setQuantity("1");
		}
	};

	if (!premiumPrice && !platinumPrice) {
		props.data.results.filter((option, index) => {
			if (option.plan_type === "PREMIUM") setPremiumPrice(Number(option.price));
			if (option.plan_type === "PLATINUM")
				setPlatinumPrice(Number(option.price));
		});
	}
	// console.log(props.data);

	return (
		<PlanWrapper>
			<div className="toggle">
				<label>Monthly</label>
				<ToggleButton handleToggle={handleToggle} />
				<label>Yearly</label>
			</div>
			<div className="container subsc">
				{props.data.results.map((option, index) => {
					return (
						<ReactPlanList key={index}>
							<div className="plans">
								<div className="plan_top">
									<h4>{option.name}</h4>
									<p>Limited access</p>
									{option.plan_type === "PREMIUM" ? (
										<p>
											<span>${premiumPrice}</span> /{yearly}
											{yearly === "Yearly" && (
												<p className="yearly_message">
													You save ${Number(option.price) * 2}
												</p>
											)}
										</p>
									) : option.plan_type === "PLATINUM" ? (
										<p>
											<span>${platinumPrice}</span> /{yearly}
											{yearly === "Yearly" && (
												<p className="yearly_message">
													You save ${Number(option.price) * 2}
												</p>
											)}
										</p>
									) : (
										""
									)}
								</div>

								<ul className="access">
									<ReactMarkdown>{option.description}</ReactMarkdown>

									{option.plan_type === "PREMIUM" ? (
										<Link
											href={`/accounts/payments/?types=${option.plan_type}&amount=${premiumPrice}&plan_id=${option.id}&paypal_plan_id=${option.paypal_plan_id}&quantity=${quantity}`}
										>
											<button className="native-btn">Choose Plan</button>
										</Link>
									) : option.plan_type === "PLATINUM" ? (
										<Link
											href={`/accounts/payments/?types=${option.plan_type}&amount=${platinumPrice}&plan_id=${option.id}&paypal_plan_id=${option.paypal_plan_id}&quantity=${quantity}`}
										>
											<button className="native-btn">Choose Plan</button>
										</Link>
									) : (
										<Link
											href={`/accounts/payments/?types=${
												option.plan_type
											}&amount=${0}&plan_id=${option.id}&paypal_plan_id=${
												option.paypal_plan_id
											}&quantity=${quantity}`}
										>
											{/* <button className="native-btn">Choose Plan</button> */}
										</Link>
									)}
								</ul>
							</div>
						</ReactPlanList>
					);
				})}
			</div>
		</PlanWrapper>
	);
};

export default PlanList;

const ReactPlanList = styled.div`
	width: 32%;

	@media (max-width: 500px) {
		width: 100%;
	}
`;

const PlanWrapper = styled.div`
	.toggle {
		display: flex;
		align-items: center;
		justify-content: space-around;
		width: 200px;
		margin: 20px auto;
	}
	.yearly_message {
		font-size: 12px;
	}
`;
