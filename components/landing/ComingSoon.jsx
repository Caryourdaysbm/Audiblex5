import React, { useState } from "react";
import Images from "../../assets/images/image";
import { fetchAPI, reqOptions, HOST_URL, ApiReqOptions, ApiCall } from "../../assets/js/help_func";
import FormError from "../forms/FormError";
import Alerts from "../Alerts";
import { ToastContainer } from 'react-toastify';

const ComingSoon = (formData, setFormData) =>{
	const [email, setEmail] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [endpoint, setEndPoint] = useState("/email_subscription");
	const [message, setMessage] = useState("");
	const [data, setData] = useState(null);
	const [status, setStatus] = useState(null);
	const [error, setError] = useState({});

	const subscribe = (e) =>{
		
		e.preventDefault();

		setIsLoading(true)
		setMessage("");
			setError({});
			setStatus(null);
    /*
        const postOptions = {
            method: 'POST',
            body: new FormData(e.target)
        };
    
        fetch(HOST_URL() + endpoint, postOptions)
                    .then((response) => response.json())
                    .then((json) => {
                        if (json.status == 1) {
                            setIsLoading(false)
							toast.success(json.message)

                }
                        else {
							toast.error(json.message)
							setIsLoading(false)
                        }    
                    })
                    .catch((error) => console.error(error))
                    .finally(() => setIsLoading(false));
		
		*/
			// clear states.
			
			setMessage("");
			setError({});
			setStatus(null);
			
			let requestOptions = ApiReqOptions("POST", new FormData(e.target));
			ApiCall(
				setData,
				"http://54.211.229.147:8000" + endpoint, //HOST_URL()
				requestOptions
			);
			
		
	}

	return (
		<>
<section className="banner">
				<div className="container">
					<div className="banner_txt">
						<h1>
							Coming Soon!
						</h1>
						<h4>
							The World’s First Custom Fashion measurement and Fashion
							designers’ freelance platform
						</h4>
						<p>
							Subscribe to be the first to get notified when we launch
						</p>
					</div>

					<div className="get_started_with pt-3">
					<div className="other-info-container">
					<form className="form" onSubmit={subscribe}>
						<input 
						type={'email'} 
						placeholder='Email' 
						name="email"
						required
						 />
						 	<button type="submit" className="btn_only">Subscribe</button>
						</form>
						</div>
						<img src={Images.laptop} alt="MockUp" />
					</div>
				</div>
			</section>
			<ToastContainer/>
			</>
		)
}
export default ComingSoon;
