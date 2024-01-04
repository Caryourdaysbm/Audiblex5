import React from "react";
import Link from "next/link";

const JobPosts = () => {
  return (
    <div className="container">
      <div className="job_p">
        <ul className="breadcrumb">
          <li>
            <Link href="/manage-requests">Manage request</Link>
          </li>
          <li>View offers</li>
        </ul>

        <h4>View Offers (10 Offers)</h4>

        <div className="my_job_post">
          <h3>My Job post</h3>
          <p>
            I’m looking for a Creator to help with my best man suit for a
            friends
          </p>

          <div className="dts_info">
            <p>Lagos, Nigeria</p>
            <p>24 Hours Delivery</p>
            <p>Budget: $300</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPosts;
