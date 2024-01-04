import Link from "next/link";
import React from "react";
import { getCookie } from "../../assets/js/help_func";

const PaymentSuccess = () => {
	return (
		<div className="container mt-5">
			<div className="method_pay">
				<h2>Payment Successful!</h2>
				<p>
					Thank you for your subscription. Additional features has been added to
					your account.{" "}
				</p>
				<Link href={`/${getCookie("username")}/dashboard`}>
					Go to dashboard
				</Link>
			</div>
		</div>
	);
};

export default PaymentSuccess;
