import React, { useState } from "react";
import Droplet from "../components/SAccount";

const Nationality = () => {
  const [selected, setSelected] = useState("Choose");
  return <Droplet selected={selected} setSelected={setSelected} />;
};

export default Nationality;
