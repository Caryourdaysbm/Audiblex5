import React from "react";
import Image from "../assets/images/image";

// Note: This is Account Notification Component ...
// 1. Security alert bell
// 2. Two - factor Authentication
// 3. Set password
// 4. Detect Connected Devices

const Notification = () => {
  return (
    <>
      <div className="acct_settings">
        <div className="txt-notification">
          <h4 className="mb-1">Notification</h4>
          <p>
            For important updates regarding your account activities, You can
            always disable them at anytime.
          </p>
          <h4 className="mt-4 mb-1">General notifications</h4>
          <p>
            Select when you’ll be notified when the following changes occur.
          </p>
        </div>
        <form action="">
          <div className="p_bells">
            <h5>New Project Alerts</h5>

            <div className="box">
              <label>
                <input type="radio" name="new_projects" />
                <span>None</span>
              </label>
              <label>
                <input type="radio" name="new_projects" />
                <span>In-app</span>
              </label>
              <label>
                <input type="radio" name="new_projects" />
                <span>Email</span>
              </label>
            </div>
          </div>
          <div className="p_bells">
            <h5>New Project Alerts</h5>

            <div className="box">
              <label>
                <input type="radio" name="new_projects" />
                <span>None</span>
              </label>
              <label>
                <input type="radio" name="new_projects" />
                <span>In-app</span>
              </label>
              <label>
                <input type="radio" name="new_projects" />
                <span>Email</span>
              </label>
            </div>
          </div>
          <div className="p_bells">
            <h5>New Project Alerts</h5>

            <div className="box">
              <label>
                <input type="radio" name="new_projects" />
                <span>None</span>
              </label>
              <label>
                <input type="radio" name="new_projects" />
                <span>In-app</span>
              </label>
              <label>
                <input type="radio" name="new_projects" />
                <span>Email</span>
              </label>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default Notification;
