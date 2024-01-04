import React, { useState } from "react";
import Images from "../assets/images/image";
const AddTeam = () => {
  const [showOverlay, setShowOverlay] = useState("add_new_member");
  const [close, setClose] = useState("close_btn");
  const OverlayForm = () => {
    showOverlay === "add_new_member"
      ? setShowOverlay("add_new_member show_overlay")
      : setShowOverlay("add_new_member");

    close === "close_btn" ? setClose("close_btn") : setClose("close_btn");
  };
  return (
    <section className="our_stars container">
      <h3 className="Majorheading align_txt mb-1">Meet our Stars</h3>
      <p className="align_txt heading_p">
        Quis sagittis phasellus tristique scelerisque vel viverra et pulvinar
        purus. Dolor pretium vulputate purus, libero enim in enim.{" "}
      </p>

      <div className="the_stars">
        <div className="p_star align_text">
          <img src={Images.star1} alt="" />
          <h4>Star Name</h4>
          <p>Stars Position</p>
        </div>
        <div className="p_star align_text">
          <button className="btn_only" onClick={OverlayForm}>
            +
          </button>
          <h4>Star Name</h4>
          <p>Stars Position</p>
        </div>
      </div>

      <div className={showOverlay}>
        <div className="member_form">
          <div className="easy_apply">
            <h5>Easy Apply</h5>
            <p>
              Choose an option to autocomplete your application. You can still
              fill your profile manually.
            </p>
            <img
              src={Images.close}
              alt="close"
              onClick={OverlayForm}
              className={close}
            />
          </div>
          <form action="">
            <div className="apply_with">
              <div className="drag_drop">
                <input type="file" id="drag_drop" />
                <label htmlFor="drag_drop">
                  <b> Browse resume </b>or drop it here
                </label>
              </div>
              <div className="double_btn">
                <a href="">
                  <button>Apply with Linkedin</button>
                </a>
                <a href="">
                  <button>Apply with Indeed</button>
                </a>
              </div>
            </div>

            <div className="personal_info">
              <img src={Images.normalavatar} alt="" />
              <div className="lapping_form">
                <input type="text" placeholder="First Name *" />
                <input type="text" placeholder="Last Name *" />
              </div>
              <div className="lapping_form">
                <input type="text" placeholder="Email * " />
                <input type="text" placeholder="Nationality *" />
              </div>
              <div className="lapping_form">
                <input type="text" placeholder="County of resience *" />
                <input type="text" placeholder="08123456572" />
              </div>
              <div className="lapping_form">
                <input type="text" placeholder="Home of Resident" />
                {/* <input type="text" placeholder="812 345 6572" /> */}
              </div>
            </div>

            {/* Experience */}
            <div className="experience">
              <div className="experience_head">
                <h5>Experience</h5>
                <div className="btn_only add_experience"> + Add</div>
              </div>
              {/* Exp.... */}
              <div className="experience_form slide-bottom">
                <img src={Images.Experience} alt="" />
                <div className="inner_exp">
                  <div className="lapping_form">
                    <input type="text" placeholder="First Name *" />
                    <input type="text" placeholder="Last Name *" />
                  </div>
                  <div className="one_input">
                    <input type="text" placeholder="Conpany Location *" />
                    <textarea
                      name=""
                      id=""
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <div className="lapping_form">
                    <input type="date" />
                    <input type="date" />
                  </div>
                  <div className="check_parent">
                    <label className="checkbox">
                      I currently attend
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="experience ">
              <div className="experience_head">
                <h5>Education</h5>
                <div className="btn_only add_experience"> + Add</div>
              </div>
              {/* Exp.... */}
              <div className="experience_form slide-bottom">
                <img src={Images.Experience} alt="" />
                <div className="inner_exp">
                  <div className="lapping_form">
                    <input type="text" placeholder="Institution *" />
                    <input type="text" placeholder="Major  " />
                  </div>
                  <div className="one_input">
                    <input type="text" placeholder="Degree" />
                    <textarea
                      name=""
                      id=""
                      placeholder="Description"
                    ></textarea>
                  </div>
                  <div className="lapping_form">
                    <input type="date" />
                    <input type="date" />
                  </div>
                  <div className="check_parent">
                    <label className="checkbox">
                      I currently attend
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="experience">
              <div className="experience_head">
                <h5>Social Links</h5>
                {/* <div className="btn_only add_experience"> + Add</div> */}
              </div>
              <div className="div_this">
                <div className="lapping_form">
                  <input type="text" placeholder="Linkedin" />
                  <input type="text" placeholder="Website" />
                </div>
                <div className="lapping_form">
                  <input type="text" placeholder="Facebook" />
                  <input type="text" placeholder="Twitter" />
                </div>
              </div>
            </div>

            <div className="experience">
              <div className="experience_head">
                <h5>Resume *</h5>
                {/* <div className="btn_only add_experience"> + Add</div> */}
              </div>
              <div className="drag_drop">
                <input type="file" id="drag_drop" />
                <label htmlFor="drag_drop">
                  <b> Browse resume </b>or drop it here
                </label>
              </div>
            </div>
            <div className="hire_boss">
              <h5>Message to Hiring manager</h5>
              <textarea
                name=""
                id=""
                cols="30"
                rows="10"
                placeholder="Your Message"
              ></textarea>

              <div className="instant_apply">
                <div className="urgent_">
                  <button type="submit" className="native-btn">
                    Apply
                  </button>
                  <div className="outline_btn" onClick={OverlayForm}>
                    Cancel
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
export default AddTeam;
