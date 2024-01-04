import React, { useState } from "react";
import styled from "styled-components";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";
import MeasurementDetail from "../../components/MeasurementDetail";
import { useRouter } from "next/router";

const Measurement = () => {
  const router = useRouter();
  const { jobId } = router.query;


  //  const [isMale, setIsMale] = useState(false);
  return (
    <MeasurementPage className="">
      <PrimaryNavbar />
      <section className="container">
        <div className="measure_heading ">
          <h1>Measurement Details</h1>
          <p>
            We designed this process to help organize all your measurement
            within a single database.{" "}
          </p>
          {/* <div className="switch">
            <p className="female">Female</p>
            <input
              type="checkbox"
              id="switch"
              checked={isMale}
              onChange={() => setIsMale(!isMale)}
            />

            <label for="switch">Toggle</label>
            <p className="male">Male</p>
          </div> */}
        </div>
      </section>

      {/* {isMale ? <FemaleMeasurementDetail /> : <MaleMeasurementDetail />} */}
      <MeasurementDetail />
    </MeasurementPage>
  );
};

export default Measurement;

let MeasurementPage = styled.section`
  @media (min-width: 769px) {
    .statue {
      display: flex;
      justify-content: flex-end;
      .main_obj,
      .demacate {
        width: 45%;
      }
      .demacate {
        margin-top: 80px;
      }
    }
  }
  @media (min-width: 700px) {
    .boxMeasure {
      display: flex;
      justify-content: space-between;
    }
    .eachMeasure {
      width: 48%;
    }
  }
  .eachMeasure {
    position: relative;
    margin-bottom: 24px;
    label {
      margin-top: 1.5em;
      margin-bottom: 0.5em;
      font-weight: bold;
      font-size: 1.2em;
    }

    select {
      padding: 10px;
      width: 80px;
      border-radius: 0.2em;
      border: 1px solid #acacac;
      color: #181820;
      position: absolute;
      right: 0;
      height: 50px;
      background-color: rgba(244, 244, 244, 0.9);
      border-radius: 0px 5px 5px 0px;
      outline: none;
      appearance: none;
      -webkit-appearance: none;
      -moz-appearance: none;
      -ms-appearance: none;

      background: url("https://cdn1.iconfinder.com/data/icons/arrows-vol-1-4/24/dropdown_arrow-512.png");
      background-repeat: no-repeat;
      background-size: 15px 15px;
      background-position: right;
      background-origin: content-box;
    }
  }
  .viral {
    margin-top: 80px;
    margin-bottom: 80px;
    max-width: 990px;
    h2 {
      font-weight: 600;
      font-size: 25px;
      line-height: 30px;
      text-align: center;
    }
  }
  .details_m {
    max-width: 300px;
    border: 1px solid rgba(44, 51, 58, 0.2);
    border-radius: 5px;
    margin: 30px auto;
    h4 {
      padding: 10px;
      background: #e1e1e1;
      border-radius: 5px 5px 0px 0px;
    }
    .current {
      padding: 15px;
      h5 {
        margin: 0;
      }
    }
  }
  .demacate {
    img {
      height: 156px;
      object-fit: cover;
    }
  }
  .female {
    position: absolute;
    bottom:-10px;
    right: 10px;
  }
  .male {
    position: absolute;
    bottom: -10px;
    left: 20px;
  }
  .measure_heading {
    max-width: 590px;
    margin: 0 auto;
    margin-top: 120px;
    h1 {
      font-weight: 600;
      font-size: 28px;
      text-align: center;
      line-height: 34px;
    }
    p {
      text-align: center;
    }
  }
  .statue {
    .main_obj {
      img {
        height: 500px;
        width: 200px;
        margin-top: 50px;
        object-fit: contain;
      }
    }
    .main_obj {
      text-align: center;
    }
  }
  .switch {
    position: relative;
    max-width: 200px;
    margin: 0 auto;
    input[type="checkbox"] {
      height: 0;
      width: 0;
      visibility: hidden;
    }

    label {
      cursor: pointer;
      text-indent: -9999px;
      width: 48px;
      height: 24px;
      margin: 0 auto;
      background: grey;
      display: block;
      border-radius: 100px;
      position: relative;
    }

    label:after {
      content: "";
      position: absolute;
      top: 4px;
      left: 5px;
      width: 16px;
      height: 16px;
      background: var(--White);
      border-radius: 90px;
      transition: 0.3s;
    }

    input:checked + label {
      background: var(--Main-Gradient);
    }

    input:checked + label:after {
      left: calc(100% - 5px);
      transform: translateX(-100%);
    }

    label:active:after {
      // width: 130px;
    }
  }
`;
