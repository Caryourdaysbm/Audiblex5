import Link from "next/link";
import Image from "next/image";

const BlogHead = (props) => {
	if (props.data) {
		return (
			<section className="Blog container">
				<Image
					src={props.data[0]?.image}
					alt={props.data[0]?.title}
					className="sample_pics"
					width={430.648}
					height={291.828}
				/>
				<div className="blog_txt">
					<h1>{props.data[0]?.title}</h1>
					<p>{props.data[0]?.description.substring(0, 200)}...</p>
					<Link href={"/blog/" + props.data[0]?.slug}>
						<button className="native-btn align_txt">Read More</button>
					</Link>
				</div>
			</section>
		);
	} else {
		return <></>;
	}
};
export default BlogHead;
