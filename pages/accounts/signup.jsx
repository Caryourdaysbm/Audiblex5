import GNavbar from "../../components/GeneralNav";
import FormGrid from "../../components/accounts/Scaffold";
import Interest from "../../components/accounts/Interest";
import { useRouter } from "next/router";
import { HOST_URL, reqOptions } from "../../assets/js/help_func";
import { CustomObjects } from "../../components/message/CustomObjects";
import CreateAccount from "../../components/accounts/business/CreateAccount";

const ChooseAccount = ({ interests }) => {
	const router = useRouter();
	const { type, stage } = router.query;

	return (
		<>
			<GNavbar />
			{!type ? (
				<FormGrid />
			) : (
				(type === "FREELANCER" || type === "CUSTOMER") && (
					<CreateAccount types={type} interests={interests} stages={stage} />
				)
			)}
		</>
	);
};

export default ChooseAccount;

export async function getServerSideProps(context) {
	const { params, req, res, query } = context;
	// const { slug } = params

	const objects = {};
	const requestOptions = reqOptions("GET", null);

	const endpoint = `/api/v1/categorys/interest_list/`;

	const response = await fetch(HOST_URL() + endpoint, requestOptions).then(
		(res) => {
			objects["status"] = res.status;

			// Return json if return success
			if (CustomObjects.successCodes.includes(objects.status)) {
				return res.json();
			} else {
				return false;
			}
		}
	);

	objects["interests"] = await response;

	return {
		props: objects,
	};
}
