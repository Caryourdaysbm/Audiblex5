/** @format */

import React from "react";
import Link from "next/link";
import dj from "../../assets/images/dj.png";
import camera from "../../assets/images/camera.png";
import Dashboard from "../../assets/images/dashboard.png";
import Analytics from "../../assets/images/analytics.png";
import Distribution from "../../assets/images/Distribution.png";
import Upload from "../../assets/images/upload.png";
import Monetization from "../../assets/images/monetization.png";
import Radio from "../../assets/images/radio6.png";
import Support from "../../assets/images/support2.png";
import Signout from "../../assets/images/signout.png";



import Image from "next/image";

// Note: Component for the Hero banner
// 1. Not 100% technical,You can Change image
const CreatorSideBar = () => {
  return (
    <>
      <section className="banner">
        <div className="container">
          <div className="container__flex">
            <div className="side__nav">
              <ul>
               
                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={Dashboard}
                      alt="MockUp"
                      className="nav__icon--img"
                    />
                    <li>Dashboard</li>
                  </div>
                </Link>
                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={Analytics}
                      alt="MockUp"
                      className="nav__icon--img"
                    />
                    <li>Analytics</li>
                  </div>
                </Link>
                <Link href="upload">
                  <div className="nav__icon__img--container">
                    <Image
                      src={Upload}
                      alt="MockUp"
                      className="nav__icon--img"
                    />
                    <li>Upload</li>
                  </div>
                </Link>
                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={Monetization}
                      alt="MockUp"
                      className="nav__icon--img"
                    />
                    <li>Monetization</li>
                  </div>
                </Link>

                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={Distribution}
                      alt="MockUp"
                      className="nav__icon--img"
                    />

                    <li>Distribution</li>
                  </div>
                </Link>
                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={Radio}
                      alt="MockUp"
                      className="nav__icon--img"
                    />

                    <li>Add Radio</li>
                  </div>
                </Link>

                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={Support}
                      alt="MockUp"
                      className="nav__icon--img"
                    />

                    <li>Support</li>
                  </div>
                </Link>

                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={Signout}
                      alt="MockUp"
                      className="nav__icon--img"
                    />

                    <li>Sign out</li>
                  </div>
                </Link>
              </ul>
            </div>
            <div className="banner_txt">
              <div className="get_started_with pt-3">
                <h2>    Map will be here </h2>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default CreatorSideBar;
