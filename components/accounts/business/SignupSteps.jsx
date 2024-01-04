import PersonalInfo from "./Bio";
import BusinessInfo from "./BusinessInfo";
import VerifyOtp from "./VerifyOtp";
import Interest from "../Interest";
import SignUpInfo from "./SignUp";

export default function SignupSteps(props) {
	if (props.stages === "Create") {
		return (
			<SignUpInfo formData={props.formData} setFormData={props.setFormData} />
		);
	} else if (props.stages === "Verify") {
		return (
			<VerifyOtp formData={props.formData} setFormData={props.setFormData} />
		);
	} else if (props.stages === "Details") {
		return (
			<PersonalInfo formData={props.formData} setFormData={props.setFormData} />
		);
	} else if (props.stages === "Biz-info") {
		return (
			<BusinessInfo formData={props.formData} setFormData={props.setFormData} />
		);
	}
	// else return <Interest interests={props.interests} />;
}
