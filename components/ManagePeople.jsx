import React, { useEffect, useState } from "react";
import RequestTable from "./RequestTable";
import {
  fetchAPI,
  getCookie,
  reqOptions,
  HOST_URL,
} from "../assets/js/help_func";
import { useRouter } from "next/router";
import Link from "next/link";

const ManageRequest = () => {
  const router = useRouter();
  const { types } = router.query;

  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [status, setStatus] = useState();
  const [activeIndex, setActiveIndex] = useState(1);
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";

  useEffect(() => {
    if (!data || types) {
      let url_params = !types ? "ACTIVE" : types;

      const requestOptions = reqOptions("GET", null, true);
      let access_url = `${HOST_URL()}/api/v1/jobs/customer_jobs/${getCookie(
        "u_id"
      )}/?project_stage=${url_params}`;
      fetchAPI(setData, access_url, requestOptions, true);
    }
  }, [types]);

  //   The request that runs to verify the payment
  useEffect(() => {
    if (!data || types) {
      const urlToken = getCookie("payment_id");
      console.log(urlToken);
      const requestOptions = reqOptions("POST", null, true);
      let access_url = `${HOST_URL()}/api/v1/payments/verify/${urlToken}/`;
      fetchAPI(setData, access_url, requestOptions, true);
    }
  }, [types]);

  return (
    <div className="container">
      <div className="manage_request">
        <h1>Manage Request</h1>

        <div className="tabs flex_1" id="activetable">
          <button
            className={`tab ${(types === "ACTIVE" || !types) && "active"}`}
            onClick={() => router.push("?types=ACTIVE")}
          >
            Active
          </button>
          <button
            className={`tab ${types === "PROCESSING" && "active"}`}
            onClick={() => router.push("?types=PROCESSING")}
          >
            Processing
          </button>
          <button
            className={`tab ${types === "COMPLETED" && "active"}`}
            onClick={() => router.push("?types=COMPLETED")}
          >
            Completed
          </button>
          <button
            className={`tab ${types === "PAUSED" && "active"}`}
            onClick={() => router.push("?types=PAUSED")}
          >
            Paused
          </button>
        </div>

        <div className="tab_result">
          <div>{data && <RequestTable data={data} />}</div>
        </div>
        <button
          className="mt-5 default-btn"
          onClick={() => router.push("/jobs/create-job")}
        >
          Create New Job
        </button>
      </div>
    </div>
  );
};

export default ManageRequest;
