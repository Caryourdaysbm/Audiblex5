import Head from "next/head";
import { React, ChangeEventHandler, useEffect, useState } from "react";
import Images from "../assets/images/image";
import ClientOnly from "./message/ClientOnly";


const DarkMode = (props) => {
  const [img, setImg] = useState();

  

  useEffect(() => {
    if ( localStorage.getItem("them_img") === null) {
      setImg(Images.moon)
    }
    else{
      setImg(localStorage.getItem("them_img"))
    }

    document.documentElement.setAttribute(
      "dark-theme",
      localStorage.getItem("theme") === null
        ? "light"
        : localStorage.getItem("theme")
    );

    
  });

  const handleToggle = (e) => {
    if (typeof document !== 'undefined') {
      if (
        e.target.checked &&
        document.documentElement.getAttribute("dark-theme") === "light"
      ) {
        localStorage.setItem("theme", "dark");
        localStorage.setItem("them_img", Images.sun);
        setImg(Images.sun);
      } else {
        localStorage.setItem("theme", "light");
        localStorage.setItem("them_img", Images.moon);
        setImg(Images.moon);
      }
      document.documentElement.setAttribute(
        "dark-theme",
        localStorage.getItem("theme")
      );
    }
  };
  return (
    <>
    <Head>
      <link href="../styles/control.css" rel="stylesheet" />
    </Head>
      <div className="wrap_moon">
        <input
          type="checkbox"
          className="tg_omori toggle_it"
          id="toggleTheme"
          onChange={handleToggle}
          // onMouseMove={ToggleTheme}
          // defaultChecked
        />
        <img src={img} alt="" id="ChangeThis" className="toggle_it" />
      </div>
    </>
  );
};

export default DarkMode;
