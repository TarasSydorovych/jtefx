import React, { useState, useEffect, useRef } from "react";
import {
  collection,
  addDoc,
  query,
  orderBy,
  limit,
  onSnapshot,
} from "firebase/firestore";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { AiFillFile } from "react-icons/ai";
import { db } from "../../function/firebase";
import css from "./chat.module.css";
const ChatUser = ({ userId, id, currentUser, chatUser }) => {
  const storage = getStorage();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [file, setFile] = useState(null);
  const scrollRef = useRef(null);

  useEffect(() => {
    const fetchMessages = async () => {
      const chatId = [userId, id].sort().join("_");
      const messagesCollectionRef = collection(
        db,
        `messages/${chatId}/messages`
      );
      const q = query(messagesCollectionRef, orderBy("createdAt"), limit(50));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const fetchedMessages = [];
        querySnapshot.forEach((doc) => {
          fetchedMessages.push({ ...doc.data(), id: doc.id });
        });
        setMessages(fetchedMessages);
        scrollRef.current.scrollIntoView({ behavior: "smooth" });
      });

      return unsubscribe;
    };

    if (userId) {
      fetchMessages();
    }
  }, [id, userId]);

  const sendMessage = async (event) => {
    event.preventDefault();

    if (message.trim() === "") {
      alert("Enter a valid message");
      return;
    }

    const chatId = [userId, id].sort().join("_");

    // Handle file upload
    let downloadURL = "";
    if (file) {
      const storageRef = ref(storage, file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      try {
        await uploadTask;
        downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      } catch (error) {
        console.error("Error uploading file:", error);
        return;
      }
    }

    // Send the message
    try {
      const messagesCollectionRef = collection(
        db,
        `messages/${chatId}/messages`
      );
      await addDoc(messagesCollectionRef, {
        uid: id,
        recipientId: userId,
        message,
        createdAt: new Date().toISOString(),
        check: "false", // Assuming it's a regular user message
        downloadURL,
      });
      setMessage("");
      setFile(null);
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className={css.wrapChat}>
      <h2> Чат з користувачем: {chatUser.firstName}</h2>
      <div
        style={{
          height: "300px",
          overflowY: "scroll",
          border: "1px solid #ccc",
        }}
      >
        {messages.map((msg) => {
          let name;
          const uid = parseInt(msg.uid, 10);
          if (uid === currentUser.userId) {
            name = chatUser.firstName;
          }
          if (uid === chatUser.userId) {
            name = currentUser.firstName;
          }
          return (
            <div key={msg.id}>
              <strong>{name}:</strong> {msg.message} ({msg.createdAt})
              {msg.downloadURL && (
                <a href={msg.downloadURL} target="_blank" rel="noreferrer">
                  <AiFillFile className="iconFileIcon" />
                </a>
              )}
            </div>
          );
        })}
        <div ref={scrollRef}></div>
      </div>
      <div>
        <form onSubmit={sendMessage}>
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Enter your message..."
          />
          <label>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              accept=".doc, .docx, .xml, .jpeg, .png, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            />
            <span>Select a file</span>
          </label>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
};

export default ChatUser;
