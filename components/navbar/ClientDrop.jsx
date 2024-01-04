import { useState } from "react";
import Link from "next/link";
import Images from "../../assets/images/image";
import Image from "next/image";
import { getCookie } from "../../assets/js/help_func";

const ClientDrop = () => {
	const [dropdown, setDropdown] = useState(false);

	return (
		<div className="the_profile_pic">
			<Image
				src={Images.normalavatar}
				alt="profile_p"
				height={48}
				width={48}
				onClick={() => {
					dropdown ? setDropdown(false) : setDropdown(true);
				}}
			/>
			{dropdown && (
				<ul className="add_on_list " id="ForViewPort">
					<Link href={"/" + getCookie("u_id")}>
						<li>Profile</li>
					</Link>
					<Link href="/accounts/jobs/">
						<li>Manage Request</li>
					</Link>
					<Link href="/subscription-plan">
						<li>Subscription</li>
					</Link>
					<Link href="/individualSettings">
						<li>Settings</li>
					</Link>
					<Link href="/about">
						<li className="logOut">Log out</li>
					</Link>
					{/* <div className="container__arrow--rt"></div> */}
				</ul>
			)}
		</div>
	);
};

export default ClientDrop;
