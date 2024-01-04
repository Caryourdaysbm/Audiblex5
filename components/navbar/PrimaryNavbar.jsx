import Link from "next/link";
import React, { useEffect, useState } from "react";
import { getCookie } from "../../assets/js/help_func";
import DropdownMenu from "./DropdownMenu";
import { useRouter } from "next/router";
import Image from "next/image";
import Images from "../../assets/images/audiblex.png";
import ImagesWord from "../../assets/images/audiblex-word.png";

const PrimaryNavbar = (props) => {
  const router = useRouter();
  const { username } = router.query;
  const [userType, setUserType] = useState();
  const [userID, setUserID] = useState();
  const [cookieUsername, setCookieUsername] = useState();

  const [showMenu, setShowMenu] = useState("navlinks");
  const [blur, setBlur] = useState("backgroundMask");
  const NavToggle = () => {
    showMenu === "navlinks"
      ? setShowMenu("navlinks menudrop")
      : setShowMenu("navlinks");

    blur === "backgroundMask"
      ? setBlur("backgroundMask placeblur")
      : setBlur("backgroundMask");
  };

  useEffect(() => {
    setUserType(getCookie("user_type"));
    setUserID(getCookie("u_id"));
    setCookieUsername(getCookie("username"));
  }, [userType]);

  return (
    <div>
      <header>
        <nav className="container">
          {/* <DarkMode /> */}
          <Link href="/" className="logo__flex--link">
            <div className="logo__flex">
              <div className="logo__image">
                <Image src={Images} alt="" />
              </div>
              <Image src={ImagesWord} alt="" className="logo__word" />
            </div>
          </Link>
          <div className={blur} onClick={NavToggle}></div>
          <ul className={showMenu} id="PrimaryNavbar">
            <h2 className="on_nav">instasew</h2>
            <div className="nav__elements">
              <Link href="">
                <li>Login</li>
              </Link>
              <Link href="">
                <li>Signup</li>
              </Link>
            </div>
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
export default PrimaryNavbar;
