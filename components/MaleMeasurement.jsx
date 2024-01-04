import React, { useState, useEffect } from "react";
import Images from "../assets/images/image";
import {
  HOST_URL,
  fetchAPI,
  getCookie,
  reqOptions,
} from "../assets/js/help_func";
import { useRouter } from "next/router";
import styled from "styled-components";

const MaleMeasurement = () => {
  const router = useRouter();
  const { types } = router.query;
  const [head, setHead] = useState("");
  const [chest_burst, setChestBurst] = useState("");
  const [job_id, setJob_id] = useState("");
  const [description, setDescription] = useState("");
  const [wrist, setWrist] = useState("");
  const [inseam, setInseam] = useState("");
  const [sleeve, setSleeve] = useState("");
  const [outseam, setOutseam] = useState("");
  const [waist, setWaist] = useState("");
  const [gender, setGender] = useState("MALE");
  const [arm, setArm] = useState("");
  const [neck, setNeck] = useState("");
  const [shoulders, setShoulders] = useState("");
  const [thighs, setThigh] = useState("");
  const [trouserLength, setTrouserLenth] = useState("");
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const [title, setTitle] = useState(null);

  const handleJobIdChange = (event) => {
    setJob_id(event.target.value);
  };

  // Reset form function
  const resetForm = () => {
    setHead("");
    setChestBurst("");
    setDescription("");
    setWrist("");
    setWaist("");
    setGender("MALE");
    setArm("");
    setNeck("");
    setShoulders("");
    setThigh("");
    setTrouserLenth("");
    setLoading(false);
    setTitle("");
    setSleeve("");
    setOutseam("");
    setInseam("");
  };

  const authToken = getCookie("access");

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
            shoulders,
            description,
            trouserLength,
            gender,
            thighs,
            waist,
            wrist,
            title,
            chest_burst,
            arm,
            sleeve,
            inseam,
            outseam,
          }),
        }
      );

      if (result.ok) {
        // toast.success("measurement updated successfully!");
        resetForm();
        router.push("/measurement/all-measurements/");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // toast.error("Failed to update measurement");
    } finally {
      setLoading(false);
    }
  };

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

  return (
    <FemaleMeasurementContainer>
      <section>
        {/* Measurement Statue */}
        <div className="statue">
          <div className="main_obj">
            <img src={Images.avatarM} alt="" />
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

              <img src={Images.ReadBlog} alt="" />
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
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <input
                  type="text"
                  name="head"
                  value={head}
                  onChange={(e) => setHead(e.target.value)}
                  placeholder="Head"
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
                  name="chest_burst"
                  value={chest_burst}
                  onChange={(e) => setChestBurst(e.target.value)}
                  placeholder="Chest"
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
                  name="wrist"
                  value={wrist}
                  onChange={(e) => setWrist(e.target.value)}
                  placeholder="Wrist"
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
                  name="trouserLength"
                  value={trouserLength}
                  onChange={(e) => setTrouserLenth(e.target.value)}
                  placeholder="Trouser Length"
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
                  name="arm"
                  value={arm}
                  onChange={(e) => setArm(e.target.value)}
                  placeholder="Arm"
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
            </div>
            <div className="boxMeasure">
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
            </div>
            <textarea
              className="textarea__custom"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id=""
              placeholder="Describe your measurements - please be as detailed as possible:"
            />

            <button onClick={createNewMeasurement} className="btn_only">
              Submit vital
            </button>
          </section>
        </div>
      </section>
    </FemaleMeasurementContainer>
  );
};

export default MaleMeasurement;

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
