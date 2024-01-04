/** @format */

import React from "react";
import Link from "next/link";
import dj from "../assets/images/dj.png";
import camera from "../assets/images/camera.png";
import listen from "../assets/images/listen.png";
import radar from "../assets/images/radar.png";
import home from "../assets/images/home.png";
import radio from "../assets/images/radio.png";
import tradebot from "../assets/images/tradebot.png";
import Image from "next/image";

// Note: Component for the Hero banner
// 1. Not 100% technical,You can Change image
const Banner = () => {
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
                      src={home}
                      alt="MockUp"
                      className="nav__icon--img"
                    />

                    <li>Home</li>
                  </div>
                </Link>
                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={listen}
                      alt="MockUp"
                      className="nav__icon--img"
                    />
                    <li>Listen</li>
                  </div>
                </Link>
                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={radar}
                      alt="MockUp"
                      className="nav__icon--img"
                    />
                    <li>Discover</li>
                  </div>
                </Link>
                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={radio}
                      alt="MockUp"
                      className="nav__icon--img"
                    />
                    <li>Radio</li>
                  </div>
                </Link>
                <Link href="">
                  <div className="nav__icon__img--container">
                    <Image
                      src={tradebot}
                      alt="MockUp"
                      className="nav__icon--img"
                    />
                    <li>Discover</li>
                  </div>
                </Link>
              </ul>
            </div>
            <div className="banner_txt">
              <div className="get_started_with pt-3">
                <Image src={camera} alt="MockUp" />
              </div>
              <div>
                <h1>THE FUTURE EVOLVE WITH AUDIBLEX</h1>
                <p>
                  our mission is to empower creators to earn income from their
                  audio content through rewards and engagement
                </p>
              </div>

              <div className="get_started_with pt-3">
                <Image src={dj} alt="MockUp" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
export default Banner;
