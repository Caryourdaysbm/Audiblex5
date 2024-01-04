import React from "react";
import styled from "styled-components";

export default function Error500({ message }) {
	return (
		<ReactError500>
			<div className="err">
				<h1>500 - Server-side error occurred</h1>
				<p>{message ? message : "Please contact the system administrator"}</p>
			</div>
		</ReactError500>
	);
}

const ReactError500 = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 80vh;
	.err {
		h1,
		p {
			text-align: center;
		}
		h1 {
			font-size: 1.4em;
		}
	}
`;
