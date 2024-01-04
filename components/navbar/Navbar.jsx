import Link from "next/link";
import React, { useState } from "react";
import { useTransition, animated } from "react-spring";
import Images from "../../assets/images/image";
import DarkMode from "../DarkMode";

const Navbar = (props) => {
	const [showMenu, setShowMenu] = useState("navlinks");
	const [blur, setBlur] = useState("backgroundMask");
	const transitions = useTransition(showMenu, {
		from: { opacity: 0 },
		enter: { opacity: 1 },
		leave: { opacity: 0 },
		reverse: showMenu,
		delay: 200,
		// config: config.molasses,
		// onRest: () => set(!showMenu),
	});
	const NavToggle = () => {
		showMenu === "navlinks"
			? setShowMenu("navlinks menudrop")
			: setShowMenu("navlinks");

		blur === "backgroundMask"
			? setBlur("backgroundMask placeblur")
			: setBlur("backgroundMask");
	};

	return (
		<div>
			<header>
				<nav className="container">
					<DarkMode />
					<Link href="/">
						<h2>instasew</h2>
					</Link>
					<div className={blur} onClick={NavToggle}></div>
					<ul className={showMenu}>
						<h2 className="on_nav">instasew</h2>
						<Link href="/about">
							<li>About</li>
						</Link>

						<Link href="/about/contact">
							<li>Contact</li>
						</Link>
						<Link href="/blog">
							<li>Blog</li>
						</Link>
						{/* <li>
              <DarkMode />
            </li> */}
						<Link href="/accounts/login">
							<button className="btn_only">Login</button>
						</Link>
					</ul>

					<div
						className="hamburger"
						onClick={NavToggle}
						// onMouseMove={NavToggle}
					>
						<div className="line"></div>
						<div className="line"></div>
						<div className="line"></div>
					</div>
				</nav>
			</header>
		</div>
	);
};
export default Navbar;
