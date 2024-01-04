// import glob from "fast-glob";
// import path from "path";
import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function PageList() {
	const [cookieUsername, setCookieUsername] = useState('');

	// Get all page files with a .js extension (excluding special files)
	// const files = glob.sync(["**/pages/**/[^_]*.jsx"], {
	// 	dot: true,
	// });
	// console.log(files);

	// // Extract the page name from each file path
	// const pages = files.map((file) => {
	// 	// console.log(files);
	// 	const { dir, name } = path.parse(file);
	// 	let page = `${dir}/${name}`;

	// 	// Replace patterns: [, ], index, pages
	// 	page = page.replace(/\[|\]|\bindex\b|\pages/g, "");
	// 	// console.log("PAGE:::>", page);
	// 	return page;
	// });

	// console.log(pages);

	useEffect(() => {
		// setCookieUsername(getCookie("username"));
		setCookieUsername(getCookie("name"));
		//alert(getCookie("username") )
	}, []);

	const newPages = [
		"/401",
		"/404",
		"/500",
		"/page-list",
		"/pricing",
		"/username/dashboard",
		"/username/",
		"/about/contact",
		"/accounts/login",
		"/accounts/logout",
		"/accounts/payments",
		// "/accounts/measurements",
		"/measurements",
		"/accounts/settings",
		"/accounts/signup",
		"/blog/slug",
		"/blog/",
		"/jobs/job_id",
		"/jobs/create-job",
		"/jobs/creators",
		"/jobs/",
		"/jobs/requests",
		"/jobs/saved",
		`/${cookieUsername}/catalogue`,
		`/${cookieUsername}`,
		"/username/catalogue/catalogue_id",
		"/username/messages/",
	];

	return (
		<ReactPageList>
			<h2>Page Lists:</h2>
			<ul>
				{newPages.map((page, index) => (
					<li key={index}>
						<Link href={`${page}`} target="_blank" rel="noopener noreferrer">
							<span>{index + 1}.</span> {page}
						</Link>
					</li>
				))}
			</ul>
		</ReactPageList>
	);

	// try {
	// 	// Your component code here
	// 	return (
	// 		<ul>
	// 			{pages.map((page) => (
	// 				<li key={page}>
	// 					<Link href={`${page}`}>{page}</Link>
	// 				</li>
	// 			))}
	// 		</ul>
	// 	);
	// } catch (error) {
	// 	// Handle the error here
	// 	// Add this catch because of fast-job bug
	// 	// TypeError: Cannot read properties of undefined (reading 'split')
	// 	console.error(error);
	// 	return (
	// 		<ul>
	// 			{pages.map((page) => (
	// 				<li key={page}>
	// 					<Link href={`/${page}`}>{page}</Link>
	// 				</li>
	// 			))}
	// 		</ul>
	// 	);
	// }
}

const ReactPageList = styled.div`
	max-width: 900px;
	margin: 50px auto;

	li {
		margin-top: 10px;
		padding: 10px 20px;
		border-bottom: 1px solid #f4f4f4;
		a {
			display: block;
		}
		&:hover {
			background: #f4f4f4;
		}
		box-sizing: border-box;
	}

	span {
		margin-right: 30px;
	}
`;
