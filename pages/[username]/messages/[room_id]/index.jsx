import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import LoginRequired from "../../../../components/forms/LoginRequired";
import {
  HOST_URL,
  fetchAPI,
  getCookie,
  reqOptions,
} from "../../../../assets/js/help_func";
import { format, isToday, isYesterday } from "date-fns";

export default function Home({ objects, room_id, newRoomDataset }) {
  LoginRequired();
  const router = useRouter();
  const { sg } = router.query;

  const authToken = getCookie("access");

  const [chatListt, setChatListt] = useState();
  const [chatList, setChatList] = useState(objects);
  const [message, setMessage] = useState([]);
  const [last_message, setLastMessage] = useState(null);
  const [chatroom, setChatRoom] = useState(null);
  const [timestamp, setTimestamp] = useState(null);
  const [webSocket, setWebSocket] = useState(null);
  const [data, setData] = useState([]);
  const [roomDetail, setRoomDetail] = useState();
  const [room_name, setRoomName] = useState(null);
  // const [room_name, setRoomName] = useState(getCookie("room_name"));
  const [rooms, setRooms] = useState(null);
  const [senderName, setSenderName] = useState(getCookie("username"));
  const [connection, setConnection] = useState(false);

  {
    console.log(chatList);
  }
  // console.log(objects);
  // console.log(chatList);
  // console.log(room_name)
  // console.log(chatroom);

  // Convert the timestamp string to a Date object
  // const dateObject = new Date(timestamp);

  // // Format the time difference from now
  // const isRecent = isToday(dateObject) || isYesterday(dateObject);

  // // Format the timestamp accordingly
  // const formattedTimestamp = isRecent
  //   ? format(dateObject, "h:mm a")
  //   : isToday(dateObject)
  //   ? "Today"
  //   : isYesterday(dateObject)
  //   ? "Yesterday"
  //   : format(dateObject, "MMM d, yyyy h:mm a");

  const closeConnection = () => {
    if (webSocket) {
      webSocket.close();
    }
  };

  // SOCKET CONECTION AND INITIALIZATION
  useEffect(() => {
    const initialiseChat = async () => {
      if (getCookie("username") === room_name) {
        alert("You can't initiate chat with yourself");
      } else if (!connection) {
        const socket = new WebSocket(
          `${
            process.env.NEXT_PUBLIC_NODE_ENV === "development"
              ? "ws://127.0.0.1:8000"
              : "wss://instasaw.optimalinfographics.com"
          }/ws/chat/${senderName}/${room_name}/`
        );
        console.log(room_name);
        console.log(senderName);
        console.log(socket);

        socket.onopen = (e) => {
          console.log("Connection is made", e);
          setWebSocket(socket);
          // socket.send(JSON.stringify({ type: "fetch_message" }));
          setConnection(true);
        };

        socket.onmessage = (event) => {
          const newMessage = JSON.parse(event.data);
          console.log(newMessage);
          // console.log("on message: " + newMessage);
          setChatList((prevMessages) => [...prevMessages, newMessage]);
        };

        socket.onerror = (err) => console.error(err);

        socket.onclose = () => {
          console.log("Connection is closed");
          setConnection(false);
        };

        setWebSocket(socket);
      }
    };

    initialiseChat();

    // Clean up the WebSocket connection when the component unmounts
    return () => {
      closeConnection();
    };
    // }, []);
  }, [room_name, senderName, connection]);

  //  GET ALL ROOMS
  const AllUsersInRoom = async (option) => {
    try {
      const token = getCookie("access");

      // Initiate the payment
      const roomResult = await fetch(`${HOST_URL()}/api/v1/chats/rooms/`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Check if the payment initiation was successful
      if (roomResult.status === 200) {
        const data = await roomResult.json();
        // Avoid getting the last array value which belongs to the logged in user
        setRooms(data.slice(0, -1));
      } else {
        console.log("failed to");
      }
    } catch (error) {
      console.log("failed");
    }
  };

  // GET ROOM DETAILS
  const roomDetails = async (option) => {
    try {
      const token = getCookie("access");

      // Initiate the payment
      const roomDetailResult = await fetch(
        `${HOST_URL()}/api/v1/chats/room_detail/${room_id}/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Check if the payment initiation was successful
      if (roomDetailResult.status === 200) {
        const data = await roomDetailResult.json();
        setRoomDetail(data);
        setRoomName(data.room_name);
      } else {
        console.log("failed to");
      }
    } catch (error) {
      console.log("failed");
    }
  };

  // GET THE LAST MESSAGE FROM A USER
  const lastMessage = async () => {
    try {
      const token = getCookie("access");

      const lastMessageResult = await fetch(
        `${HOST_URL()}/api/v1/chats/room/${room_id}/last_message/`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (lastMessageResult.status === 200) {
        const data = await lastMessageResult.json();
        setLastMessage(data.content);
        setChatRoom(data.chatroom);
        setTimestamp(data.timestamp);
      } else {
        console.log("failed to");
      }
    } catch (error) {
      console.log("failed");
    }
  };

  //  GET THE CURRENT STATUS OF THE USER
  const AllChats = async (txt) => {
    const requestOptions = reqOptions("GET", null, true);
    let access_url = HOST_URL() + `/api/v1/chats/${room_id}/users/status/`;

    // Assuming fetchAPI returns a promise
    try {
      const data = await fetchAPI(setData, access_url, requestOptions, true);
      // console.log(data);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Handle errors if needed
    }
  };

  //CHECK IF SOCKET IS OPEN
  const isSocketOpen = (ws) => {
    return ws.readyState === ws.OPEN;
  };

  useEffect(() => {
    AllUsersInRoom();
    AllChats();
    roomDetails();
    lastMessage();
    // You may include dependencies if needed
  }, [room_id]); // Include dependencies if needed

  // FUNCTION TO POST MESSAGE ON THE CHAT VIA WEBSOCKETS
  const sendMessageHandler = () => {
    const messageObject = {
      token: getCookie("access"),
      room_name: room_name,
      sender: senderName,
      message: message,
      timestamp: Date.now(),
      type: "chat_message",
    };

    if (webSocket && isSocketOpen(webSocket)) {
      webSocket.send(JSON.stringify(messageObject));
      setMessage(""); // Clear the input field after sending the message
      // setChatList([...chatList, { ...messageObject, message: message }]);
      setChatListt([...chatList, { ...messageObject, message: message }]);
    } else {
      console.log("WebSocket connection is not open");
    }
  };

  return (
    <Container>
      <section className="already_in container">
        <ul className="chat-list">
          <div className="dream_chats">
            <h2>Chats</h2>
            <span
              onClick={() => router.push(`/${senderName}/messages/?sg=add`)}
            >
              +
            </span>
          </div>

          {Array.isArray(rooms) ? (
            rooms.map((user, index) => (
              <li
                key={index}
                className={`chat-item ${
                  user.id === getCookie("u_id") ? "active" : ""
                }`}
              >
                <Link href={`/${senderName}/messages/${user.id}`}>
                  <div>
                    <img src={user?.picture} alt="" />
                    <article>
                      <div className="user__name">
                        <h3>{user?.user_2.first_name}</h3>
                        {user.id === chatroom ? (
                          <p className="time__stamp">sdfsdfc</p>
                          // <p className="time__stamp">{formattedTimestamp}</p>
                        ) : (
                          ""
                        )}
                      </div>
                      {user.id === chatroom ? <p className="last__message">{last_message}</p> : ""}
                    </article>
                  </div>
                </Link>
              </li>
            ))
          ) : (
            <div>No chat found</div>
          )}
        </ul>

        <div className="chat-window swing-in-left-fwd">
          <section className="messageTray swing-in-left-fwd">
            <div className="chat-header">
              <img src={data[0]?.picture} alt="" />
              <div>
                <h3>{roomDetail?.user_2.first_name}</h3>
                <p>last seen today</p>
              </div>
            </div>

            <div className="chat-body">
              {Array.isArray(chatList) ? (
                chatList?.map((message, index) => (
                  <div
                    className={`message ${
                      message.from_user === getCookie("u_id")
                        ? "received"
                        : "sent"
                    }`}
                  >
                    <p>{message.content}</p>
                    <p>{message.message}</p>
                  </div>
                ))
              ) : (
                <div>No message found</div>
              )}
            </div>
            <div className="chat-input">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (message) sendMessageHandler();
                  e.target.elements.message.value = "";
                }}
              >
                <input
                  type="text"
                  defaultValue={message}
                  onChange={(event) => setMessage(event.target.value)}
                  placeholder="Type your message..."
                  name="message"
                />
                <button type="submit">
                  <img
                    src="https://www.svgrepo.com/show/498393/send-2.svg"
                    alt=""
                  />
                </button>
              </form>
            </div>
          </section>
        </div>
      </section>
    </Container>
  );
}

export const getServerSideProps = async (context) => {
  const { params, req, res, query } = context;
  const { username, room_id } = params;

  let requestOptions = reqOptions("GET", null);
  let requestOptions2 = reqOptions("GET", null);

  // console.log(requestOptions2)

  const result = await fetch(
    `${HOST_URL()}/api/v1/chats/room/${room_id}/messages/`,
    requestOptions
  );

  const getRoom = await fetch(
    HOST_URL() + `/api/v1/chats/room_detail/${room_id}/`,
    requestOptions2
  );

  const dataset = await result.json();
  // const newRoomDataset = await getRoom.json();
  console.log(dataset);

  return {
    props: {
      objects: dataset,
      room_id: room_id,
      // newRoomDataset: newRoomDataset,
    },
  };
};

let Container = styled.section`
  position: relative;
  margin: 50px auto;
  .chat-body {
    // height: 70vh;
    padding: 20px;
    .message {
      p {
        margin: 0;
      }
    }
  }
  .sent {
    background-color: blue;
    max-width: 300px;
    min-width: 100px;
    border-radius: 10px;
    margin-left: auto;
    color: white;
    p {
      color: white;
    }
  }
  .received {
    max-width: 300px;
    min-width: 100px;
    border-radius: 10px;
    background-color: #f3f3f3;
  }
  .chat-input {
    position: relative;
    padding: 20px;
    button {
      margin: 0;
      position: absolute;
      right: 20px;
      padding: 0;
    }
    img {
      width: 50px;
      height: 50px;
      border-radius: 50px;
      padding: 10px;
      &:hover {
        background-color: #ccc;
      }
    }
  }
  .messageTray {
    border: 1px solid rgba(44, 51, 58, 0.2);
    border-radius: 5px;
    .chat-header {
      display: flex !important;
      padding: 20px;
      background: #f4f4f4;
      h3 {
        margin-bottom: 5px;
        font-weight: 600;
        font-size: 20px;
        line-height: 22px;
      }
      p {
        margin: 0;
        font-weight: 300;
        font-size: 14px;
        line-height: 24px;
      }
      img {
        margin-right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        object-fit: cover;
        display: inline-block;
      }
    }
  }
  .dream_chats {
    padding: 20px;
    display: flex;
    cursor: pointer;

    justify-content: space-between;
    span {
      width: 50px;
      height: 50px;
      font-size: 30px;
      margin-top: 3px;
      text-align: center;
      padding: 10px;
      border-radius: 50%;
      &:hover {
        background-color: var(--Magnolia);
      }
    }
    h2 {
      font-size: 25px;
      margin-bottom: 10px;
      font-weight: bold;
      display: inline-block;
      margin-right: auto;
    }
  }
  .already_in {
    .chat-list {
      border: 1px solid #ccc;
      background: #ffffff;
      box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.15),
        0px 2px 8px rgba(0, 0, 0, 0.15);
      border-radius: 5px;

      .chat-item {
        cursor: pointer;
        margin: 0;
        div {
          border: 1px solid rgba(44, 51, 58, 0.15);
          border-radius: 5px 5px 0px 0px;
          display: flex;
          padding: 15px;
          h3 {
            font-weight: 600;
            font-size: 16px;
            line-height: 22px;
            margin-bottom: 0px;
          }
          p {
            margin: 0;
          }
          img {
            // margin-right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
          }
        }
        .time__stamp {
          font-size: 10px;
        }
        .user__name {
          display: flex;
          justify-content: space-between;
          width: 197px;
          border: none;
        }
        .last__message {
          margin: 0 15px;
        }
      }
      .active {
        div {
          background: linear-gradient(
            93.48deg,
            #ee611a -25.93%,
            #9f3eff 57.01%,
            #4dafec 111.22%
          );
          color: white;

          h3,
          p {
            color: white;
          }
        }
      }
    }
    .chat-window {
    }
    @media (min-width: 1108px) {
      //   background: yellow;
      display: flex;
      justify-content: space-between;
      margin: 0px auto;
      .chat-list {
        width: 20%;
      }
      .chat-window {
        width: 75%;
        margin: 0px auto;
      }
    }
  }
  .swing-in-left-fwd {
    -webkit-animation: swing-in-left-fwd 0.5s
      cubic-bezier(0.175, 0.885, 0.32, 1.275) both;
    animation: swing-in-left-fwd 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275)
      both;
  }
  /* ----------------------------------------------
 * Generated by Animista on 2023-5-1 15:33:4
 * Licensed under FreeBSD License.
 * See http://animista.net/license for more info.
 * w: http://animista.net, t: @cssanimista
 * ---------------------------------------------- */

  /**
 * ----------------------------------------
 * animation swing-in-left-fwd
 * ----------------------------------------
 */
  @-webkit-keyframes swing-in-left-fwd {
    0% {
      -webkit-transform: rotateY(100deg);
      transform: rotateY(100deg);
      -webkit-transform-origin: left;
      transform-origin: left;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      -webkit-transform-origin: left;
      transform-origin: left;
      opacity: 1;
    }
  }
  @keyframes swing-in-left-fwd {
    0% {
      -webkit-transform: rotateY(100deg);
      transform: rotateY(100deg);
      -webkit-transform-origin: left;
      transform-origin: left;
      opacity: 0;
    }
    100% {
      -webkit-transform: rotateY(0);
      transform: rotateY(0);
      -webkit-transform-origin: left;
      transform-origin: left;
      opacity: 1;
    }
  }

  .abs_this {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;

    background-color: rgba(0, 0, 0, 0.2) !important;
    .modal {
      max-width: 600px !important;
      margin: 100px auto !important;
      background-color: var(--White);
      padding: 20px !important;
      padding: 0 20px;
      h2 {
        font-weight: 600;
        font-size: 25px;
        line-height: 40px;
        margin-bottom: 20px;
      }
      ul {
        box-shadow: 0px -2px 8px rgba(0, 0, 0, 0.05),
          0px 2px 8px rgba(0, 0, 0, 0.05);
        border-radius: 5px;
        li {
          cursor: pointer !important;
          margin: 0;
          padding: 10px 15px;
          &:hover {
            background-color: var(--Magnolia);
          }
        }
      }
    }
  }
  .default {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 90vh;
  }
  .empty_chat {
    max-width: 380px;
    margin: 0 auto;
    padding: 0 20px;
    text-align: center;
    button {
      background: var(--Main-Gradient);
      color: #fff; /* set the text color to white for better visibility */
      padding: 10px 20px; /* adjust padding according to your design */
      border: none; /* remove border */
      border-radius: 5px;
      max-width: 250px;
      margin-top: 20px;
    }
    img {
      width: 140px;
      height: 140px;
      margin-bottom: 10px;
    }
    p {
      text-align: center;
    }
    h3 {
      font-weight: 600;
      font-size: 20px;
      line-height: 30px;
      margin-bottom: 10px;
    }
  }
`;
