import React from "react";

const BankTransferPayment = () => {
	return (
		<div>
			<h2>Bank Transfer Payment</h2>
			<p>Please transfer the total amount due to the following bank account:</p>
			<ul>
				<li>Bank Name: Example Bank</li>
				<li>Account Name: John Doe</li>
				<li>Account Number: 123456789</li>
				<li>Routing Number: 987654321</li>
			</ul>
			<p>
				Once you have made the transfer, please send us a copy of the receipt to
				verify the payment.
			</p>
		</div>
	);
};

export default BankTransferPayment;
