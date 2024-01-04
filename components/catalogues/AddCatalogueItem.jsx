import React, { useState } from "react";
import Images from "../../assets/images/image";
import { getCookie } from "../../assets/js/help_func";

export default function AddCatalogueItem(props) {
	const [userID] = useState(getCookie("u_id"));
	return (
		<div>
			<div className={"add_new_member show_overlay"}>
				<div className="member_form" id="add_to_collection">
					<div className="easy_apply">
						<h5>Create Collection</h5>
						<p>
							You have a limit of 1 collection and 500MB of image upload space on
							<b> your free plan,</b> upgrade for <b>unlimited uploads</b>
						</p>
						<img
							src={Images.close}
							alt="close"
							width={24}
							height={24}
							onClick={() => props.setUploadForm(false)}
						/>
					</div>

					<form action="" id="create_collection" onSubmit={props.handleSubmit}>
						<input
							type="file"
							accept="image/*"
							name="image"
							placeholder="Collection Name"
							required
						/>
						<input type="text" name="name" placeholder="Item Name" required />
						<div>
							<label htmlFor="price_id">The set price is in dollars</label>
							<input
								type="number"
								name="price"
								id="price_id"
								placeholder="10"
							/>
						</div>
						<input type="text" name="freelancer" defaultValue={userID} hidden />

						<button className="native-btn" type="submit">
							Add Item
						</button>
					</form>
				</div>
			</div>
		</div>
	);
}
