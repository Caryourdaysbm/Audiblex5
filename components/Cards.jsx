import React, { useState, useEffect } from "react";
// import United from "../images/united.jpg";
import Link from "next/link";
import axios from "axios";

const Country = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v3.1/all")
      .then((res) => {
        console.log(res);
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   {posts.map((post) => (
  //     <li key={post.id}>{post.title}</li>
  //   ))}
  return (
    <>
      {posts.map((post) => (
        <div className="api">
          <div className="eachcard">
            <img src={post.flags.png} />
            <div className="desc">
              <h2>
                Country: <span>{post.name.common}</span>
              </h2>
              <h2>
                Continent: <span>{post.region}</span>
              </h2>
              <h2>
                Population: <span>{post.population.toLocaleString()}</span>
              </h2>
              <h2>
                Capital: <span>{post.capital}</span>
              </h2>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
export default Country;
