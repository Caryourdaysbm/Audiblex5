import React from "react";
import Image from "next/image";
import Images from "../assets/images/audiblex.png";
import ImagesWord from "../assets/images/audiblex-word.png";
import Link from "next/link";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="footer_wrap container">
          <div className="quick_links it_logo">
            <Link href="/" className="logo__flex--link">
            <div className="logo__flex">
              <div className="logo__image">
                <Image src={Images} alt="" />
              </div>
              <Image src={ImagesWord} alt="" className="logo__word" />
            </div>
            </Link>

            {/* <span>{Images.twitter2}</span> */}

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              facere obcaecati quo? Dolore
            </p>
          </div>
          <div className="quick_links">
            <ul>
              <h5>Product</h5>
              <li>
                <a href="">For Client</a>
              </li>
              <li>
                <a href="">For Creators</a>
              </li>
              <li>
                <a href="">Pricing</a>
              </li>
            </ul>
          </div>
          <div className="quick_links">
            <ul>
              <h5>Resources</h5>
              <li>
                <a href="">Faq</a>
              </li>
              <li>
                <a href="">Contact Us</a>
              </li>
              <li>
                <a href="">Blog</a>
              </li>
            </ul>
          </div>
          <div className="quick_links">
            <ul>
              <h5>Resources</h5>
              <li>
                <a href="">Privacy policy</a>
              </li>
              <li>
                <a href="">Terms & Condition</a>
              </li>
              <li>
                <a href="">Support</a>
              </li>
            </ul>
          </div>
          <div className="quick_links last-media">
            <ul>
              <h5>Follow us</h5>
              <div className="wrap_footer_icon">
                <img src={Images.twitter} alt="" />
                <img src={Images.facebook} alt="" />
                <img src={Images.instagram} alt="" />
              </div>
            </ul>
          </div>
        </div>

        <h5 className="reserved">© 2024. All right reserved</h5>
      </footer>
    </div>
  );
};
export default Footer;
