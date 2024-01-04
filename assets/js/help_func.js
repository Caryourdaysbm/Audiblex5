// Sentry
// import * as Sentry from "@sentry/react";
// import { BrowserTracing } from "@sentry/tracing";
export const DEBUG = () => {
	let prod = true;

	if (prod) {
		return true;
	} else {
		return process.env.NEXT_PUBLIC_NODE_ENV === "development" ? true : false;
	}
};

export const HOST_URL = () => {
	if (process.env.NEXT_PUBLIC_NODE_ENV === "development") {
		return "http://127.0.0.1:8000";
	} else {
	// return	"http://54.211.229.147:8000";
		return "https://instasaw.optimalinfographics.com";
	}
};

export const SK_KEY = process.env.NEXT_PUBLIC_SK_KEY;
export const SK_VALUE = process.env.NEXT_PUBLIC_SK_VALUE;

export const cookiesEnabled = () => {
	var i, j, cookies, found;
	if (navigator.cookieEnabled === false) return 0;
	document.cookie = "testcookiesenabled=1";
	for (i = 0; i < 2; i++) {
		found = false;
		cookies = document.cookie.split(";");
		j = cookies.length;
		while (j--) {
			while (cookies[j].charAt(0) === " ") {
				// trim spaces
				cookies[j] = cookies[j].substring(1);
			}
			if (cookies[j].indexOf("testcookiesenabled=") === 0) {
				found = true;
				break;
			}
		}
		if (!found) {
			return i;
		}
		// Delete test cookie.
		document.cookie =
			"testcookiesenabled=; expires=Thu, 01 Jan 1970 00:00:01 GMT";
	}
	// Results inconclusive.
};

export const toTitleCase = (str) => {
	if (str) {
		return str.replace(/\w\S*/g, function (txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		});
	} else return "";
};

// replace an object in an array with an object containing a unique ID
export const ReplaceObjects = (objects, newObject) => {
	const index = objects.findIndex((object) => object.id === newObject.id);
	if (index !== -1) {
		const newObjects = [
			...objects.slice(0, index),
			newObject,
			...objects.slice(index + 1),
		];
		return newObjects;
	}
};

export const faqTag = (e) => {
	// Hide other elements and change the icon button.
	const hideTag = () => {
		document.querySelectorAll(".faq").forEach((item) => {
			item.classList.remove("open");
			item.children[1].innerHTML = "&#43;";
		});
	};

	// Toggle targeted element to show with the forEach loop

	if (e.target.classList.contains("faq")) {
		hideTag();
		e.target.classList.toggle("open");
		if (e.target.querySelector(".btn")) {
			e.target.querySelector(".btn").innerHTML = "&#8722;";
		}
	} else if (e.target.className === "btn") {
		hideTag();
		e.target.parentElement.classList.toggle("open");
		e.target.innerHTML = "&#8722;";
	} else if (e.target.tagName === "H3") {
		hideTag();
		e.target.parentElement.parentElement.classList.toggle("open");
		if (e.target.querySelector(".btn")) {
			e.target.querySelector(".btn").innerHTML = "&#8722;";
		}
	}
};

export const cookiesRequired = (tag) => {
	if (cookiesEnabled() === 0) {
		document.getElementById("root").innerHTML = `
    <div 
        id="faq"
        className="faq_main container" 
        itemScope itemType="https://helpcenter.trendmicro.com/en-us/article/tmka-18108">
        <div className="faq_wrap">
          <div  className="p_reviews">
              <h2 itemProp="title" className='t-left'>We use cookies</h2>
          </div>
          <p>Cookies help us deliver the best experience on our website. By using our website, you agree to the use of cookies.</p>
          <p>Use the descriptions below to enable your cookies. <strong>Refresh this page when you are done!</strong> It should load the right content.</p>

            
          <div className="faq">
            <div className="faq_text">
              <h3>Enable website cookies and JavaScript in <strong>Google Chrome</strong></h3>
              <ol>
                <li>Open <strong>Google Chrome.</strong></li>
                <li>On the upper right corner, click the <strong>Menu button ⋮</strong>, then choose Settings.</li>
                <li>Under <strong>Privacy and security</strong>, click <strong>Site Settings</strong>.</li>
                <p>- Scroll down until you see the <strong>Content</strong> section.</p>
                <p>- Select <strong>Cookies and other site data</strong>, then choose <strong>Allow all cookies.</strong></p>
                <p>- Select <strong>JavaScript</strong>, then choose <strong>Sites can use Javascript.</strong></p>
              </ol>
            </div>
            <span className="btn">&#43;</span>
          </div>

          <div className="faq">
            <div className="faq_text">
              <h3>Enable website cookies and JavaScript in <strong>Microsoft Edge</strong></h3>
              <ol>
                <li>Open <strong>Microsoft Edge</strong>.</li>
                <li>At the top right corner, click <strong>Settings and more</strong> , then choose <strong>Settings</strong>.</li>
                <li>Select <strong>Cookies and site permissions</strong>.</li>
                <p>- Click <strong>Manage and delete cookies and site data</strong>, then turn ON <strong>Allow sites to save and read cookie data (recommended)</strong>.</p>
                <p>- Select Cookies and other site data, then choose Allow all cookies.</p>
                <p>- Select <strong>JavaScript</strong> under <strong>Site permissions</strong>, then turn ON  <strong>Allowed (recommended)</strong>.</p>
              </ol>
            </div>
            <span className="btn">&#43;</span>
          </div>

          <div className="faq">
            <div className="faq_text">
              <h3>Enable website cookies and JavaScript in <strong>Mozilla Firefox</strong></h3>
              <ol>
              <strong>Note:</strong> By default, Javascript is automatically enabled in Firefox.
                <li>Open <strong>Mozilla Firefox</strong>.</li>
                <li>At the upper right, click the <strong>Menu button ☰</strong>, then select <strong>Settings</strong>.</li>
                <li>Select <strong>Privacy & Security</strong>, then choose <strong>Standard</strong> under <strong>Browser Privacy</strong>.</li>
              </ol>
            </div>
            <span className="btn">&#43;</span>
          </div>

          <div className="faq">
            <div className="faq_text">
              <h3>Enable website cookies and JavaScript in Apple <strong>Safari</strong></h3>
              <ol>
                <li>Open <strong>Safari</strong>.</li>
                <li>At the upper left, click the <strong>Safari</strong> menu, then select <strong>Preferences</strong>.</li>
                <p>- Select the Privacy tab, then choose <strong>Never</strong> under <strong>Block cookies</strong>.</p>
                <p>- Select the <strong>Security</strong> tab, then check <strong>Enable JavaScript</strong> under <strong>Web content</strong>.</p>
              </ol>
            </div>
            <span className="btn">&#43;</span>
          </div>

          <p className='mt-3'>Need additional help? chat with us via</p>
          <a href="https://wa.me/message/5IA2QYCI53SUM1" target="_blank" rel="noreferrer">
            <button className="d-inline-block important-btn">
              <span>WhatsApp</span>
            </button>
          </a>
        </div>
    </div>
    `;
		const faq = document.getElementById("faq");
		if (faq) {
			faq.addEventListener("click", (e) => {
				faqTag(e);
			});
		}
	}
};

export const getCookie = (cname) => {
	let name = cname + "=";
	if (typeof document !== "undefined") {
		let ca = document.cookie.split(";");
		for (let i = 0; i < ca.length; i++) {
			let c = ca[i];
			while (c.charAt(0) === " ") {
				c = c.substring(1);
			}
			if (Number(c.indexOf(name)) === 0) {
				return c.substring(name.length, c.length);
			}
		}
	}
	return null;
};

export const removeCookie = (cname) => {
	const d = new Date("12-02-2011"); // backdate
	document.cookie = cname + "=;" + HOST_URL + d;
};

export const setCookie = (cname, cvalue, exdays) => {
	const d = new Date();
	d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
	let expires = "expires=" + d.toUTCString();
	document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
	// console.log(`${cname}=${cvalue}; cookies was created`)
};
// setCookie('test3', 'stest', 29)
// console.log(getCookie('test3'))
// removeCookie('test3', -10)
// console.log(getCookie('u_id'))

// Page hero background
export const PageHeroBanner = (tag_id, img) => {
	const tag = document.getElementById(tag_id);
	tag.style.backgroundImage = `url(${img})`;
	tag.style.height = "200px";
	tag.style.maxWidth = "100%";
	tag.style.width = "100%";
	tag.style.marginTop = "85px";
	tag.style.marginBottom = "40px";
	tag.style.backgroundSize = "cover";
};

export const printErr = (key, value, index) => {
	let inputField = document
		.querySelector("#regForm")
		.querySelector(`[name="${key}"]`);
	// console.log(key, value)

	let error_tag = null;

	// Make input border red and check for the parent tag
	if (inputField !== null) {
		inputField.style.borderColor = "var(--TurkishRose)";

		if (inputField.getAttribute("type") === "radio") {
			error_tag =
				inputField.parentElement.parentElement.parentElement.querySelector(
					".error"
				);
		} else if (inputField.getAttribute("type") === "file") {
			error_tag =
				inputField.parentElement.parentElement.querySelector(".error");
		} else {
			error_tag = inputField.parentElement.querySelector(".error");
		}
	}

	if (error_tag) {
		error_tag.textContent = value;
	} else {
		let span_tag = document.createElement("SPAN");
		span_tag.classList.add("error");
		span_tag.textContent = value;
		span_tag.style.color = "var(--TurkishRose)";
		span_tag.style.display = "inline-block";

		if (key === "user") {
		} else if (inputField !== null) {
			// console.log(inputField.parentElement)
			if (inputField.getAttribute("type") === "radio") {
				// console.log(key)
				inputField.parentElement.parentElement.parentElement.append(span_tag);
			} else if (inputField.getAttribute("type") === "file") {
				// console.log(key)
				inputField.parentElement.parentElement.append(span_tag);
			} else if (inputField.nodeName === "SELECT") {
				// console.log(key)
				inputField.parentElement.append(span_tag);
			} else {
				inputField.parentElement.parentElement.append(span_tag);
			}
		}
	}
	if (index === 0 && inputField !== null) {
		inputField.focused = true;
	}
};

export const removeErrMsg = () => {
	// REMOVE ERROR MESSAGES
	const ERR = document.querySelectorAll(".s_err");
	if (ERR) {
		ERR.forEach((option) => {
			// Remove message
			option.querySelector(".field").style.border = "none";
			if (option.querySelector(".err_msg")) {
				option.querySelector(".err_msg").remove();
				if (option.querySelector("input")) {
					option.querySelector("input").style.border = "var(--borderDefault)";
				} else if (option.querySelector("textarea")) {
					option.querySelector("textarea").style.border =
						"var(--borderDefault)";
				}
			}
			option.classList.remove("s_err");
		});
	}

	const ERR_BANNER = document.querySelector("#err_message");
	if (ERR_BANNER) {
		ERR_BANNER.classList.remove("active");
		ERR_BANNER.querySelector("ul").innerHTML = "";
	}
};

export const printErrNew = (items) => {
	if (items) {
		// spinBtn(registerForm, 'none', false) // spin button: parameter >> form, display and status
		let inputField;
		Object.entries(items).forEach((item, index) => {
			const [key, value] = item;
			inputField = document.querySelector(`.${key}`);

			let err_tag = document.createElement("P");
			err_tag.classList.add("err_msg");
			err_tag.style.color = "var(--TurkishRose)";
			err_tag.textContent = value;

			// (inputField) && inputField.classList.add("s_err");

			if (
				inputField &&
				!inputField.classList.contains("s_err") &&
				!inputField.querySelector(".err_msg")
			) {
				inputField.classList.add("s_err");
				inputField.append(err_tag);
				let input_field = inputField.querySelector(".field input");
				let textarea = inputField.querySelector(".field textarea");
				if (
					input_field &&
					(input_field.getAttribute("type") === "number" ||
						input_field.getAttribute("type") === "text" ||
						input_field.getAttribute("type") === "email" ||
						input_field.getAttribute("type") === "password")
				) {
					input_field.style.border = "1px solid var(--TurkishRose)";
					if (index === 0) inputField.querySelector(`[name="${key}"]`).focus();
				} else if (textarea) {
					const area = textarea.autofocus;
					textarea.style.border = "1px solid var(--TurkishRose)";
				} else {
					inputField.querySelector(".field").style.border =
						"1px solid var(--TurkishRose)";
				}
				inputTagErrorEvent(key, false);
			}
		});
		// document.querySelector('.server_err').style.display="none";
	}
};

export const inputTagErrorEvent = (tags, border = true) => {
	// let tag = document.querySelector(`[name="${tags}"]`)
	// console.log(tags);

	let input_field_wrap = document.querySelector("div." + tags);
	let msg_wrap = document.querySelector("#err_message");
	let msg_tag = document.createElement("LI");

	if (!input_field_wrap.classList.contains("s_err")) {
		input_field_wrap.classList.add("s_err");
		msg_wrap.classList.add("active");
		if (border)
			input_field_wrap.querySelector(".field").style.border =
				"1px solid var(--TurkishRose)";
		if (input_field_wrap.querySelector("h5")) {
			msg_tag.textContent = input_field_wrap.querySelector("h5").textContent;
		} else if (input_field_wrap.querySelector(".text_label")) {
			msg_tag.textContent =
				input_field_wrap.querySelector(".text_label").textContent;
		}

		msg_wrap.querySelector("ul").append(msg_tag);
	}

	// document.querySelector('.server_err').style.display="none";
};

export const handleError = (status, items, registerForm, r_path) => {
	const serverTag = document.querySelector(".server_err");

	if (status === 400) {
		// console.log(items);
		if (items.user || items.username) {
			if (items.user[0] === "This field must be unique.") {
				serverTag.style.display = "block";
				serverTag.style.backgroundColor = "var(--DarkCyan)";

				if (
					document.location.pathname === "/register/details" ||
					document.location.pathname === "/register/details/"
				) {
					serverTag.querySelector("a button span").innerHTML =
						"Take Assessment";
					serverTag.querySelector("a").href = "/quiz/";
				}
				serverTag.querySelector("h3").textContent =
					"We already have your details!";

				spinBtn(registerForm, "none", false);
				window.location.href = "#Socials";
			}
		} else {
			spinBtn(registerForm, "none", false); // spin button: parameter >> form, display and status
			Object.entries(items).forEach((item, index) => {
				const [key, value] = item;
				printErr(key, value, index);
			});
			document.querySelector(".server_err").style.display = "none";
		}
	} else if (status === 200 || status === 201 || status === 202) {
		if (r_path !== null) {
			window.location.href = r_path;
		}
	} else {
		if (status === 401) {
			serverTag.style.display = "block";
			serverTag.querySelector("a").innerHTML = "";
			serverTag.querySelector("h3").textContent = items.detail;
			spinBtn(registerForm, "none", false);
			window.location.href = "#Socials";
		}
	}
};

// Prefill user input
export const prefillInput = (items) => {
	Object.entries(items).forEach((item, index) => {
		const [key, value] = item;

		let inputField = document
			.querySelector("#regForm")
			.querySelectorAll(`[name="${key}"]`);

		// Target regular fields
		if (inputField[0] && value) {
			inputField[0].value = value;
		}

		// Target radio button type
		if (inputField.length !== 0) {
			if (inputField[0].getAttribute("type") === "radio") {
				inputField.forEach((i) => {
					if (
						i.value === value ||
						(i.value === "true" ? true : false) === value
					) {
						i.checked = true;
					}
				});
			}
		}
	});
};

export const generateCSRFToken = () => {
	var csrf_token = "";
	var possible =
		"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
	for (var i = 0; i < 32; i++) {
		csrf_token += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return csrf_token;
};

// Set type to null if not required.
export const reqOptions = (method, data, bearer = null) => {
	//let myHeaders = {'Content-Type': 'application/json'};
	//let myHeaders = {'Accept': 'application/json'};
	let myHeaders = {};
	myHeaders[SK_KEY] = SK_VALUE;

	if (bearer) {
		//alert(getCookie("access")) 
		myHeaders["Authorization"] = "Bearer " + getCookie("access")
	}
	/*
	if(bearer){
		myHeaders = {
			'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie("access")
		}
	} */

	if (getCookie("c_id")) {
		/* myHeaders = {
			'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie("access"),
			"company-id":  getCookie("c_id")
		}*/
		myHeaders["company-id"] = getCookie("c_id");
	}
	var request = {
		method: method,
		headers: myHeaders,
		body: data,
		redirect: "follow",
	};
	return request;
};

export const fetchAPI = (
	session,
	api,
	reqOptions,
	func = false,
	setStatus = false,
	setError = false
) => {
	let status = null;
	fetch(api, reqOptions)
		.then((res) => {
			status = res.status;
			return res.json();
		})
		.then((result) => {
			if (func === false) {
				// if class component
				session.setState({
					data: result,
					status: status,
				});
			} else if (func === true) {
				// if function component
				if (
					status === 400 ||
					status === 404 ||
					status === 401 ||
					status === 500
				) {
					if (setError) setError(result);
				} else if (status === 201 || status === 200 || status === 204) {
					session(result);
					setCookie('newSession', JSON.stringify(result))
					//alert(JSON.stringify(result))
					if (setError) setError(); // Display message banner.
					//else return result
				}
				if (setStatus) setStatus(status);
			}

			if (DEBUG) {
				console.log(reqOptions);
				console.log(result);
				console.log(status);
			}

			return result;
		})
		.catch((err) => {
			if (err.error === undefined) {
				if (setError) {
					setError({ message: "Couldn't make connection with the server." });
				}
				if (setStatus) {
					setStatus(500);
				}
			} else {
				if (setError) {
					setError(err);
				}
			}
		});
};

///////// API CALL CONFIG ////////
export const ApiReqOptions = (method, data, bearer = null) => {
	//let myHeaders = {'Content-Type': 'application/json'};
	let myHeaders = {'Accept': 'application/json'};
	
	if(bearer){
		myHeaders = {
			'Accept': 'application/json',
    //        'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie("access")
		}
	} 

	if (getCookie("c_id")) {
		 myHeaders = {
			'Accept': 'application/json',
      //      'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getCookie("access"),
			"company-id":  getCookie("c_id")
		}
	}

	var request = {
		method: method,
		headers: myHeaders,
		body: data,
		redirect: "follow",
	};
	return request;
};

export const ApiCall = (
	session,
	api,
	ApiReqOptions
) => {
 
	fetch(api, ApiReqOptions)
	.then((response) => response.json())
	.then((json) => {
		if (json.status === 1) {
			toast.success(json.message)
		}
		else if (json.status === 0) {
			toast.error(json.message)
		}
		else {
			toast.error("Internal server error. Please try again.")			
		}    
	})
	.catch((error) => toast.error("Internal server error. Please try again."))
	.finally(() => console.log(""));
};
//////// API CALL CONFIG END /////

export const checkEnv = () => {
	if (
		window.location.hostname === "localhost" ||
		window.location.hostname === "127.0.0.1" ||
		window.location.hostname === "192.168.0.174" ||
		window.location.hostname === ""
	) {
		return "local";
	} else {
		return "production";
	}
};

// export const loginRequired = (status) => {
//   if (typeof document !== 'undefined') {
//     let redirect_url = `/accounts/login/?next=${
//       window.location.pathname + window.location.search
//     }`;
//     if (status === 401 || status === null) {
//       // Login Required
//       window.location.href = redirect_url;
//     } else {
//       // If access token exist, verify from server if access and ID is valid.
//       fetch(
//         `${HOST_URL()}/api/v1/users/auth/verify_token/?access_token=${getCookie(
//           "access"
//         )}&user_id=${getCookie("u_id")}`,
//         reqOptions("GET")
//       )
//         .then((response) => response.text())
//         .then((result) => {
//           if (!JSON.parse(result).status) {
//             window.location.href = redirect_url;
//           }
//         })
//         .catch((error) => console.log("error", error));
//     }
//   }
// };

export const spinBtn = (form, display, status) => {
	form.querySelector("button.submit_bt").disabled = status; // this disable the button
	form.disabled = status; // This disables the whole form via the fieldset
	form.querySelector("button .bt-spinner").style.display = display;
};

// var country_list = ;

export const customData = {
	universities: [
		"Abia State University",
		"Abubakar Tafawa Balewa University",
		"Achievers University, Owo",
		"Adamawa State University",
		"Adekunle Ajasin University",
		"Adeleke University",
		"Admiralty University of Nigeria",
		"Afe Babalola University",
		"African University of Science and Technology",
		"Ahmadu Bello University",
		"Ajayi Crowther University",
		"Akwa Ibom State University",
		"Alex Ekwueme Federal University, Ndufu-Alike",
		"Al-Hikmah University",
		"Al-Qalam University, Katsina",
		"Ambrose Alli University",
		"American University of Nigeria",
		"Anchor University, Lagos",
		"Arthur Jarvis University",
		"Atiba University",
		"Augustine University",
		"Babcock University",
		"Bauchi State University",
		"Bayero University Kano",
		"Baze University",
		"Bells University of Technology",
		"Benson Idahosa University",
		"Benue State University",
		"Bingham University",
		"Borno State University",
		"Bowen University",
		"Caleb University",
		"Caritas University",
		"Chrisland University",
		"Christopher University",
		"Chukwuemeka Odumegwu Ojukwu University",
		"Clifford University",
		"Coal City University",
		"Covenant University",
		"Crawford University",
		"Crown Hill University",
		"Delta State University, Abraka",
		"Dominican University, Ibadan",
		"Eastern Palm University",
		"Ebonyi State University",
		"Edo University",
		"Edwin Clark University",
		"Ekiti State University, Ado Ekiti",
		"Eko University of Medical and Health Sciences",
		"Elizade University",
		"Enugu State University of Science and Technology",
		"Evangel University, Akaeze",
		"Federal University of Agriculture, Abeokuta",
		"Federal University of Petroleum Resources",
		"Federal University of Technology, Akure",
		"Federal University of Technology, Minna",
		"Federal University of Technology, Owerri",
		"Federal University, Birnin Kebbi",
		"Federal University, Dutse",
		"Federal University, Dutsin-Ma",
		"Federal University, Gashua",
		"Federal University, Gusau",
		"Federal University, Kashere",
		"Federal University, Lafia",
		"Federal University, Lokoja",
		"Federal University, Otuoke",
		"Federal University, Oye-Ekiti",
		"Federal University, Wukari",
		"Fountain University, Osogbo",
		"Glorious Vision University",
		"Godfrey Okoye University",
		"Gombe State University",
		"Gombe State University of Science and Technology",
		"Gregory University, Uturu",
		"Hallmark University, Ijebu-Itele",
		"Hezekiah University",
		"Ibrahim Badamasi Babangida University",
		"Igbinedion University Okada",
		"Ignatius Ajuru University of Education",
		"Imo State University",
		"Joseph Ayo Babalola University",
		"Kaduna State University",
		"Kano University of Science and Technology",
		"Kebbi State University of Science and Technology",
		"Kings University",
		"Kola Daisi University",
		"Kwara State University",
		"Kwararafa University, Wukari",
		"Ladoke Akintola University of Technology",
		"Lagos State University",
		"Landmark University",
		"Lead City University",
		"Legacy University, Okija",
		"Madonna University, Nigeria",
		"Mcpherson University",
		"Michael and Cecilia Ibru University",
		"Michael Okpara University of Agriculture",
		"Modibbo Adama University of Technology",
		"Moshood Abiola University of Science and Technology, Abeokuta",
		"Mountain Top University",
		"Nasarawa State University",
		"Niger Delta University",
		"Nigerian Maritime University, Okerenkoko",
		"Nile University of Nigeria",
		"Nnamdi Azikiwe University",
		"Novena University",
		"Obafemi Awolowo University",
		"Obong University",
		"Oduduwa University",
		"Olabisi Onabanjo University",
		"Ondo State University of Science and Technology",
		"Osun State University",
		"PAMO University of Medical Sciences",
		"Pan-Atlantic University",
		"Paul University",
		"Plateau State University",
		"Precious Cornerstone University",
		"Redeemer's University",
		"Renaissance University",
		"Rhema University",
		"Ritman University",
		"Rivers State University",
		"Salem University",
		"Skyline University Nigeria",
		"Sokoto State University",
		"Southwestern University, Nigeria",
		"Spiritan University, Nneochi",
		"Sule Lamido University",
		"Summit University Offa",
		"Taraba State University",
		"The Technical University",
		"Umaru Musa Yar'Adua University",
		"University of Abuja",
		"University of Africa",
		"University of Agriculture, Makurdi",
		"University of Benin",
		"University of Calabar",
		"University of Ibadan",
		"University of Ilorin",
		"University of Jos",
		"University of Lagos",
		"University of Maiduguri",
		"University of Medical Sciences",
		"University of Mkar",
		"University of Nigeria",
		"University of Port Harcourt",
		"University of Uyo",
		"Usmanu Danfodio University",
		"Veritas University",
		"Wellspring University",
		"Wesley University of Science and Technology",
		"Western Delta University",
		"Yobe State University",
		"Yusuf Maitama Sule University Kano",
		"Zamfara State University",
	],
	courses: [
		"Agricultural economics",
		"Agricultural Economics/Extension",
		"Agricultural Education",
		"Agricultural Education",
		"Agricultural Engineering",
		"Agricultural Extention",
		"Agricultural Science",
		"Agronomy",
		"Animal Production",
		"Animal Science",
		"Crop Production",
		"Crop Science",
		"Family, Nutrition And Consumer Sciences",
		"Fisheries",
		"Food Science and Technology",
		"Forestry",
		"Plant Science",
		"Soil Science",
		"Water Resources Management And Agrometerorology",
		"Automobile Engineering",
		"Biomedical Engineering",
		"Chemical Engineering",
		"Civil Engineering",
		"Computer Engineering",
		"Electrical Engineering",
		"Engineering Physics",
		"Food Science and Engineering",
		"Industrial and Production Engineering",
		"Information Communication Engineering",
		"Mechanical Engineering",
		"Mechatronics Engineering",
		"Metallurgical Engineering",
		"Water Resources and Environmental Engineering",
		"Software Engineering",
		"System Engineering",
		"Petroleum Engineering",
		"Anatomy",
		"Biochemistry",
		"Human Nutrition and Dietetics",
		"Medical Laboratory Technology/Science",
		"Medicine & Surgery",
		"Nursing",
		"Optometry",
		"Radiography",
		"Pharmacy",
		"Physiology",
		"Public Health Technology",
		"Veterinary medicine",
		"Accounting",
		"Arabic",
		"Banking and Finance",
		"Business Administration",
		"Communication Arts",
		"Crimnology and Security Studies",
		"curriculum studies",
		"Demography and Social Statistics",
		"Economics",
		"English Language",
		"Entrepreneurship",
		"Fine Arts",
		"French",
		"Hausa",
		"History",
		"Home Economics",
		"Hospitality and Tourism Management",
		"Human Resource Management",
		"Igbo",
		"Insurance",
		"International Relations",
		"Islamic Studies",
		"Linguistics",
		"Marketing",
		"Mass Communication",
		"Media and Communication Studies",
		"Music",
		"Peace and Conflict Resolution",
		"Performing Arts",
		"Philosophy",
		"Political Science",
		"project management",
		"Psychology",
		"Public Administration",
		"Religious Studies",
		"Social Works",
		"Sociology",
		"Taxation",
		"Tourisim Studies",
		"Theology",
		"Yoruba",
		"Architecture",
		"Biochemistry",
		"Bio-Infomatics",
		"Biology",
		"Botany",
		"Building Technology",
		"Computer Science",
		"Cyber security Science",
		"Estate Management",
		"Chemistry",
		"Geography",
		"Geophysics",
		"Geology",
		"Human Nutrition and Dietetics",
		"Information Resource Management",
		"Information Systems",
		"Information Technology",
		"Library and Information Science",
		"Management Information System",
		"Mathematics",
		"MicroBiology",
		"Physics",
		"Plant Science",
		"statistics",
		"Urban and Regional Planning",
		"Veterinary medicine",
		"Zoology",
		"Adult Education",
		"Agricultural Education",
		"Business Education",
		"Counsellor Education",
		"Early Childhood Education",
		"Education Administration",
		"Education & Accounting",
		"Education & Arabic",
		"Education & Biology",
		"Education & Business Administration",
		"Education & Chemistry",
		"Education & Computer Science",
		"Education & Christian Religious Studies",
		"Education & Economics",
		"Education & Fine Art",
		"Education & English Language",
		"Education & French",
		"Education & Geography",
		"Education & Geography/physics",
		"Education & History",
		"Education & Integrated Science",
		"Education & Introductory Technology",
		"Education & Islamic Studies",
		"Education & mathematics",
		"Education & Music",
		"Education & Physics",
		"Education & Political Science",
		"Education & Religious Studies",
		"Education & Social Studies",
		"Education Arts",
		"Education Foundation",
		"Environmental Education",
		"Guidance and Counselling",
		"Health Education",
		"Vocational Education",
		"Special Education",
		"Law",
		"Civil Law",
		"Sharia/Islamic Law",
		"Private Law",
		"Public Law",
		"Commercial Law",
		"International Law & Jurisprudence",
	],
	faculties: [
		"Agriculture",
		"Engineering",
		"Medicine & Pharmacy",
		"Arts, Management & Social Science",
		"Science & Technology",
		"Education",
		"Law",
	],
	country_list: [
		"Afghanistan",
		"Albania",
		"Algeria",
		"Andorra",
		"Angola",
		"Anguilla",
		"Antigua &amp; Barbuda",
		"Argentina",
		"Armenia",
		"Aruba",
		"Australia",
		"Austria",
		"Azerbaijan",
		"Bahamas",
		"Bahrain",
		"Bangladesh",
		"Barbados",
		"Belarus",
		"Belgium",
		"Belize",
		"Benin",
		"Bermuda",
		"Bhutan",
		"Bolivia",
		"Bosnia &amp; Herzegovina",
		"Botswana",
		"Brazil",
		"British Virgin Islands",
		"Brunei",
		"Bulgaria",
		"Burkina Faso",
		"Burundi",
		"Cambodia",
		"Cameroon",
		"Cape Verde",
		"Cayman Islands",
		"Chad",
		"Chile",
		"China",
		"Colombia",
		"Congo",
		"Cook Islands",
		"Costa Rica",
		"Cote D Ivoire",
		"Croatia",
		"Cruise Ship",
		"Cuba",
		"Cyprus",
		"Czech Republic",
		"Denmark",
		"Djibouti",
		"Dominica",
		"Dominican Republic",
		"Ecuador",
		"Egypt",
		"El Salvador",
		"Equatorial Guinea",
		"Estonia",
		"Ethiopia",
		"Falkland Islands",
		"Faroe Islands",
		"Fiji",
		"Finland",
		"France",
		"French Polynesia",
		"French West Indies",
		"Gabon",
		"Gambia",
		"Georgia",
		"Germany",
		"Ghana",
		"Gibraltar",
		"Greece",
		"Greenland",
		"Grenada",
		"Guam",
		"Guatemala",
		"Guernsey",
		"Guinea",
		"Guinea Bissau",
		"Guyana",
		"Haiti",
		"Honduras",
		"Hong Kong",
		"Hungary",
		"Iceland",
		"India",
		"Indonesia",
		"Iran",
		"Iraq",
		"Ireland",
		"Isle of Man",
		"Israel",
		"Italy",
		"Jamaica",
		"Japan",
		"Jersey",
		"Jordan",
		"Kazakhstan",
		"Kenya",
		"Kuwait",
		"Kyrgyz Republic",
		"Laos",
		"Latvia",
		"Lebanon",
		"Lesotho",
		"Liberia",
		"Libya",
		"Liechtenstein",
		"Lithuania",
		"Luxembourg",
		"Macau",
		"Macedonia",
		"Madagascar",
		"Malawi",
		"Malaysia",
		"Maldives",
		"Mali",
		"Malta",
		"Mauritania",
		"Mauritius",
		"Mexico",
		"Moldova",
		"Monaco",
		"Mongolia",
		"Montenegro",
		"Montserrat",
		"Morocco",
		"Mozambique",
		"Namibia",
		"Nepal",
		"Netherlands",
		"Netherlands Antilles",
		"New Caledonia",
		"New Zealand",
		"Nicaragua",
		"Niger",
		"Nigeria",
		"Norway",
		"Oman",
		"Pakistan",
		"Palestine",
		"Panama",
		"Papua New Guinea",
		"Paraguay",
		"Peru",
		"Philippines",
		"Poland",
		"Portugal",
		"Puerto Rico",
		"Qatar",
		"Reunion",
		"Romania",
		"Russia",
		"Rwanda",
		"Saint Pierre &amp; Miquelon",
		"Samoa",
		"San Marino",
		"Satellite",
		"Saudi Arabia",
		"Senegal",
		"Serbia",
		"Seychelles",
		"Sierra Leone",
		"Singapore",
		"Slovakia",
		"Slovenia",
		"South Africa",
		"South Korea",
		"Spain",
		"Sri Lanka",
		"St Kitts &amp; Nevis",
		"St Lucia",
		"St Vincent",
		"St. Lucia",
		"Sudan",
		"Suriname",
		"Swaziland",
		"Sweden",
		"Switzerland",
		"Syria",
		"Taiwan",
		"Tajikistan",
		"Tanzania",
		"Thailand",
		"Timor L'Este",
		"Togo",
		"Tonga",
		"Trinidad &amp; Tobago",
		"Tunisia",
		"Turkey",
		"Turkmenistan",
		"Turks &amp; Caicos",
		"Uganda",
		"Ukraine",
		"United Arab Emirates",
		"United Kingdom",
		"Uruguay",
		"Uzbekistan",
		"Venezuela",
		"Vietnam",
		"Virgin Islands (US)",
		"Yemen",
		"Zambia",
		"Zimbabwe",
	],
};

