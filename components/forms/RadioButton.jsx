import React from "react";
import styled from "styled-components";

/*
  <RadioButton id='' name='' value='' label='' checked={ false } onChange={''}/>
*/
const RadioButton = ({ name, value, checked, heading, objects }) => {
	return (
		<ReactRadioInput>
			<h3>{heading}:</h3>
			{objects.map((option, index) => {
				return (
					<div id="radioGroup">
						<input
							type="radio"
							id={option.name + "_" + index}
							name={name}
							value={option.value}
							defaultChecked={checked ? true : false}
							// onChange={onChange}
							key={index}
						/>
						<label htmlFor={option.name + "_" + index}>{option.title}</label>
					</div>
				);
			})}
		</ReactRadioInput>
	);
};

export default RadioButton;

const ReactRadioInput = styled.div`
	h3 {
		font-size: 16px;
		line-height: 120%;
		margin-top: 30px;
		margin-bottom: 10px;
	}
	#radioGroup {
		display: flex;
		margin-bottom: 0px !important;
		align-items: center;

		label {
			display: block;
			margin-left: 0.5rem;
		}

		input[type="radio"] {
			margin-right: 0px 0.5rem 0px 0px !important;
			width: 25px;
			accent-color: #232323;
		}

		input[type="radio"]:last-of-type {
			margin-right: 0;
		}

		input[type="radio"]:checked + label {
			font-weight: bold;
		}
		input {
			margin: 0px 0.5rem 0px 0px !important;
		}
	}
`;
