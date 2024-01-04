import React, { useState } from "react";
import Link from "next/link";
import Images from "../../assets/images/image";
import Image from "next/image";

const Interest = (props) => {
	const limit = 5;
	const [selectedCheckboxes, setSelectedCheckboxes] = useState([]);
	// console.log(props.interests);

	function handleCheckboxChange(event) {
		const checkboxValue = event.target.value;
		const isSelected = event.target.checked;

		if (isSelected && selectedCheckboxes.length >= limit) {
			// Prevent checkbox from being selected
			event.target.checked = false;
			return;
		}

		setSelectedCheckboxes((prevSelectedCheckboxes) =>
			isSelected
				? [...prevSelectedCheckboxes, checkboxValue]
				: prevSelectedCheckboxes.filter((value) => value !== checkboxValue)
		);
	}

	return (
		<div className="container">
			<div className="interested">
				<h1>Choose up to 5 category of interest</h1>
				<p>
					You will receive only hand-picked content suggestions based on your
					selections.
				</p>

				<div className="choose_int">
					<ul className="ks-cboxtags">
						{props.interests?.results?.map((option, index) => {
							return (
								<li key={index}>
									<input
										type="checkbox"
										name="interest"
										defaultValue={option.id}
										id={index}
										defaultChecked={selectedCheckboxes.includes(option.id)}
										onChange={handleCheckboxChange}
									/>
									<label htmlFor={index}>{option.name}</label>
								</li>
							);
						})}
					</ul>
				</div>

				<button type="submit" className="native-btn">
					Finish
				</button>

				<div className="think_int">
					<Image src={Images.int} alt="Think of" width={230} height={311} />
				</div>
			</div>
		</div>
	);
};

export default Interest;
