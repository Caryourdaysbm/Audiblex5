import React, { useState, useEffect } from "react";
import Link from "next/link";
import DummyData from "../json/samples.json";
import Images from "../assets/images/image";
import axios from "axios";

const Catelogue = () => {
  // const [posts, setPosts] = useState([]);

  // useEffect(() => {
  //   axios
  //     .get("https://restcountries.com/v3.1/all")
  //     .then((res) => {
  //       console.log(res);
  //       setPosts(res.data);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, []);
  return (
    <>
      <section className="container">
        <div>
          <h3 className="blog_head mt-7">Cameron Williamson Catalogue</h3>
        </div>
        <div className="card_flex">
          {DummyData &&
            DummyData.map((catelogue) => {
              return (
                <div className="each_card" key={catelogue.id}>
                  <Link href="/catelogue">
                    <div className="each_catelogue">
                      <img src={catelogue.jpg} alt="Each Catelogue" />
                      <div className="catelogue_desc">
                        <h3>{catelogue.title}</h3>
                        <p>
                          <span>{catelogue.number}</span> Collections
                        </p>
                      </div>
                    </div>
                  </Link>
                </div>
              );
            })}
        </div>
      </section>
    </>
  );
};
export default Catelogue;
