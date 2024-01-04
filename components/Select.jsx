import React from "react";
import Drop from "./Drop";

const SelectDropdown = () => {
  return (
    <>
      <div className="custom-select">
        <Drop />
        <select>
          <option value="1">This Week</option>
          <option value="2">Last week</option>
          <option value="3">2 weeks ago</option>
        </select>
      </div>
    </>
  );
};

export default SelectDropdown;
