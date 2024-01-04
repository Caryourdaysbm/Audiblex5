import React from "react";

// Note: Component for Blog Details Page
// 1. Dynamically change details of each blog respectively
const Categories = (props) => {
  if (props.categories[0].name) {
    return (
      <>
        {props.categories.forEach((cat, index)=>{
            <span className="label_tags" key={index} >
            {cat.name}
            </span>
        })}
    </>    
    );
  }
  else{
    return(
      <></>
    )
  }
};

export default Categories;
