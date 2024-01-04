import React from "react";
import styled from "styled-components";

export default function Loading() {
	return (
		<ReactError>
			<p>Loading...</p>
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
