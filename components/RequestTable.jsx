import Link from "next/link";
import Images from "../assets/images/image";
import Image from "next/image";
import {
  fetchAPI,
  getCookie,
  reqOptions,
  HOST_URL,
  setCookie,
} from "../assets/js/help_func";
import DeleteConfirmationModal from "./message/DeleteConfirmationModal";
import { useEffect, useState } from "react";
import styled from "styled-components";
import PayPalModal from "./modals/PayPalModal";
import { useRouter } from "next/router";

const RequestTable = ({ data }) => {
  const router = useRouter();
  const [items, setItems] = useState();
  const [showDelete, setShowDelete] = useState();
  const [update, setUpdate] = useState();
  const [objKey, setObjKey] = useState();
  const dateOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  //   FUNCTION TO DELETE A JOB
  const handleDelete = (indexToDelete, option) => {
    const newItems = items.filter((item, index) => index !== indexToDelete);
    setShowDelete(option);
    setItems(newItems);
  };

  // FUNCTION TO INITIATE PAYMENT
  const initiatePayment = async (option) => {
    try {
      const token = getCookie("access");

      // Initiate the payment
      const paymentResult = await fetch(
        `${HOST_URL()}/api/v1/payments/make/${option.id}/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the payment initiation was successful
      if (!paymentResult.ok) {
        console.error("Payment initiation failed");
        // Handle initiation failure
        return null;
      }

      // Parse the JSON response
      const paymentJson = await paymentResult.json();

      // Access the href value from the response
      const hrefValue = paymentJson.href;
      const paymentId = paymentJson.id;
      setCookie("payment_id", paymentId);

      console.log("Payment initiation successful");
      return { hrefValue, paymentId };
    } catch (error) {
      console.error("Error initiating payment:", error);
      return null;
    }
  };

  //   FUNCTION THAT PAYS FOR A JOB UPON CLICK
  const handlePayButtonClick = async (option) => {
    // Initiate the payment
    const paymentInfo = await initiatePayment(option);

    // Check if payment initiation was successful
    if (paymentInfo) {
      const { hrefValue, paymentId } = paymentInfo;
      try {
        // Redirect to the specified URL (if needed) and wait for completion
        await router.push(hrefValue);

        // Verify the payment after router.push has completed
      } catch (error) {
        console.error("Error navigating to hrefValue:", error);
      }
    }
  };

  //   FUNCTION TO CHECK THE STAGE OF EACH JOB EITHER PAUSED, PENDING OR COMPLETED
  const handleProjectStage = (id, value, key) => {
    // Send project ID and project_stage to db.
    setObjKey(key); // used the state to update items
    const formData = new FormData();
    formData.append("project_stage", value);
    const requestOptions = reqOptions("PUT", formData, true);
    let access_url = `${HOST_URL()}/api/v1/jobs/${id}/`;
    fetchAPI(setUpdate, access_url, requestOptions, true);
  };

  useEffect(() => {
    if (update) {
      // Filter with index and replace project_stage
      const newItems = items.filter((item, index) => {
        if (index === objKey) {
          item["project_stage"] = update.project_stage;
          return item;
        }
      });
      setItems(newItems);
      setUpdate();
    } else {
      setItems(data?.results);
    }
  }, [data, setItems, update]);
  return (
    <ReactManageTable>
      {showDelete ? (
        <DeleteConfirmationModal
          itemTitle={showDelete?.name}
          showDelete={showDelete}
          setShowDelete={setShowDelete}
          urlPath={`/api/v1/jobs/${showDelete?.id}/`}
          redirects={`/accounts/jobs/`}
        />
      ) : (
        <div className="overflow-table">
          <table className="">
            <thead>
              <tr>
                <th>Title</th>
                <th>Date</th>
                <th>description</th>
                <th>budget</th>
                <th>Invited</th>
                <th>Accepted</th>
                <th>Stages</th>
                <th>Delete</th>
                <th>Payment</th>
              </tr>
            </thead>

            <tbody>
              {items?.map((option, index) => {
                return (
                  <tr className="track_data" key={index}>
                    <td className="row_title">
                      <Link href={"/jobs/" + option.id}>{option.name}</Link>
                    </td>
                    <td className="row_date">
                      {new Date(option.timestamp).toLocaleString(
                        "en-US",
                        dateOptions
                      )}
                    </td>
                    <td className="row_desc">
                      {option.description?.slice(0, 100)}...
                    </td>
                    <td>
                      {option.budget.toLocaleString("en", {
                        style: "currency",
                        currency: "USD",
                      })}
                    </td>
                    <td>{option.accepted_job_invites_count}</td>

                    <td>
                      {" "}
                      {option.accepted_job_invites_count ? (
                        <Link href="/view-offers">
                          {option.accepted_job_invites_count} Applicants
                        </Link>
                      ) : (
                        "-"
                      )}
                    </td>

                    <td>
                      <div className="delete_pause">
                        <button
                          className="native-btn"
                          onClick={() =>
                            handleProjectStage(
                              option.id,
                              option.project_stage === "PAUSED"
                                ? "ACTIVE"
                                : "PAUSED",
                              index
                            )
                          }
                        >
                          {option.project_stage === "PAUSED"
                            ? "ACTIVE"
                            : "PAUSED"}
                        </button>
                      </div>
                    </td>
                    <td>
                      <Image
                        src={Images.delete}
                        width={24}
                        height={24}
                        onClick={() => handleDelete(index, option)}
                      />
                    </td>
                    <td>
                      <div className="delete_pause">
                        <button
                          className="native-btn"
                          onClick={() => handlePayButtonClick(option)}
                        >
                          {!option.active ? "PAY" : "PAID"}
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </ReactManageTable>
  );
};

export default RequestTable;

const ReactManageTable = styled.div`
  .row_title {
    min-width: 250px;
    a {
      text-decoration: none !important;
      font-weight: 600;
    }
  }
  .row_date {
    min-width: 150px;
  }
  .row_desc {
    min-width: 400px;
  }
`;
