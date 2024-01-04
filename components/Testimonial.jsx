import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import release1 from "../assets/images/release1.png";
import release2 from "../assets/images/release2.png";
import release3 from "../assets/images/release3.png";
import release4 from "../assets/images/release4.png";
import Image from "next/image";

export default class Responsive extends Component {
  render() {
    var settings = {
      dots: true,
      margin: 10,
      infinite: false,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1024,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 3,
            infinite: true,
            dots: true,
          },
        },
        {
          breakpoint: 600,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 2,
            initialSlide: 2,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
          },
        },
      ],
    };
    return (
      <div className="container testimonial_class">
        <h2>LATEST RELEASES</h2>
        <Slider {...settings} className="testimonial_carousels">
          <div>
            <div className="per_review">
              <Image src={release1} alt="" />
              <h3> WIZ KHALIFA </h3>
              <h6><span className="aud__styling">32.12</span>AUD <span className="aud__styling">+7.80</span></h6>
             
            </div>
          </div>
          <div>
            <div className="per_review">
              <Image src={release2} alt="" />
              <h3>THE KING OF HEARTS </h3>
              <h6><span className="aud__styling">32.12</span>AUD <span className="aud__styling">+7.80</span></h6>
             
            </div>
          </div>
          <div>
            <div className="per_review">
              <Image src={release3} alt="" />
              <h3>BAD BOYS IN HOOD </h3>
              <h6><span className="aud__styling">32.12</span>AUD <span className="aud__styling">+7.80</span></h6>
             
            </div>
          </div>
          <div>
            <div className="per_review">
              <Image src={release4} alt="" />
              <h3>COUNTRY KINGS</h3>
              <h6><span className="aud__styling">32.12</span>AUD <span className="aud__styling">+7.80</span></h6>
            </div>
          </div>
        </Slider>
      </div>
    );
  }
}
