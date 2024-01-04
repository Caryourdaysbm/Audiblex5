// URI: http://localhost:3000/accounts/2c9a996e-6893-4f9c-887f-3b1315c07d8d/catalogues

import { React, useEffect, useState } from "react";
import Footer from "../../components/Footer";
import Comments from "../../components/Comments";
import Catalogue from "../../components/catalogues/Catalogue";
import ProfileInfo from "../../components/ProfileInfo";
import PrimaryNavbar from "../../components/navbar/PrimaryNavbar";
import {
	fetchAPI,
	spinBtn,
	handleError,
	setCookie,
	HOST_URL,
	reqOptions,
} from "../../assets/js/help_func";
import Error404 from "../404";

const Profile = (props) => {
	const [catalogues, setCatalogues] = useState(props.data);

	if (props.status !== 404) {
		return (
			<div>
				<PrimaryNavbar />
				<ProfileInfo username={props.username} />
				<Catalogue
					catalogues={catalogues}
					setCatalogues={setCatalogues}
					username={props.username}
				/>
				<Comments username={props.username} />
				<Footer />
			</div>
		);
	} else {
		return <Error404 />;
	}
};
export default Profile;

export async function getServerSideProps(context) {
	const { params, req, res, query } = context;
	const { username, slug } = params;

	const objects = { username: username };

	let requestOptions = reqOptions("GET", null);
	const response = await fetch(
		HOST_URL() + `/api/v1/catalogues/${username}`,
		requestOptions
	).then((res) => {
		objects["status"] = res.status;
		if (res.ok) return res.json();
		else return { message: "No record" };
	});

	objects["data"] = await response;

	return {
		props: objects,
	};
}








































// import Link from "next/link";
// import { useRouter } from "next/router";
// import React, { useState, useEffect, useRef } from "react";
// import styled from "styled-components";
// import LoginRequired from "../../../../components/forms/LoginRequired";
// import {
//   HOST_URL,
//   fetchAPI,
//   getCookie,
//   reqOptions,
// } from "../../../../assets/js/help_func";
// // import Illustrate from "@/assets/images/illustration.png";

// const userList = [
//   {
//     id: 1,
//     name: "Alice",
//     picture:
//       "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
//   },
//   {
//     id: 2,
//     name: "Bob",
//     picture:
//       "https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4=",
//   },
//   {
//     id: 3,
//     name: "Charlie",
//     picture:
//       "https://media.istockphoto.com/id/1401711496/photo/businessman-working-in-a-hybrid-office.jpg?s=612x612&w=0&k=20&c=wqPokJmpSecetbN13awCtjI3c1GTih0b4C7CsdwzqV4=",
//   },
// ];



// export default function Home({ objects, room_id }) {
//   LoginRequired();
//   const router = useRouter();
//   const { sg } = router.query;

//   console.log(objects);

//   const [chatList, setChatList] = useState(objects);
//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState();
//   const [webSocket, setWebSocket] = useState(null);
//   const [data, setData] = useState([]);

//   // const [connection, setConnection] = useState(false);
//   const [connection, setConnection] = useState(true);
//   const [senderr, setSender] = useState([]);
//   // const [messagee, setMessagee] = useState('');

//   // const postMessage = async () => {
//   //   // const requestOptions = reqOptions("POST", null, true);
//   //   const requestOptions = reqOptions("POST", {
//   //     body: JSON.stringify({ message: 'Your message here', file: null }),
//   //   }, true);
//   //   const access_url = `${HOST_URL()}/api/v1/chats/room/70b88eef-3f60-4090-8d47-5ab1136353db/messages/`;
//   //   // Assuming fetchAPI returns a promise
//   //   try {
//   //     const data = await fetchAPI(setMessagee, access_url, requestOptions, true);
//   //     console.log(messagee);
//   //   } catch (error) {
//   //     console.error("Error fetching data:", error);
//   //     // Handle errors if needed
//   //   }
//   // };




//   const senderer = objects[0].from_user;
//   const reciever = objects[0].to_user;
//   const messageContent = objects[0].content;
//   console.log(senderer);
//   console.log(reciever);
//   console.log(messageContent);

//   const closeConnection = () => {
//     const socket = new WebSocket(
//       `${process.env.NEXT_PUBLIC_NODE_ENV === "development"
//         ? "ws://127.0.0.1:8000"
//         : "wss://instasaw.optimalinfographics.com"
//       }/ws/chat/${sender}/${db_room.room_name}/`
//     );
//   };

//   useEffect(() => {
//     const initialiseChat = async () => {
//       // let room_name_api = null;
//       if (getCookie("username") === room_id) {
//         alert("You can't initiate chat to yourself");
//       } else if (!connection) {
//         const socket = new WebSocket(
//           `${process.env.NEXT_PUBLIC_NODE_ENV === "development"
//             ? "ws://127.0.0.1:8000"
//             : "wss://instasaw.optimalinfographics.com"
//           }/api/v1/chats/room/70b88eef-3f60-4090-8d47-5ab1136353db/messages/`
//         );
//         // const socket = new WebSocket(
//         //   `${process.env.NEXT_PUBLIC_NODE_ENV === "development"
//         //     ? "ws://127.0.0.1:8000"
//         //     : "wss://instasaw.optimalinfographics.com"
//         //   }/ws/chat/e65ac4bc-55b4-4aed-b093-8b3e4f5ce2ca/`
//         // );
//         // const socket = new WebSocket(
//         // 	`${
//         // 		process.env.NEXT_PUBLIC_NODE_ENV === "development"
//         // 			? "ws://127.0.0.1:8000"
//         // 			: "wss://instasaw.optimalinfographics.com"
//         // 	}/ws/chat/${room_id}/`
//         // );
//         /* while (socket.readyState !== 1){
//           await new Promise(r => setTimeout(r, 25))
//         } */

//         socket.onopen = (e) => {
//           console.log("Connection is made", e);
//           setWebSocket(socket);
//           socket.send(JSON.stringify({ type: "fetch_message" }));
//           setConnection(true); // Set the connection flag to true
//         };

//         socket.onmessage = (event) => {
//           // Handle incoming messages
//           console.log("Incoming Message");
//           const newMessage = JSON.parse(event.data);
//           console.log("on: ", newMessage);
//           setMessages((prevMessages) => [...prevMessages, newMessage]);
//         };

//         socket.onerror = (err) => console.error(err);

//         socket.onclose = () => {
//           console.log("Connection is closed");
//         };

//         setWebSocket(socket);
//       }
//     };

//     initialiseChat();

//     // Clean up the WebSocket connection when the component unmounts
//     return () => {
//       if (webSocket) {
//         webSocket.close();
//       }
//     };
//   }, []);

//   console.log(data)


//   useEffect(() => {
//     // Define the asynchronous function inside the useEffect
//     const AllUsersInRoom = async (txt) => {
//       const requestOptions = reqOptions("GET", null, true);
//       let access_url = HOST_URL() + `/api/v1/chats/${room_id}/users/status/`;

//       // Assuming fetchAPI returns a promise
//       try {
//         const data = await fetchAPI(setData([1]), access_url, requestOptions, true);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//         // Handle errors if needed
//       }
//     };

//     // Call the asynchronous function
//     AllUsersInRoom();

//     // You may include dependencies if needed
//     // For example, if `room_id` changes, the effect will re-run
//   }, [room_id]); // Include dependencies if needed

//   //check if socket is opened
//   const isSocketOpen = (ws) => {
//     return ws.readyState === ws.OPEN;
//   };
//   const sendMessageHandler = async () => {
//     console.log("...sending");
//     const messageObject = {
//       token: getCookie("access"),
//       room_name: room_id,
//       sender: senderer,
//       receiver: reciever,
//       message: messageContent,
//       // type: "chat_message",
//       timestamp: Date.now(),
//       // room_name: db_room,
//       // sender: sender,
//       // receiver: receiver,
//       // message: message,
//       // type: "chat_message",
//       // timestamp: Date.now(),
//     };
//     if (webSocket) {
//       if (!isSocketOpen(webSocket)) {
//         if (webSocket.readyState === 3) {
//           alert("No connection");
//           return;
//         }
//       }
//       webSocket.send(JSON.stringify(messageObject));
//     }
//     if (message) {
//       setMessages([...messages, messageObject]);
//     }
//     setMessage("");
//   };

//   return (
//     <Container>
//       <section className="already_in container">
//         <ul className="chat-list">
//           <div className="dream_chats">
//             <h2>Chats</h2>
//             <span onClick={() => router.push(`/${username}/messages/?sg=add`)}>
//               +
//             </span>
//           </div>
//           {Array.isArray(chatList) ? (
//             chatList.map((user, index) => (
//               <li
//                 key={index}
//                 className={`chat-item ${user.id === getCookie("u_id") ? "active" : ""
//                   }`}
//               >
//                 <Link href={`/${user.from_user}/messages/${user.id}`}>
//                   {/* {Array.isArray(data) ? (
//                     data?.map((message, index) => (
//                       <div>
//                         <img src={message?.picture} alt="" />
//                         <article>
//                           <h3>{message?.first_name}</h3>
//                           <p>{user.content}</p>
//                         </article>
//                       </div>
//                     ))
//                   ) : (
//                     <div>No chats found</div>
//                   )} */}
//                   {Array.isArray(data) && data.length > 0 ? (
//                       <div>
//                         <img src={data[0]?.picture} alt="" />
//                         <article>
//                           <h3>{data[0]?.first_name}</h3>
//                           <p>{user.content}</p>
//                         </article>
//                       </div>
//                     ) : (
//                       <div>No chats found</div>
//                     )}
//                 </Link>
//               </li>
//             ))
//           ) : (
//             <div>No chat found</div>
//           )}
//         </ul>

//         <div className="chat-window swing-in-left-fwd">
//           <section className="messageTray swing-in-left-fwd">

//             {/* <div className="chat-header">
//               <img src={data[0].picture} alt="" />
//               <div>
//                 <h3>{data[0].first_name}</h3>
//                 <p>last seen today</p>
//               </div>
//             </div> */}
//             <div className="chat-header">
//               <img src={userList[0].picture} alt="" />
//               <div>
//                 <h3>{data.first_name}</h3>
//                 {/* <h3>{userList[0].name}</h3> */}
//                 <p>last seen today</p>
//               </div>
//             </div>
//             <div className="chat-body">
//               {Array.isArray(objects) ? (
//                 objects?.map((message, index) => (
//                   <div
//                     key={index}
//                     className={`message ${message.from_user === getCookie("u_id")
//                       ? "sent"
//                       : "received"
//                       }`}
//                   >
//                     <p>{message.content}</p>
//                   </div>
//                 ))
//               ) : (
//                 <div>No message found</div>
//               )}
//             </div>
//             {/* <div>
//               <textarea
//                 value={messagee}
//                 onChange={(e) => setMessagee(e.target.value)}
//                 placeholder="Type your message..."
//               />
//               <button onClick={postMessage}>Send Message</button>
//             </div> */}
//             <div className="chat-input">
//               <form
//                 onSubmit={(e) => {
//                   e.preventDefault();
//                   if (message) sendMessageHandler();
//                   e.target.elements.message.value = "";
//                 }}
//               >
//                 <input
//                   type="text"
//                   defaultValue={message}
//                   onChange={(event) => setMessage(event.target.value)}
//                   placeholder="Type your message..."
//                   name="message"
//                 />
//                 <button type="submit">
//                   <img
//                     src="https://www.svgrepo.com/show/498393/send-2.svg"
//                     alt=""
//                   />
//                 </button>
//               </form>
//             </div>
//           </section>
//         </div>
//       </section>
//     </Container>
//   );
// }

// export const getServerSideProps = async (context) => {
//   const { params, req, res, query } = context;
//   const { username, room_id } = params;


//   let requestOptions = reqOptions("GET", null);
//   const result = await fetch(
//     `${HOST_URL()}/api/v1/chats/room/${room_id}/messages/`,
//     requestOptions
//   );

//   const dataset = await result.json();
//   console.log(dataset);

//   return {
//     props: { objects: dataset, room_id: room_id },
//   };
// };

// let Container = styled.section`
//   position: relative;
//   margin: 50px auto;
//   .chat-body {
//     height: 70vh;
//     padding: 20px;
//     .message {
//       p {
//         margin: 0;
//       }
//     }
//   }
//   .sent {
//     background-color: blue;
//     max-width: 300px;
//     min-width: 100px;
//     border-radius: 10px;
//     margin-left: auto;
//     color: white;
//     p {
//       color: white;
//     }
//   }
//   .received {
//     max-width: 300px;
//     min-width: 100px;
//     border-radius: 10px;
//     background-color: #f3f3f3;
//   }
//   .chat-input {
//     position: relative;
//     padding: 20px;
//     button {
//       margin: 0;
//       position: absolute;
//       right: 20px;
//       padding: 0;
//     }
//     img {
//       width: 50px;
//       height: 50px;
//       border-radius: 50px;
//       padding: 10px;
//       &:hover {
//         background-color: #ccc;
//       }
//     }
//   }
//   .messageTray {
//     border: 1px solid rgba(44, 51, 58, 0.2);
//     border-radius: 5px;
//     .chat-header {
//       display: flex !important;
//       padding: 20px;
//       background: #f4f4f4;
//       h3 {
//         margin-bottom: 5px;
//         font-weight: 600;
//         font-size: 20px;
//         line-height: 22px;
//       }
//       p {
//         margin: 0;
//         font-weight: 300;
//         font-size: 14px;
//         line-height: 24px;
//       }
//       img {
//         margin-right: 20px;
//         width: 50px;
//         height: 50px;
//         border-radius: 50%;
//         object-fit: cover;
//         display: inline-block;
//       }
//     }
//   }
//   .dream_chats {
//     padding: 20px;
//     display: flex;
//     cursor: pointer;

//     justify-content: space-between;
//     span {
//       width: 50px;
//       height: 50px;
//       font-size: 30px;
//       margin-top: 3px;
//       text-align: center;
//       padding: 10px;
//       border-radius: 50%;
//       &:hover {
//         background-color: var(--Magnolia);
//       }
//     }
//     h2 {
//       font-size: 25px;
//       margin-bottom: 10px;
//       font-weight: bold;
//       display: inline-block;
//       margin-right: auto;
//     }
//   }
//   .already_in {
//     .chat-list {
//       border: 1px solid #ccc;
//       background: #ffffff;
//       box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.15),
//         0px 2px 8px rgba(0, 0, 0, 0.15);
//       border-radius: 5px;

//       .chat-item {
//         cursor: pointer;
//         margin: 0;
//         div {
//           border: 1px solid rgba(44, 51, 58, 0.15);
//           border-radius: 5px 5px 0px 0px;
//           display: flex;
//           padding: 15px;
//           h3 {
//             font-weight: 600;
//             font-size: 16px;
//             line-height: 22px;
//             margin-bottom: 0px;
//           }
//           p {
//             margin: 0;
//           }
//           img {
//             margin-right: 20px;
//             width: 50px;
//             height: 50px;
//             border-radius: 50%;
//             object-fit: cover;
//           }
//         }
//       }
//       .active {
//         div {
//           background: linear-gradient(
//             93.48deg,
//             #ee611a -25.93%,
//             #9f3eff 57.01%,
//             #4dafec 111.22%
//           );
//           color: white;

//           h3,
//           p {
//             color: white;
//           }
//         }
//       }
//     }
//     .chat-window {
//     }
//     @media (min-width: 1108px) {
//       //   background: yellow;
//       display: flex;
//       justify-content: space-between;
//       margin: 0px auto;
//       .chat-list {
//         width: 20%;
//       }
//       .chat-window {
//         width: 75%;
//         margin: 0px auto;
//       }
//     }
//   }
//   .swing-in-left-fwd {
//     -webkit-animation: swing-in-left-fwd 0.5s
//       cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
//     animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
//       both;
//   }
//   /* ----------------------------------------------
//  * Generated by Animista on 2023-5-1 15:33:4
//  * Licensed under FreeBSD License.
//  * See http://animista.net/license for more info. 
//  * w: http://animista.net, t: @cssanimista
//  * ---------------------------------------------- */

//   /**
//  * ----------------------------------------
//  * animation swing-in-left-fwd
//  * ----------------------------------------
//  */
//   @-webkit-keyframes swing-in-left-fwd {
//     0% {
//       -webkit-transform: rotateY(100deg);
//       transform: rotateY(100deg);
//       -webkit-transform-origin: left;
//       transform-origin: left;
//       opacity: 0;
//     }
//     100% {
//       -webkit-transform: rotateY(0);
//       transform: rotateY(0);
//       -webkit-transform-origin: left;
//       transform-origin: left;
//       opacity: 1;
//     }
//   }
//   @keyframes swing-in-left-fwd {
//     0% {
//       -webkit-transform: rotateY(100deg);
//       transform: rotateY(100deg);
//       -webkit-transform-origin: left;
//       transform-origin: left;
//       opacity: 0;
//     }
//     100% {
//       -webkit-transform: rotateY(0);
//       transform: rotateY(0);
//       -webkit-transform-origin: left;
//       transform-origin: left;
//       opacity: 1;
//     }
//   }

//   .abs_this {
//     position: absolute;
//     top: 0;
//     width: 100%;
//     height: 100%;

//     background-color: rgba(0, 0, 0, 0.2) !important;
//     .modal {
//       max-width: 600px !important;
//       margin: 100px auto !important;
//       background-color: var(--White);
//       padding: 20px !important;
//       padding: 0 20px;
//       h2 {
//         font-weight: 600;
//         font-size: 25px;
//         line-height: 40px;
//         margin-bottom: 20px;
//       }
//       ul {
//         box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.05),
//           0px 2px 8px rgba(0, 0, 0, 0.05);
//         border-radius: 5px;
//         li {
//           cursor: pointer !important;
//           margin: 0;
//           padding: 10px 15px;
//           &:hover {
//             background-color: var(--Magnolia);
//           }
//         }
//       }
//     }
//   }
//   .default {
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     height: 90vh;
//   }
//   .empty_chat {
//     max-width: 380px;
//     margin: 0 auto;
//     padding: 0 20px;
//     text-align: center;
//     button {
//       background: var(--Main-Gradient);
//       color: #fff; /* set the text color to white for better visibility */
//       padding: 10px 20px; /* adjust padding according to your design */
//       border: none; /* remove border */
//       border-radius: 5px;
//       max-width: 250px;
//       margin-top: 20px;
//     }
//     img {
//       width: 140px;
//       height: 140px;
//       margin-bottom: 10px;
//     }
//     p {
//       text-align: center;
//     }
//     h3 {
//       font-weight: 600;
//       font-size: 20px;
//       line-height: 30px;
//       margin-bottom: 10px;
//     }
//   }
// `;
