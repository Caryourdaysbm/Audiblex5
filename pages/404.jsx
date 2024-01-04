import React from "react";
import styled from "styled-components";

export default function Error404() {
	return (
		<ReactError>
			<p>Error 404, page was not found.</p>
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
