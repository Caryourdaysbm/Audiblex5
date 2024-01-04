import React from "react";
import Images from "../assets/images/image";

const FindJobBanner = () => {
  return (
    <section className="container">
      <div className="db_banner" id="jobs_banner">
        <h2>
          Find the best job for you within the largest marketplace in the world.
        </h2>

        <img src={Images.AssitantBot} alt="" />
      </div>
    </section>
  );
};
export default FindJobBanner;
