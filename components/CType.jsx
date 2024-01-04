import React from "react";
import Images from "../assets/images/image";
import Image from "next/image";

const CollectionType = (props) => {
	return (
		<section className="container">
			<div className="featured_img">
				<Image
					src={props.items.image || Images.suit1}
					alt="Featured Image"
					width={914}
					height={250}
				/>
				<span>{props.items.category.name}</span>
				<h4>{props.items.name}</h4>
				<p>{props.items.description}</p>
			</div>
		</section>
	);
};
export default CollectionType;
