import React from "react";
import Images from "../assets/images/image";

const Choose = () => {
  return (
    <section className="container" id="fog_bg">
      <div className="diversion">
        <div className="choose">
          <div className="top_txt">
            <img src={Images.easy} alt="" />
            <h5>We’re easy to work with.</h5>
            <p>
              We take the work seriously, but not ourselves. We’re not prickly,
              precious or pretentious.
            </p>
          </div>
          <img src={Images.smile} alt="" />
        </div>
        <div className="choose force_me">
          <div className="top_txt">
            <img src={Images.industry} alt="" />
            <h5>Industry First</h5>
            <p>
              Before we start writing, we think about your brand and value
              proposition.
            </p>
          </div>
          <img src={Images.YouFirst} alt="" />
        </div>
        <div className="choose">
          <div className="top_txt">
            <img src={Images.focus} alt="" />
            <h5>Because we focus on results. </h5>
            <p>
              For us, it’s all about what adds value for you and your business.
              Above all, we want our words to work for you.
            </p>
          </div>
          <img src={Images.CameraLens} alt="" />
        </div>
      </div>
    </section>
  );
};
export default Choose;
