import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { HOST_URL, fetchAPI, getCookie, reqOptions } from "../assets/js/help_func";

const PlanSummary = () => {
	const router = useRouter();
	const { types, amount } = router.query;
	const [amount_, setAmount] = useState(0)
	const [data, setData] = useState([]);
	const [status, setStatus] = useState();
	const [error, setError] = useState('');
	const [coupon, setCoupon] = useState('');

	//const [session, setSession] = useState(null)

	const applyCoupon = (coupon) => {
		setError('')
		let requestOptions = reqOptions("GET", null, true);
		fetchAPI( 
			setData,
			HOST_URL()+`/api/v1/subscriptions/coupon/`+coupon,
			requestOptions,
			true,
			setStatus, 
			setError 
		);
		let result = JSON.parse(getCookie('newSession'))
		result = JSON.stringify(getCookie('newSession')).replace(/\\/g, '')
		//remove qoute from start and end
		result = result.replace(/^"(.*)"$/, '$1')
		result = JSON.parse(result)
		//alert(result.result[0].percentage_off)
		if(result.message === "Successfull"){
			let dt = 100 - result.result[0].percentage_off
			dt = dt/100
			dt = dt * amount_
			//new amount after applyng coupon
			setAmount(dt)
			setCoupon('')
		}
	}

	useEffect(()=>{
		setAmount(amount)
	},[amount])
	return (
		<>
			<div className="container ">
				<div className="plan_b">
					<div className="summary">
						<div>
							<h1>Plan Summary</h1>
							<button className="native-btn" aria-readonly>
								{types} Plan
							</button>
						</div>

							<h2>
							${amount_}
							<span>/Monthly</span>
							</h2>
					</div>

					<p>
						This plan includes a 30 days full access. After that period you will
						be invoiced for monthly payments.
					</p>

					<div className="row">
					<div className="summary">					
							<div class="input-group">
							<p>Have a promo code?</p>
  <input type="text" className="form-control"
   placeholder="Enter Coupon"
   value={coupon}
   onChange={(e) => setCoupon(e.target.value)}
   />
  <div className="input-group-append">
	{error? <p className="text-red">{error.message}</p> : ''}
	{data.length < 1?
	  <button onClick={()=>applyCoupon(coupon)} className="input-group-text native-btn">
	  Apply
  </button>
  :
  <p className="text-green">You applied a promo code on this order.</p>
   }

  </div>
</div>
</div>
							
						</div>
				</div>
			</div>
		</>
	);
};

export default PlanSummary;
