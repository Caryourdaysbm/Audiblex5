import React, { useState, useEffect } from "react";
// import BannerImg from "../../../images/2D1.png";
import { autocomplete } from "../../../assets/js/autocomplete";
import { customData, PageHeroBanner } from "../../../assets/js/help_func";

function SignUp({ formData, setFormData }) {
  // useEffect(() => {
  //   // auto complete
  //   if (document.getElementById("id_country")) {
  //     autocomplete(
  //       document.getElementById("id_country"),
  //       customData["country_list"]
  //     );
  //   }
  //   PageHeroBanner("PageHeroBannerTag");
  // });
  return (
    <>
      <div className="other-info-container">
        <input
          type="text"
          placeholder="Business Name"
          value={formData.business_name}
          name="business_name"
          onChange={(e) => {
            setFormData({ ...formData, business_name: e.target.value });
          }}
          required
        />

        <textarea
          id=""
          placeholder="Description"
          value={formData.description}
          name="description"
          onChange={(e) => {
            setFormData({ ...formData, description: e.target.value });
          }}
          required
        ></textarea>

        <div className="city_country">
          <input
            type="text"
            id="id_country"
            placeholder="Country"
            className="suggest"
            value={formData.country}
            name="country"
            onChange={(e) => {
              setFormData({ ...formData, country: e.target.value });
            }}
            required
          />
          <input
            type="text"
            placeholder="City"
            value={formData.city}
            name="city"
            onChange={(e) => {
              setFormData({ ...formData, city: e.target.value });
            }}
            required
          />
        </div>
      </div>
    </>
  );
}

export default SignUp;
