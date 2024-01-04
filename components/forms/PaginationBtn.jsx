import { React, useState, useEffect } from "react";
import styled from "styled-components";
import {
	reqOptions,
	fetchAPI,
	HOST_URL,
	checkUrl,
} from "../../assets/js/help_func";
import { useRouter } from "next/router";
import Link from "next/link";

export default function PaginationBtn({ totalPages, currentPage, urlPath }) {
	const router = useRouter();
	const { cat, user, search } = router.query;

	const generatePages = (start, end) => {
		const pages = [];

		for (let i = start; i <= end; i++) {
			pages.push(i);
		}

		return pages;
	};

	const generatePagination = (currentPage, totalPages) => {
		const range = 2; // range of numbers to show on either side of current page
		const pagination = [];

		// First button
		pagination.push(
			<li
				key="first"
				className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
			>
				<a
					className="page-link"
					href={`${urlPath}?${search ? `search=${search}&` : ""}${
						cat ? `cat=${cat}&` : ""
					}${user ? `staff=${user}&` : ""}page=1`}
					aria-label="First"
				>
					<span aria-hidden="true">&laquo;</span>
					<span className="sr-only">First</span>
				</a>
			</li>
		);

		// Previous button
		pagination.push(
			<li
				key="prev"
				className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
			>
				<a
					className="page-link"
					href={`${urlPath}?${search ? `search=${search}&` : ""}${
						cat ? `cat=${cat}&` : ""
					}${user ? `staff=${user}&` : ""}page=${currentPage - 1}`}
					aria-label="Previous"
				>
					<span aria-hidden="true">&lsaquo;</span>
					<span className="sr-only">Previous</span>
				</a>
			</li>
		);

		// Generate page numbers
		const pages = generatePages(
			Math.max(1, currentPage - range),
			Math.min(totalPages, currentPage + range)
		);
		pages.forEach((page) => {
			pagination.push(
				<li
					key={page}
					className={`page-item ${currentPage === page ? "active" : ""}`}
				>
					<a
						className="page-link"
						href={`${urlPath}?${search ? `search=${search}&` : ""}${
							cat ? `cat=${cat}&` : ""
						}${user ? `staff=${user}&` : ""}page=${page}`}
					>
						{page}
					</a>
				</li>
			);
		});

		// Next button
		pagination.push(
			<li
				key="next"
				className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
			>
				<a
					className="page-link"
					href={`${urlPath}?${search ? `search=${search}&` : ""}${
						cat ? `cat=${cat}&` : ""
					}${user ? `staff=${user}&` : ""}page=${currentPage + 1}`}
					aria-label="Next"
				>
					<span aria-hidden="true">&rsaquo;</span>
					<span className="sr-only">Next</span>
				</a>
			</li>
		);

		// Last button
		pagination.push(
			<li
				key="last"
				className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}
			>
				<a
					className="page-link"
					href={`${urlPath}?${search ? `search=${search}&` : ""}${
						cat ? `cat=${cat}&` : ""
					}${user ? `staff=${user}&` : ""}page=${totalPages}`}
					aria-label="Last"
				>
					<span aria-hidden="true">&raquo;</span>
					<span className="sr-only">First</span>
				</a>
			</li>
		);
	};
	generatePagination(1, 10);
}
