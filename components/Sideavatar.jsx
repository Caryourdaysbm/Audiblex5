import React from "react";

const Sideavatar = (props) => {
  return (
    <div className="illustrate">
      <div>
        <h2>{props.header}</h2>
        <p>{props.paragraph}</p>
        <img src={props.image} alt="" />
      </div>
    </div>
  );
};

export default Sideavatar;
