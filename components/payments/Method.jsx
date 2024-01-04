import React, { useEffect, useState } from "react";
import Images from "../../assets/images/image";
import BankTransferPayment from "./BankTransferPayment";
import {
  fetchAPI,
  getCookie,
  reqOptions,
  HOST_URL,
} from "../../assets/js/help_func";
import { useRouter } from "next/router";
import FormError from "../forms/FormError";
import PaymentSuccess from "./PaymentSuccess";
import ReactPaypal from "./ReactPaypal";

const Method = () => {
  const router = useRouter();
  const { plan_id, paypal_plan_id, amount, quantity } = router.query;

  const [data, setData] = useState(null);
  const [error, setError] = useState();
  const [status, setStatus] = useState();
  const [planAmount, setPlanAmount] = useState(amount);
  const [activeIndex, setActiveIndex] = useState(2);
  const [paymentMethod, setPaymentMethod] = useState("Paypal");
  const handleClick = (index) => setActiveIndex(index);
  const checkActive = (index, className) =>
    activeIndex === index ? className : "";

  const handleSubmit = (e) => {
    e.preventDefault();
    let requestOptions = reqOptions("post", new FormData(e.target), true);
    fetchAPI(
      setData,
      HOST_URL() + "/api/v1/subscriptions/user_subscription/",
      requestOptions,
      true,
      setStatus,
      setError
    );
  };

  if (data?.message && status === 200) {
    return <PaymentSuccess />;
  } else {
    return (
      <>
        <div className="container">
          <form className="method_pay" onSubmit={handleSubmit}>
            <h2>
              Payment method <span>(Click one of the option below)</span>
            </h2>

            <div className="target_c">
              <div
                className="all_payment"
                onClick={(e) => {
                  if (e.target.checked === true && e.target.type === "radio") {
                    setPaymentMethod(e.target.value);
                  } 
                }}
              >
                {/* <div
                id="lines_b"
                className={`tab ${checkActive(1, "active")}`}
                onClick={() => handleClick(1)}
              >
                <div className="radio_parent">
                  <label className="radio">
                    <input
                      type="radio"
                      name="scale"
                      id="radio-1"
                      value="10"
                      className="radio-1"
                    />
                    <span>FlutterWave</span>
                  </label>
                </div>

                <img src={Images.Cards} alt="" />
              </div> */}

                <div
                  id="lines_b"
                  className={`tab ${checkActive(2, "active")}`}
                  // onClick={() => handleClick(2)}
                >
                  <div className="radio_parent">
                    <label className="radio">
                      <input
                        type="radio"
                        name="method"
                        id="radio-1"
                        value="Paypal"
                        checked={paymentMethod === "Paypal"}
                      />
                      <span>Paypal</span>
                    </label>
                  </div>
                </div>
                <div
                  id="lines_b"
                  className={`tab ${checkActive(2, "active")}`}
                  // onClick={() => handleClick(2)}
                >
                  <div className="radio_parent">
                    <label className="radio">
                      <input
                        type="radio"
                        name="method"
                        id="radio-1"
                        value="Transfer"
                      />
                      <span>Bank Transfer</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="input_content">
                {paymentMethod === "Transfer" ? (
                  <BankTransferPayment />
                ) : (
                  <ReactPaypal
                    planAmount={planAmount}
                    paypal_plan_id={paypal_plan_id}
                    quantity={quantity}
                  />
                )}
              </div>
            </div>
            <input type="text" name="plan_id" defaultValue={plan_id} hidden />
            <input
              type="text"
              name="paypal_subscription_id"
              defaultValue={paypal_plan_id}
              hidden
            />
            <FormError errors={error} status={status} />
          </form>
        </div>
      </>
    );
  }
};

export default Method;

{
  /* <div className="all_payments"> */
}
{
  /* <input
                type="radio"
                name="test"
                id="test-1"
                className="radio-test"
                checked="checked"
              />
              <input type="radio" name="test" id="test-2" className="radio-test" />

              <div className="labels">
                <label for="test-1" id="label-test-1" className="label">
                  Test 1
                </label>
                <label for="test-2" id="label-test-2" className="label">
                  Test 2
                </label>
              </div> */
}

{
  /* CONTENTS */
}
{
  /* <div className="content content-test-1" id="content-test-1">
                Test 1 content
              </div>
              <div className="content content-test-2" id="content-test-2">
                Test 2 content
              </div> */
}
{
  /* </div> */
}
