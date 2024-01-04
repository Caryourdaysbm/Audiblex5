function VerifyOtp({ formData, setFormData }) {
	return (
		<div className="other-info-container">
			<p>Check your email for OTP:</p>
			<p>
				Dev mode: enter <strong>0123</strong>
			</p>
			<input
				type="number"
				name="otp"
				id=""
				placeholder="Enter OTP"
				value={formData.otp}
				onChange={(e) => {
					setFormData({ ...formData, otp: e.target.value });
				}}
				required
			/>
		</div>
	);
}

export default VerifyOtp;
