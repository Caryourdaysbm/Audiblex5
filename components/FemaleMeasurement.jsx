import React from "react";
import Images from "../assets/images/image";

import {
  HOST_URL,
  fetchAPI,
  getCookie,
  reqOptions,
} from "../assets/js/help_func";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useRouter } from "next/router";


const FemaleMeasurement = () => {
  const router = useRouter();
  const { types } = router.query;
  const [chest_burst, setChestBurst] = useState("");
  const [hips, setHips] = useState("");
  const [description, setDescription] = useState("");
  const [wrist, setWrist] = useState("");
  const [job_id, setJob_id] = useState("");
  const [gender, setGender] = useState("FEMALE");
  const [armhole, setArmhole] = useState("");
  const [back, setBack] = useState("");
  const [front, setFront] = useState("");
  const [waist, setWaist] = useState("");
  const [inseam, setInseam] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [outseam, setOutseam] = useState("");
  const [neck, setNeck] = useState("");
  const [shoulders, setShoulders] = useState("");
  const [calf, setCalf] = useState("");
  const [dressLength, setDressLength] = useState("");
  const [thighs, setThigh] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);

  const authToken = getCookie("access");

  const handleJobIdChange = (event) => {
    setJob_id(event.target.value);
  };

  // Reset form function
  const resetForm = () => {
    setChestBurst("");
    setWrist("");
    setArmhole("");
    setHips("");
    setBack("");
    setWaist("");
    setCalf("");
    setFront("");
    setSleeve("");
    setTitle("");
    setOutseam("");
    setInseam("");
    setDressLength("");
    setGender("");
    setNeck("");
    setShoulders("");
    setDescription("");
    setThigh("");
  };

  // FUNCTION TO CREATE A NEW MEASUREMENT
  const createNewMeasurement = async () => {
    try {
      setLoading(true);

      const result = await fetch(
        `${HOST_URL()}/api/v1/measurements/create-measurement/${job_id}/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            neck,
            hips,
            armhole,
            shoulders,
            back,
            front,
            chest_burst,
            waist,
            sleeve,
            title,
            inseam,
            outseam,
            description,
            gender,
            calf,
            dressLength,
            thighs,
            wrist,
          }),
        }
      );

      if (result.ok) {
        router.push("/measurement/all-measurements/");
        // toast.success("measurements have updated successfully!");
        resetForm();
      }
    } catch (error) {
      console.error("Error updating measurements:", error);
      // toast.error("Failed to update measurements");
    } finally {
      setLoading(false);
    }
  };

  // FUNCTION TO FETCH ALL JOBS THAT WAS CREATED
  // useEffect(() => {
  //   if (!data || types) {
  //     let url_params = !types ? "ACTIVE" : types;
  //     const allJobs = async () => {
  //       try {
  //         setLoading(true);

  //         const result = await fetch(
  //           `${HOST_URL()}/api/v1/jobs/customer_jobs/${getCookie(
  //             "u_id"
  //           )}/?project_stage=${url_params}`,
  //           {
  //             method: "GET",
  //             headers: {
  //               "Content-Type": "application/json",
  //               Authorization: `Bearer ${authToken}`,
  //             },
  //           }
  //         );

  //         if (result.ok) {
  //           setJobs(result);
  //         }
  //       } catch (error) {
  //         console.error("Error updating measurements:", error);
  //         // toast.error("Failed to update measurements");
  //       } finally {
  //         setLoading(false);
  //       }
  //     };
  //     allJobs();
  //   }
  // }, [types]);

  // FUNCTION TO FETCH ALL JOBS THAT WAS CREATED
  useEffect(() => {
    if (!data || types) {
      let url_params = !types ? "ACTIVE" : types;

      const requestOptions = reqOptions("GET", null, true);
      let access_url = `${HOST_URL()}/api/v1/jobs/customer_jobs/${getCookie(
        "u_id"
      )}/?project_stage=${url_params}`;
      fetchAPI(setData, access_url, requestOptions, true);
    }
  }, [types]);

  console.log(data);

  return (
    <FemaleMeasurementContainer>
      <section>
        {/* Measurement Statue */}
        <div className="statue">
          <div className="main_obj">
            <img src={Images.avatarF} alt="" />
          </div>

          <div className="demacate">
            <div className="details_m">
              <h4>Measurement Guide</h4>

              <div className="current">
                <h5>Neck</h5>
                <p>
                  Id accumsan suspendisse nec egestas id risus consequat, turpis
                  faucibus. Morbi sapien est.
                </p>
              </div>

              <img src={Images.smile} alt="" />
            </div>
          </div>
        </div>
        <div className="container viral">
          <h2>Vital input form</h2>
          <section>
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  placeholder="Enter Title Of Measurement"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="eachMeasure">
                {data && (
                  <div className="select__div">
                    <select
                      className="select__custom"
                      name="jobs"
                      placeholder="Select Job"
                      onChange={handleJobIdChange}
                    >
                      {data.results.map((option) => (
                        <option key={option.id} value={option.id}>
                          {option.name}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  name="chest_burst"
                  value={chest_burst}
                  onChange={(e) => setChestBurst(e.target.value)}
                  placeholder="Bust"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
              <div className="eachMeasure">
                <input
                  type="text"
                  name="hips"
                  value={hips}
                  onChange={(e) => setHips(e.target.value)}
                  placeholder="Hips"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
            </div>
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  name="back"
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Back"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
              <div className="eachMeasure">
                <input
                  type="text"
                  name="shoulders"
                  value={shoulders}
                  onChange={(e) => setShoulders(e.target.value)}
                  placeholder="Shoulder"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
            </div>

            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  name="sleeve"
                  value={sleeve}
                  onChange={(e) => setSleeve(e.target.value)}
                  placeholder="Sleeve"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
              <div className="eachMeasure">
                <input
                  type="text"
                  name="waist"
                  value={waist}
                  onChange={(e) => setWaist(e.target.value)}
                  placeholder="Waist"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
            </div>
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  name="armhole"
                  value={armhole}
                  onChange={(e) => setArmhole(e.target.value)}
                  placeholder="Armhole"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
              <div className="eachMeasure">
                <input
                  type="text"
                  name="neck"
                  value={neck}
                  onChange={(e) => setNeck(e.target.value)}
                  placeholder="Neck"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
            </div>
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  name="dressLength"
                  value={dressLength}
                  onChange={(e) => setDressLength(e.target.value)}
                  placeholder="Dress Length"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
              <div className="eachMeasure">
                <input
                  type="text"
                  name="outseam"
                  value={outseam}
                  onChange={(e) => setOutseam(e.target.value)}
                  placeholder="Outseam"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
            </div>
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  name="inseam"
                  value={inseam}
                  onChange={(e) => setInseam(e.target.value)}
                  placeholder="Inseam"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
              <div className="eachMeasure">
                <input
                  type="text"
                  name="thighs"
                  value={thighs}
                  onChange={(e) => setThigh(e.target.value)}
                  placeholder="Thigh"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
            </div>
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  name="calf"
                  value={calf}
                  onChange={(e) => setCalf(e.target.value)}
                  placeholder="Calf"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>

              <div className="eachMeasure">
                <input
                  type="text"
                  name="front"
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Front"
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
            </div>
            <textarea
              className="textarea__custom"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id=""
              placeholder="Describe your measurements - please be as detailed as possible:"
            />
            <button className="btn_only" onClick={createNewMeasurement}>
              Submit vital
            </button>
          </section>
        </div>
      </section>
    </FemaleMeasurementContainer>
  );
};

export default FemaleMeasurement;

const FemaleMeasurementContainer = styled.div`
  .textarea__custom {
    margin-bottom: 30px;
  }
  .select__div {
    .select__custom {
      width: 100%;
      font-style: var(--Montserat);
      font-size: 15px;
      color: gray;
    }
  }
`;
