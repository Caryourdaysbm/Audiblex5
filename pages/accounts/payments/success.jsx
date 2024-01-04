import Link from "next/link";
import styled from "styled-components";
import { getCookie } from "../../../assets/js/help_func";
import { useRouter } from "next/router";
import Error404 from "../../404";

const PaymentSuccess = () => {
	const router = useRouter();
	const { status } = router.query;

	if (status !== "200") {
		return (
			<>
				<Error404 />
			</>
		);
	} else {
		return (
			<Payment className="container">
				<h1 className="title">Payment Successful</h1>
				<p className="message">
					Thank you for your payment. Your transaction has been successfully
					processed.
				</p>
				<Link
					href={"/" + getCookie("username") + "/dashboard"}
					className="primary-btn"
				>
					{" "}
					Proceed to profile
				</Link>
			</Payment>
		);
	}
};

export default PaymentSuccess;

const Payment = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	height: 100vh;

	.title {
		font-size: 24px;
		margin-bottom: 16px;
	}

	.message {
		font-size: 16px;
		color: #888;
	}
`;
