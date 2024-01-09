import React from "react";
import PropTypes from "prop-types";
import Image from "next/image";

const CenteredCard = ({ imageSrc, firstText, secondText }) => {
  return (
    <div className="centered-card">
      <div className="centered-card-image">
      <div className="centered-card flex flex-col items-center gap-0 justify-center border border-black p-4"> {/* Add Tailwind CSS classes for border and padding */}
        <Image
          src={imageSrc}
          alt=""
          width={15} // Set the width as needed
          height={15} // Set the height as needed
          style={{ maxWidth: "10%", height: "auto" }} // Set max-width and height:auto
        />
     
      <div className="centered-card-text">
        <p>{firstText}</p>
        <p>{secondText}</p>
        </div>
      </div>
      </div>
    </div>
  );
};

CenteredCard.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  firstText: PropTypes.string.isRequired,
  secondText: PropTypes.string.isRequired,
};

export default CenteredCard;
