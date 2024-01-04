import React from "react";
import Sideavatar from "../Sideavatar";
import Link from "next/link";
import Images from "../../assets/images/image";
import { useRouter } from "next/router";

const FormGrid = () => {
	const router = useRouter();

	const updateParams = (params) => {
		router.replace({
			query: { type: params, stage: "Create" },
		});
	};
	return (
		<div className="control_Grid">
			<Sideavatar
				header="Few Clicks away from creating your account"
				paragraph="Start your account set up in minutes, save time and money. "
				image={Images.D1}
			/>
			<div className="structure2">
				<div>
					<div className="get_started_form">
						<h2>Choose the type of account</h2>
						<p>
							To get started tell us what type of account you intend creating.
						</p>
						<div className="acct_cat">
							<div onClick={() => updateParams("FREELANCER")}>
								<img src={Images.Clients} alt="Business" />
								<h5>Business</h5>
							</div>
							<div onClick={() => updateParams("CUSTOMER")}>
								<img src={Images.Users} alt="Business" />
								<h5>Personal</h5>
							</div>
						</div>

						<div className="already">
							<h5>
								Already have an account?
								<Link href="/accounts/login">
									<span> Login</span>
								</Link>
							</h5>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FormGrid;
