import React, { useState, useEffect } from "react";

const Input = () => {
  const [id, setId] = useState(1);

  return (
    <div>
      <div className="container search_region">
        {/* Search input */}
        <div className="search_for">
          <input
            type="text"
            value={id}
            onChange={(e) => setId(e.target.value)}
            placeholder="United States"
          />
        </div>

        {/* Region Input*/}
        <div className="region">
          <select name="countrys" id="">
            <option value="">Africa</option>
            <option value="">Asia</option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
            <option value=""></option>
          </select>
        </div>
      </div>
    </div>
  );
};
export default Input;
