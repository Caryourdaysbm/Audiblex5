import Link from "next/link";
import ReactTimeAgo from "react-time-ago";
import styled from "styled-components";

export default function EachBlogList(props) {
	return (
		<>
			{props.data.results.map((option, index) => {
				return (
					<ReactBlogDiv className="each_card" image={option.image} key={index}>
						<Link href={`/blog/${option.slug}`}>
							<div className="blog_post">
								<div className="blog_img_bg"></div>
								<div className="blog_desc">
									<h3>{option.title}</h3>
									<p>
										{option.description && option.description.substring(0, 80)}
										...
									</p>
									<span>
										{" "}
										<ReactTimeAgo date={option.published_date} />
									</span>
								</div>
							</div>
						</Link>
					</ReactBlogDiv>
				);
			})}
		</>
	);
}

const ReactBlogDiv = styled.div`
	.blog_img_bg {
		background-image: url(${(props) => props.image});
	}
`;
