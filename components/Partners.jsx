import React from "react";
import Images from "../assets/images/image";

const Partners = () => {
  return (
    <div className="container" id="partners">
      {/* <marquee direction="left" behavior="scroll"> */}
      <div className="magic_partners container">
        <img src={Images.ariga} alt="" />
        <img src={Images.mobnia} alt="" />
        <img src={Images.flutterwave} alt="" />
        {/* <img src={Images.techpoint} alt="" className="tech_point" /> */}
        <img src={Images.ariga} alt="" />
        <img src={Images.fundall} alt="" />
      </div>
      {/* </marquee> */}
    </div>
  );
};
export default Partners;
