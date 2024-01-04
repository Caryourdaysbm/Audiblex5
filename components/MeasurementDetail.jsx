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
import Image from "next/image";
import DeleteConfirmationModal from "./modals/DeleteConfirmation";

const MeasurementDetail = () => {
  const router = useRouter();
  const { types } = router.query;
  const [head, setHead] = useState("");
  const [chest_burst, setChestBurst] = useState("");
  const [job_name, setJobName] = useState("");
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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteModal(true);
  };

  const handleDeleteCancelled = () => {
    setShowDeleteModal(false);
  };

  // FUNCTION TO DELETE A MEASUREMENT
  const handleDeleteConfirmed = async () => {
    try {
      // Implement your delete logic here
      const result = await fetch(
        `${HOST_URL()}/api/v1/measurements/${measurementId}/`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (result.ok) {
        // toast.success("measurement deleted successfully!");
        resetForm();
        router.push("/measurement/all-measurements/");
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
      // toast.error("Failed to delete measurement");
    } finally {
      setLoading(false);
      console.log("Item deleted!");
      setShowDeleteModal(false);
    }
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
  const measurementId = getCookie("job_id");

  // FUNCTION TO UPDATE A MEASUREMENT
  const updateMeasurement = async () => {
    try {
      setLoading(true);

      const result = await fetch(
        `${HOST_URL()}/api/v1/measurements/${measurementId}/`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
          body: JSON.stringify({
            neck: neck,
            shoulders: shoulders,
            description: description,
            gender: gender,
            thighs: thighs,
            waist: waist,
            wrist: wrist,
            title: title,
            chest_burst: chest_burst,
            arm: arm,
            sleeve: sleeve,
            inseam: inseam,
            outseam: outseam,
          }),
        }
      );

      if (result.ok) {
        // toast.success("measurement deleted successfully!");
        resetForm();
        router.push("/measurement/measurement-details/");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      // toast.error("Failed to update measurement");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    measurement();
  }, []);

  //   FETCH A MESUREMENT DETAIL
  const measurement = async () => {
    try {
      const token = getCookie("access");

      // Initiate the payment
      const measurementResult = await fetch(
        `${HOST_URL()}/api/v1/measurements/${measurementId}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the payment initiation was successful
      if (measurementResult.status === 200) {
        const data = await measurementResult.json();
        console.log(data.title);
        setHead(data.head);
        setTitle(data.title);
        setChestBurst(data.chest_burst);
        setInseam(data.inseam);
        setWaist(data.waist);
        setOutseam(data.outseam);
        setNeck(data.neck);
        setSleeve(data.sleeve);
        setTrouserLenth(data.trouserLength);
        setThigh(data.thighs);
        setShoulders(data.shoulders);
        setJobName(data.job_name);
        setDescription(data.description);
        setGender(data.gender);
      } else {
        console.log("failed to");
      }
    } catch (error) {
      console.log("failed");
    }
  };

  return (
    <MeasurementContainer>
      <section>
        <div className="container viral">
          <h2>Vital input form</h2>
          <section>
            <div className="boxMeasure">
              <div className="eachMeasure">
              <p className="label__custom">Title</p>
                <input
                  type="text"
                  placeholder="Enter Title Of Measurement"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="eachMeasure">
              <p className="label__custom">Job Name</p>
                <input
                  type="text"
                  value={job_name}
                  onChange={(e) => setJobName(e.target.value)}
                />
              </div>
              {/* <div className="eachMeasure">
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
          </div> */}
            </div>
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <p className="label__custom">Head</p>
                <input
                  type="text"
                  name="head"
                  value={head}
                  onChange={(e) => setHead(e.target.value)}
                />
                <select name="country" id="country">
                  <option value="US">CM</option>
                  <option value="UK">REM</option>
                  <option value="ID">UNIT</option>
                </select>
              </div>
              <div className="eachMeasure">
                <p className="label__custom">Gender</p>

                <input
                  type="text"
                  name="gender"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                />
              </div>
            </div>
            {/* MEASURE ! */}
            <div className="boxMeasure">
              <div className="eachMeasure">
                <p className="label__custom">Chest</p>
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
                <p className="label__custom">Shoulders</p>
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
                <p className="label__custom">Waist</p>
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
                <p className="label__custom">Thighs</p>
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
                <p className="label__custom">Wrist</p>
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
                <p className="label__custom">Neck</p>
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
                <p className="label__custom">Arm</p>
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
                <p className="label__custom">Inseam</p>
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
              <p className="label__custom">Outseam</p>
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
              <p className="label__custom">Sleeve</p>
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
            <div className="vitals__btn">
              <button className="btn_only" onClick={updateMeasurement}>
                Update vital
              </button>
              {/* <button className="btn_only red" onClick={deleteMeasurement}> */}
              <button className="btn_only red" onClick={handleDeleteClick}>
                <Image src={Images.delete} width={24} height={24} /> Delete
                vital
              </button>
              {/* Delete Confirmation Modal */}
              <div className="chakra__modal__custom">
                <DeleteConfirmationModal
                  isOpen={showDeleteModal}
                  onClose={handleDeleteCancelled}
                  onDelete={handleDeleteConfirmed}
                />
              </div>
            </div>
          </section>
        </div>
      </section>
    </MeasurementContainer>
  );
};

export default MeasurementDetail;

const MeasurementContainer = styled.div`
  .textarea__custom {
    margin-bottom: 30px;
  }
  .css-pv22qu {
    margin-top: 100px;
  }
  .select__div {
    .select__custom {
      width: 100%;
      font-style: var(--Montserat);
      font-size: 15px;
      color: gray;
    }
  }
  button {
    img {
      margin-right: 10px;
      width: 22px;
    }
  }

  .vitals__btn {
    display: flex;
    align-items: center;
    // justify-content: space-evenly;
  }

  .red {
    color: red;
  }

  .label__custom {
    font-size: 14px;
    font-weight: 500;
  }
`;
