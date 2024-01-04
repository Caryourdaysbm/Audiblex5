import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import {
  HOST_URL,
  fetchAPI,
  getCookie,
  reqOptions,
  setCookie,
} from "../../../assets/js/help_func";
import AvatarImg from "../../../assets/images/image";
// import { Avatar } from "@chakra-ui/react";

// import Illustrate from "@/assets/images/illustration.png";

const userList = [
  {
    id: 1,
    name: "Alice",
    picture:
      "https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8bWFufGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60",
  },
  {
    id: 2,
    name: "Bob",
    picture:
      "https://media.istockphoto.com/id/1438969575/photo/smiling-young-male-college-student-wearing-headphones-standing-in-a-classroom.jpg?s=612x612&w=0&k=20&c=yNawJP9JGXU6LOL262ME5M1U2xxNKQsvT7F9DZhZCh4=",
  },
  {
    id: 3,
    name: "Charlie",
    picture:
      "https://media.istockphoto.com/id/1401711496/photo/businessman-working-in-a-hybrid-office.jpg?s=612x612&w=0&k=20&c=wqPokJmpSecetbN13awCtjI3c1GTih0b4C7CsdwzqV4=",
  },
];

const DEFAULT_MESSAGES = {
  1: [
    { id: 1, text: "Hello, how are you?", sender: "me", timestamp: Date.now() },
    {
      id: 2,
      text: "I am good, thank you. How about you?",
      sender: "other",
      timestamp: Date.now(),
    },
  ],
  2: [
    { id: 1, text: "Hey there!", sender: "other", timestamp: Date.now() },
    {
      id: 2,
      text: "Hi! How can I help you today?",
      sender: "me",
      timestamp: Date.now(),
    },
  ],
  3: [],
};

export default function Home({ receiver }) {
  const router = useRouter();
  const { sg } = router.query;
  const [username, setUsername] = useState(getCookie("username"));
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userId, setUserId] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [roomId, setRoomId] = useState(null);
  const [messages, setMessages] = useState(DEFAULT_MESSAGES);
  const [userData, setUserData] = useState(null);
  const [room_name, setRoomName] = useState();

  const [message, setMessage] = useState();

  const [webSocket, setWebSocket] = useState(null);
  const messagesEndRef = useRef(null);
  const [chatHistory, setChatHistory] = useState([]);

  // const [data, setData] = useState(null);
  const [data, setData] = useState([]);
  const [user, setUser] = useState(null);

  async function searchUserList(txt) {
    const requestOptions = reqOptions("GET", null, true);
    let access_url = HOST_URL() + `/api/v1/users/all-users/`;

    fetchAPI(setData, access_url, requestOptions, true);
    console.log(data);

    if (data != null) {
      setFilteredUsers(data);
      setUserId(data);
    }

    // const objects = {};
    // let requestOptions = reqOptions("GET", true);
    // const response = await fetch(
    // 	HOST_URL() + "/api/v1/users/all-users/",
    // 	requestOptions
    // ).then((res) => {
    // 	objects["status"] = res.status;
    // 	if (res.ok) return res.json();
    // 	else return { message: "No record" };
    // });

    // objects["data"] = await response;
    // setFilteredUsers(objects["data"])
  }

  const user_id = selectedUser;
  const roomName = user?.room_name;

  // create a new room with the second user that was clicked

  function createNewRoom(user_id) {
    const requestOptions = reqOptions("GET", null, true);
    let access_url =
      HOST_URL() + `/api/v1/chats/get_or_create_chat_room/${user_id}/`;
    fetchAPI(setUser, access_url, requestOptions, true);
    if (user != null) {
      setCookie("room_name", roomName, 1);
      return user.room_id;
    } else {
      return null;
    }
  }

  // THIS FUNCTION SEARCHES THE DATABASE FOR ALL USERS
  const handleSearch = (event) => {
    const { value } = event.target;
    setSearchTerm(value);
    searchUserList(value);

    // const filtered = userList.filter((user) =>
    const filtered = data.filter((user) =>
      user.first_name.toLowerCase().includes(value.toLowerCase())
    );
    // const filtered = searchUserList(value)
    setFilteredUsers(filtered);
  };

  // THIS SHOULD HAPPEN WHEN A USER IS CLICKED
  // console.log(selectedUser);
  console.log(roomId);
  // console.log(data);
  console.log(user);
  // console.log(user_id);
  // console.log(user?.room_name);
  console.log(roomName);

  const handleUserClick = (user) => {
    setIsModalOpen(false);
    setSelectedUser(user.id);

    // setSelectedUser(user.room_id);
    if (!chatList.some((u) => u.id === user.id)) {
      setChatList([...chatList, user]);
    }
    if (!messages[user.id]) {
      setMessages({
        ...messages,
        [user.id]: [],
      });
    }

    let un = createNewRoom(selectedUser);
    // let un = selectedUser;
    if (un !== null)
      // window.location.href = `/${username}/messages/${username}/${un}/`;
      window.location.href = `/${username}/messages/${un}/`;
  };

  const handleChatItemClick = (user) => {
    setSelectedUser(user);
  };

  // const handleSendMessage = (event) => {
  //   event.preventDefault();
  //   const message = event.target.elements.message.value.trim();
  //   if (message) {
  //     setMessages({
  //       ...messages,
  //       [selectedUser.id]: [
  //         ...messages[selectedUser.id],
  //         { text: message, sender: "me", timestamp: Date.now() },
  //       ],
  //     });
  //     event.target.elements.message.value = "";
  //   }
  // };

  return (
    <Container>
      <section className="already_in container">
        <div className="chat-window swing-in-left-fwd">
          <section className="default">
            <div className="empty_chat">
              <img
                src="https://www.svgrepo.com/show/496382/message-text-1.svg"
                alt=""
              />
              <h3>No Conversation yet!</h3>
              <p>
                It looking a little lonely in here. Click new message button to
                start a conversation.
              </p>
              <Link href={`/${username}/messages/?sg=add`}>
                <button className="get_started_with">Add new chat</button>
              </Link>
            </div>
          </section>
        </div>
      </section>
      {sg === "add" && (
        <section className="abs_this" onClick={() => setIsModalOpen(false)}>
          <div className="modal" onClick={(event) => event.stopPropagation()}>
            <h2>New Messages</h2>
            <input
              type="text"
              value={searchTerm}
              onChange={handleSearch}
              placeholder="Search Anyone ..."
            />
            {/* <li onClick={() => handleUserClick(user)}>{user.first_name} {user.last_name}</li> */}

            <ul>
              {Array.isArray(filteredUsers)
                ? filteredUsers.map((user) => (
                    <div key={user.id}>
                      <li
                        onClick={() => handleUserClick(user)}
                        className="flex__box"
                      >
                        {user.first_name} {user.last_name}
                        <img className="avatar__image" src={user.picture} />
                        {/* {user.picture ? (
                          <img
                            className="user__navbar--image"
                            src={user.picture}
                            alt=""
                          />
                        ) : (
                          // <img src={AvatarImg} />
                          <Avatar />
                        )} */}
                      </li>
                    </div>
                  ))
                : null}
            </ul>
          </div>
        </section>
      )}
    </Container>
  );
}
/*
export const searchUserList = async (context) => {
	const { params, req, res, query } = context;
	const { username } = params;
	return {
		props: {
			username: username,
		},
	};
}; */

let Container = styled.section`
  position: relative;
  margin: 50px auto;
  .chat-body {
    height: 70vh;
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
            margin-right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            object-fit: cover;
          }
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

  .avatar__image {
    border-radius: 19px;
    max-width: 7%;
    object-fit: cover;
    height: 34px;
  }

  .flex__box {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
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
