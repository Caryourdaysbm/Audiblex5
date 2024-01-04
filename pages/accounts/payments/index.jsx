import BillingInfo from "../../../components/BillingInfo";
import Footer from "../../../components/Footer";
import PlanSummary from "../../../components/PlanSummary";
import Method from "../../../components/payments/Method";
import PrimaryNavbar from "../../../components/navbar/PrimaryNavbar";
import LoginRequired from "../../../components/forms/LoginRequired";

const Payment = () => {
	LoginRequired();
	return (
		<>
			<PrimaryNavbar />
			<PlanSummary />
			{/* <BillingInfo /> */}
			<Method />
			<Footer />
		</>
	);
};

export default Payment;
