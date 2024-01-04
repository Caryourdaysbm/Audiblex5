import React, { useState } from "react";
import styled from "styled-components";

const Checkbox = ({
	names,
	values,
	checked,
	className,
	onChange,
	keys,
	text,
}) => {
	const [isChecked, setIsChecked] = useState(checked);

	const handleChange = (event) => {
		setIsChecked(event.target.checked);
		if (onChange) {
			onChange(event.target.checked);
		}
	};

	return (
		<CheckboxLabel className={className} key={keys}>
			<CheckboxContainer>
				<HiddenCheckbox
					checked={isChecked}
					name={names}
					defaultValue={values}
					onChange={handleChange}
				/>
				<StyledCheckbox checked={isChecked}>
					<Icon viewBox="0 0 24 24">
						<polyline points="20 6 9 17 4 12" />
					</Icon>
				</StyledCheckbox>
			</CheckboxContainer>
			<CheckboxText>{text}</CheckboxText>
		</CheckboxLabel>
	);
};

export default Checkbox;

const CheckboxContainer = styled.div`
	display: inline-block;
	vertical-align: middle;
`;

const Icon = styled.svg`
	fill: none;
	stroke: white;
	stroke-width: 2px;
`;

const HiddenCheckbox = styled.input.attrs({ type: "checkbox" })`
	/* Hide default checkbox */
	border: 0;
	clip: rect(0 0 0 0);
	clippath: inset(50%);
	height: 1px;
	margin: -1px;
	overflow: hidden;
	padding: 0;
	position: absolute;
	white-space: nowrap;
	width: 1px;
`;

const StyledCheckbox = styled.div`
	display: inline-block;
	width: 16px;
	height: 16px;
	background: ${(props) => (props.checked ? "salmon" : "papayawhip")};
	border-radius: 3px;
	transition: all 150ms;

	${Icon} {
		visibility: ${(props) => (props.checked ? "visible" : "hidden")};
	}
`;

const CheckboxLabel = styled.label`
	display: flex;
	align-items: center;
	margin-bottom: 8px;
	cursor: pointer;
`;

const CheckboxText = styled.span`
	margin-left: 8px;
	user-select: none;
`;
