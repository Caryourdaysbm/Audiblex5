import { useEffect, useState } from "react";
import {
	PayPalScriptProvider,
	PayPalButtons,
	usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import PaymentSuccess from "./PaymentSuccess";
import { getCookie } from "../../assets/js/help_func";
import { useRouter } from "next/router";

const ButtonWrapper = (props) => {
	const [{ options }, dispatch] = usePayPalScriptReducer();
	const router = useRouter();

	useEffect(() => {
		dispatch({
			type: "resetOptions",
			value: {
				...options,
				intent: "subscription",
			},
		});
	}, [props.type]);

	console.log("props.paypal_plan_id: ", props.paypal_plan_id);
	console.log("props.quantity: ", props.quantity);
	console.log("user: ", getCookie("u_id"));

	return (
		<PayPalButtons
			createSubscription={(data, actions) => {
				return actions.subscription
					.create({
						plan_id: props.paypal_plan_id,
						custom_id: getCookie("u_id"),
						auto_renewal: props.quantity === "1" ? true : false,
						quantity: props.quantity,
					})
					.then((orderId) => {
						// Your code here after create the order
						console.log("orderId: ", orderId);
						return orderId;
					});
			}}
			style={{
				label: "subscribe",
			}}
			onApprove={function (data, actions) {
				return actions.order.capture().then(function () {
					router.push("/accounts/payments/success?status=200");
				});
			}}
		/>
	);
};

export default function ReactPaypal(props) {
	const [success, setSuccess] = useState(false);
	return (
		<>
			<PayPalScriptProvider
				options={{
					"client-id": process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID,
					components: "buttons",
					intent: "subscription",
					vault: true,
				}}
			>
				<ButtonWrapper
					type="subscription"
					paypal_plan_id={props.paypal_plan_id}
					setSuccess={setSuccess}
					quantity={props.quantity}
				/>
			</PayPalScriptProvider>
			{success && <PaymentSuccess />}
		</>
	);
}
