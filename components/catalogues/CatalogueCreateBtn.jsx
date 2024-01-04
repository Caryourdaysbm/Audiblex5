"use client";
import { useRouter } from "next/router";
import { React, useState } from "react";
import { getCookie } from "../../assets/js/help_func";
import Link from "next/link";

const CatalogueCreateBtn = (props) => {
	const router = useRouter();
	const { username } = router.query;
	const [owner] = useState(username === getCookie("username"));
	const [plan_name] = useState(getCookie("plan_name"));
	console.log(owner);
	if ( 
		(owner && plan_name === "PREMIUM" && props.listCount < 3) ||
		(owner && plan_name === "PLATINUM") ||
		(owner && plan_name === "FREE" && props.listCount < 1)
	) {
		return (
			<>
				{/* ADDING A NEW COLLECTION */}
				<div className="each_card">
					<div className="create_new">
						<div className="wrap_plus_class">
							<div className="plus" onClick={props.overlay}></div>
							<p>Create New collection</p>
						</div>
					</div>
				</div>
			</>
		);
	} else if (owner) {
		return (
			<div className="each_card">
				<Link href={"/pricing"}>
					<div className="create_new">
						<div className="wrap_plus_class">
							<p>Upgrade plan to create more catalogue.</p>
						</div>
					</div>
				</Link>
			</div>
		);
	} else {
		return <></>;
	}
};
export default CatalogueCreateBtn;
