import styled from "styled-components";

const FormError = ({ errors, status }) => {
	if (status === 500) {
		return (
			<ReactFormError>
				<h4>Error {status}: </h4>
				<div>
					<p>- The server couldn't process your request.</p>
				</div>
			</ReactFormError>
		);
	} else if (status === 404) {
		return (
			<ReactFormError>
				<h4>Error {status}: </h4>
				<div>
					<p>- Details not found.</p>
				</div>
			</ReactFormError>
		);
	} else if (errors) {
		if(errors.detail !== null){
<ReactFormError>
				<h4>Error {status}: </h4>
				<div>
					<p>- {errors.detail}</p>
				</div>
			</ReactFormError>
		}
		else{
<ReactFormError>
				<h4>Error 401: </h4>
				<div>
					<p>- {"Something went wrong. Please try again"}</p>
				</div>
			</ReactFormError>
		}
		/* return (
			
			<ReactFormError>
				<h4>Error {status}: </h4>
				{Object.keys(errors).length > 0 && (
					<div>
						{Object.keys(errors)?.map((field, index) => (
							<p key={index}>
								{errors[field]?.map((error, index) => (
									<p key={index}>
										<strong>{field}:</strong> {error}
									</p>
								))}
							</p>
						))}
					</div>
				)}
			</ReactFormError>
		); */
	}
};

export default FormError;

const ReactFormError = styled.div`
	padding: 20px;
	margin: 20px 0px;
	background-color: #f4f4f4;
	p {
		font-size: 14px;
		margin-bottom: 10px;
	}
	h4 {
		font-size: 1em;
	}
`;
