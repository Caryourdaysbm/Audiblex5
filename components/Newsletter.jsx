import React from "react";
import {
  fetchAPI,
  spinBtn,
  handleError,
  setCookie,
  HOST_URL,
} from "../assets/js/help_func";

const Newsletter = () => {
  const postData = (form) => {
    // spinBtn(form, 'inline-block', true) // spin button: parameter >> form, display and status

    const formData = new FormData(form);

    // get assessment from db
    const requestOptions = {
      method: "POST",
      body: formData,
    };

    fetchAPI(this, HOST_URL() + "/auth/newsletter/", requestOptions);
  };
  return (
    <section className="newsletter_s">
      <div className="subscribe">
        <h2>JOIN OUR COMMUNITY</h2>
        <p>Join audiblex taking a look at what is happening on the platform </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            postData(e.target);
          }}
        >
          <input type="email" placeholder="Email address" />
          <button type="submit" className="native-btn">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};
export default Newsletter;
