// import React, { useState, useEffect } from "react";
// import io from "socket.io-client";
// import { HOST_URL } from "../assets/js/help_func";
// import WebSocket from "ws";

// const ChatRoom = () => {
// 	const [socket, setSocket] = useState(null);
// 	const [message, setMessage] = useState("");
// 	const [chatHistory, setChatHistory] = useState([]);

// 	useEffect(() => {
// 		const ws = new WebSocket(`ws://127.0.0.1:8001/ws/chat/noaholatoyew`);
// 		ws.onopen = () => {
// 			console.log("WebSocket connected");

// 			// Send a message to the server
// 			ws.send("Hello, server!");
// 		};

// 		ws.onmessage = (event) => {
// 			console.log("Received message:", event.data);
// 		};

// 		// Clean up the WebSocket connection on component unmount
// 		return () => {
// 			ws.close();
// 		};
// 	}, []);

// 	const handleSubmit = (event) => {
// 		event.preventDefault;
// 		ws.send(
// 			JSON.stringify({
// 				message: message,
// 			})
// 		);
// 		messageInputDom.value = "";
// 	};

// 	return (

// 	);
// };

// export default ChatRoom;

import React, { useState, useEffect, useRef } from "react";
import { getCookie } from "../assets/js/help_func";
// import { connect } from "react-redux";
// import WebSocketInstance from "./websocket";
// import Hoc from "../hoc/hoc";

const Chat = (props) => {
	const [message, setMessage] = useState("");
	const [webSocket, setWebSocket] = useState(null);
	const messagesEndRef = useRef(null);
	const [chatHistory, setChatHistory] = useState([]);

	useEffect(() => {
		const initialiseChat = () => {
			const socket = new WebSocket(`ws://127.0.0.1:8000/ws/chat/noaholatoye/`);
			// const socket = new WebSocket(
			// 	`ws://127.0.0.1:8000/ws/chat/${getCookie(
			// 		"u_id"
			// 	)}-addIDs-2489514a-c815-4c47-9108-10072a8f1218/?token=${getCookie(
			// 		"access"
			// 	)}/`
			// );

			socket.onopen = () => {
				console.log("Connection is made");
				// WebSocketInstance.fetchMessages("chatID", "chatID");
			};

			socket.onmessage = (event) => {
				// Handle incoming messages
				console.log("Incoming Message");
				console.log(event);
			};

			socket.onclose = () => {
				console.log("Connection is closed");
			};

			setWebSocket(socket);
		};

		initialiseChat();

		// Clean up the WebSocket connection when the component unmounts
		return () => {
			if (webSocket) {
				webSocket.close();
			}
		};
	}, []);

	const sendMessageHandler = (e) => {
		e.preventDefault();
		const messageObject = {
			// from: props.username,
			message: message,
			// chatId: props.match.params.chatID,
		};
		webSocket.send(JSON.stringify(messageObject));
		setMessage("");
	};

	// Rest of the component code...

	return (
		<div>
			<h1>Chat Room</h1>
			<ul>
				{chatHistory.map((message, index) => (
					<li key={index}>{message}</li>
				))}
			</ul>
			<form onSubmit={sendMessageHandler}>
				<input
					type="text"
					value={message}
					onChange={(event) => setMessage(event.target.value)}
				/>
				<button type="submit">Send</button>
			</form>
		</div>
	);
};

// const mapStateToProps = (state) => {
// 	return {
// 		username: username,
// 		messages: messages,
// 	};
// };

export default Chat;
