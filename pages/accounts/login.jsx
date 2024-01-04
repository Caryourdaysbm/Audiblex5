import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import GNavbar from "../../components/GeneralNav";
import Link from "next/link";
import {
  reqOptions,
  fetchAPI,
  HOST_URL,
  setCookie,
} from "../../assets/js/help_func";
import Error500 from "../500";
import { redirect } from "next/navigation";

function Form() {
  const router = useRouter();
  const searchParams = new URLSearchParams(router.query);

  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [data, setData] = useState(null);
  const [status, setStatus] = useState(null);
  const [error, setError] = useState({});

  const storeUserdata = () => {
    // Store user meta in cookies.
    if (data && data.token) {
      setCookie("access", data.token, 30);
      setCookie("refresh", data.refresh_token, 30);
      setCookie("u_id", data.user.id, 30);
      setCookie("first_name", data.user.first_name, 30);
      setCookie("last_name", data.user.last_name, 30);
      setCookie("email", data.user.email, 30);
      setCookie("last_login", data.user.last_login, 30);
      setCookie("is_staff", data.user.is_staff, 30);
      setCookie("verified", data.user.verified, 30);
      setCookie("user_type", data.user.user_type, 30);
      if (data.profile) {
        setCookie("profile_id", data.profile.user, 30);
        setCookie("date_of_birth", data.profile.date_of_birth, 30);
        setCookie("username", data.profile.username, 30);
        setCookie("profile_image", data.profile.thumbnail, 30);
        setCookie("address", data.profile.address, 30);
        setCookie("mobile", data.profile.mobile, 30);
        setCookie("business_name", data.profile.business_name, 30);
        setCookie("description", data.profile.description, 30);
        setCookie("nationality", data.profile.nationality, 30);
        setCookie("country", data.profile.country, 30);
        setCookie("city", data.profile.city, 30);
        setCookie("interest", data.profile.interest, 30);
        //setCookie("plan_id", data.profile.plan.id, 30);
        setCookie("plan_name", data.profile.plan, 30);
      }
    } else if (error && error.non_field_errors) {
      setMessage(error.non_field_errors[0]);
    }
  };

  useEffect(() => {
    //storeUserdata();
    //if (searchParams.get("next")) router.push(searchParams.get("next"));
    //else router.push("/" + data.profile.username + "/dashboard");
    // else window.location.href = "/";
  }, [data, error, status]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // clear states.
    setMessage("");
    setError({});
    setStatus(null);

    let requestOptions = reqOptions("post", new FormData(e.target));
    setEmail(requestOptions.body.get("email"));
    fetchAPI(
      setData,
      HOST_URL() + "/api/v1/auth/login/",
      //   "http://127.0.0.1:8000/api/v1/auth/login/",
      requestOptions,
      true,
      setStatus,
      setError
    );
    if (status === 200) {
      //   setCookie("first_name", first_name);
      //   setCookie("last_name", last_name);
      //   setCookie("email", email);
      //   setCookie("user_type", user_type);
      setCookie("refresh", data.refresh_token, 30);
      console.log(data);
      storeUserdata();
      setCookie("access", data.access_token, 30);
      setCookie("u_id", data.profile.user, 30);
      setCookie("username", data.profile.username, 30);
      router.push("/" + data.profile.username + "/dashboard");
    }
    /*
  		else{
  			setMessage(data["message"])
  		}*/
  };

  const handleSubmitOTP = (e) => {
    e.preventDefault();
    let requestOptions = reqOptions("post", new FormData(e.target));
    setEmail(requestOptions.body.get("email"));
    fetchAPI(
      setData,
      HOST_URL() + "/api/v1/auth/verify_account/",
      requestOptions,
      true,
      setStatus,
      setError
    );
  };

  if (status === 500) {
    return <Error500 message={error && error.message} />;
  }

  return (
    <>
      <GNavbar />
      <div className="control_Grid">
        <div className="illustrate" id="bca"></div>
        <div className="structure2">
          <div className="">
            {status === 400 &&
            error.message === "Please verify your email address." ? (
              <form className="form" onSubmit={handleSubmitOTP}>
                <div className="get_started_form">
                  <div className="header">
                    <h2>Verify Email</h2>
                    <p>{error.message}</p>
                  </div>
                  <div className="other-info-container">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      readOnly
                      value={email}
                    />

                    <input type="number" name="otp" />
                    <p>Enter the OTP we sent to your email:</p>
                  </div>
                  <div className="l_button">
                    <button type="submit" className="native-btn">
                      Verify Email
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <form className="form" onSubmit={handleSubmit}>
                <div className="get_started_form">
                  <div className="header">
                    <h2>Welcome Back !</h2>
                    <p>Sign in to continue using Instasew</p>
                  </div>
                  <div className="other-info-container">
                    <input
                      type="email"
                      placeholder="Email"
                      name="email"
                      defaultValue={email}
                    />
                    <input
                      type="password"
                      placeholder="Password"
                      name="password"
                    />
                  </div>
                  <div className="l_button">
                    <button type="submit" className="native-btn">
                      Login
                    </button>
                    {message && <p>{message}</p>}
                  </div>

                  {/* <p className="or">Or</p> */}

                  {/* <div className="alternate">
                  <h5 className="btn-only google"> 
                    <Image src={Images.google} alt="Google logo" width={40} height={40}/> 
                    Google</h5>
                  <h5 className="btn-only facebook">
                  <Image src={Images.facebook_2} alt="Google logo" width={40} height={40}/>
                  Facebook</h5>
                </div> */}
                  <div className="already">
                    <h5>
                      Don’t have an account?
                      <Link href="/accounts/signup"> Signup here</Link>
                    </h5>
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Form;
