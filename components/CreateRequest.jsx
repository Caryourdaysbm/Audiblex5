import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";

import Images from "../assets/images/image";
import {
  fetchAPI,
  getCookie,
  reqOptions,
  HOST_URL,
  ApiCall,
} from "../assets/js/help_func";
import Checkbox from "./forms/CheckBox";

const CreateRequest = () => {
  const router = useRouter();

  const [categories, setCategories] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [status, setStatus] = useState();
  const [showPaypal, setShowPaypal] = useState(false); // State to manage the visibility of ReactPaypal

  useEffect(() => {
    if (categories === null) {
      const requestOptions = reqOptions("GET", null);
      let access_url = `${HOST_URL()}/api/v1/categorys/category_list/`;
      fetchAPI(setCategories, access_url, requestOptions, true);
    }
    if (status === 201) {
        router.push("/jobs/requests/");
    }
  }, [status]);

 

  //   FUNCTION TO CREATE A NEW JOB
  const handleSubmit = (e) => {
    e.preventDefault();
    let requestOptions = reqOptions("post", new FormData(e.target), true);
    fetchAPI(
      setData,
      HOST_URL() + "/api/v1/jobs/create/",
      requestOptions,
      true,
      setStatus,
      setError,
    ); 
  };



  
  return (
    <ReactAddJob
      className="container transformation"
      forward={Images.forward_arrow}
    >
      <div className="b_heading">
        <ul className="breadcrumb">
          <li>
            <Link href={"/accounts/" + getCookie("u_id")}>Dashboard</Link>
          </li>
          <li>Create Job</li>
        </ul>
      </div>

      <form onSubmit={handleSubmit}>
        <h5>What Service Are You Looking For?</h5>
        <p className="warning-message">
          Request will not be completed until payment has been made.
        </p>

        <div className="input_field">
          <input type="text" name="name" placeholder="Job Name" />
        </div>
        <textarea
          name="description"
          id=""
          placeholder="Describe the service you're looking to purchase - please be as detailed as possible:"
        />
        <div className="input_field">
          <input
            type="number"
            name="budget"
            placeholder="What is your budget for this service? (eg. $1000)"
          />
        </div>
        <div className="input_field">
          <input type="number" name="duration" placeholder="2" />
          <p>Choose number of weeks. </p>
        </div>

        <div className="input_field">
          <input
            type="text"
            name="location"
            placeholder="Enter your address..."
          />
          <p>Where you want it delivered. </p>
        </div>

        <div className="input_field">
          <h4>Select categories</h4>
          {categories &&
            categories?.results.map((option, index) => {
              return (
                <Checkbox
                  names="categorys"
                  text={option.name}
                  values={option.id}
                  keys={index}
                />
              );
            })}
        </div>

        <button className="native-btn">Post Request</button>
      </form>
    </ReactAddJob>
  );
};

export default CreateRequest;

const ReactAddJob = styled.div`
  ul.breadcrumb li + li:before {
    content: url(${(props) => props.forward});
  }
  .input_field {
    margin-bottom: 20px;
    margin-top: 20px;
    h4 {
      margin-top: 50px;
    }
  }
  .select_case {
    padding-right: 10px;
    max-width: 250px;
  }
  .warning-message {
    font-size: 12px;
    color: red;
  }
`;
