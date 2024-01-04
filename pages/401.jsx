import React from "react";
import styled from "styled-components";

export default function Error401() {
	return (
		<ReactError>
			<p>You do not have permissions to view this content.</p>
		</ReactError>
	);
}

const ReactError = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
	p {
		text-align: center;
	}
`;
