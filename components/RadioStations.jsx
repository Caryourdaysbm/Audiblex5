import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import radio1 from "../assets/images/radio1.png";
import radio2 from "../assets/images/radio2.png";
import radio3 from "../assets/images/radio3.png";
import radio4 from "../assets/images/radio4.png";
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
        <h2>RADIO STATIONS</h2>
        <Slider {...settings} className="testimonial_carousels">
          <div>
            <div className="per_revieww">
              <Image src={radio1} alt="" />
            </div>
            <h6> RADIO 105 </h6>
            <h6>
              <span className="aud__styling">32.12</span>AUD{" "}
              <span className="aud__styling">+7.80</span>
            </h6>
          </div>
          <div>
            <div className="per_revieww">
              <Image src={radio2} alt="" />
            </div>
            <h6>NRJ RADIO </h6>
            <h6>
              <span className="aud__styling">32.12</span>AUD{" "}
              <span className="aud__styling">+7.80</span>
            </h6>
          </div>
          <div>
            <div className="per_revieww">
              <Image src={radio3} alt="" />
            </div>
            <h6>ONETIME RADIO</h6>
            <h6>
              <span className="aud__styling">32.12</span>AUD{" "}
              <span className="aud__styling">+7.80</span>
            </h6>
          </div>
          <div>
            <div className="per_revieww">
              <Image src={radio4} alt="" />
            </div>
            <h6>FRESH FM 10.2</h6>
            <h6>
              <span className="aud__styling">32.12</span>AUD{" "}
              <span className="aud__styling">+7.80</span>
            </h6>
          </div>
        </Slider>
      </div>
    );
  }
}
