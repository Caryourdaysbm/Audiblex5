import React from "react";
import {useSearchParams} from 'next/navigation'

function SignUp({ formData, setFormData }) {
	const param = useSearchParams()
	const accountType = param.get('type')
	return (
		<>
			<div className="other-info-container">
			<input
					type="hidden"
					value={accountType}
					name="user_type"
					onChange={(e) => {
						setFormData({ ...formData, user_type: e.target.value });
					}}
					required
				/>
				<input
					type="text"
					placeholder="First Name"
					value={formData.first_name}
					name="first_name"
					onChange={(e) => {
						setFormData({ ...formData, first_name: e.target.value });
					}}
					required
				/>
				<input
					type="text"
					placeholder="Last Name"
					value={formData.last_name}
					name="last_name"
					onChange={(e) => {
						setFormData({ ...formData, last_name: e.target.value });
					}}
					required
				/>
				<input
					type="text"
					placeholder="Email"
					value={formData.email}
					name="email_name"
					onChange={(e) => {
						setFormData({ ...formData, email: e.target.value });
					}}
					required
				/>
				<div className="">
					<input
						type="password"
						placeholder="Password"
						value={formData.password1}
						name="password1"
						onChange={(e) => {
							setFormData({ ...formData, password1: e.target.value });
						}}
						required
					/>
					<input
						type="password"
						placeholder="RetypePassword"
						value={formData.password2}
						name="password2"
						onChange={(e) => {
							setFormData({ ...formData, password2: e.target.value });
						}}
						required
					/>
				</div>
			</div>
		</>
	);
}

export default SignUp;
