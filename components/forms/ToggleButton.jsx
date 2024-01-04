import React, { useState } from "react";
import styled from "styled-components";

const ToggleButton = (props) => {
	const [isActive, setIsActive] = useState(false);

	const handleClick = () => {
		setIsActive(!isActive);
    props.handleToggle(!isActive)
	};

	return (
		<ReactToggleButton>
			<div
				className={`toggle-button ${isActive ? "active" : ""}`}
				onClick={handleClick}
			>
				<div className="toggle-button-inner" />
			</div>
		</ReactToggleButton>
	);
};

export default ToggleButton;

const ReactToggleButton = styled.div`
	.toggle-button {
		display: inline-block;
		width: 48px;
		height: 24px;
		border-radius: 12px;
		background-color: #ccc;
		position: relative;
		cursor: pointer;
	}

	.toggle-button.active {
		background-color: #0077cc;
	}

	.toggle-button-inner {
		position: absolute;
		top: 50%;
		left: 4px;
		width: 16px;
		height: 16px;
		border-radius: 50%;
		background-color: #fff;
		box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
		transform: translateY(-50%);
		transition: transform 0.3s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	.toggle-button.active .toggle-button-inner {
		transform: translate(24px, -50%);
	}
`;
