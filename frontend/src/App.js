import { useEffect, useRef } from "react";
import "./App.css";
import { io } from "socket.io-client";

function App() {
  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:5560");

    socket.current.on("connection", () => {
      console.log("connected to server");
    });
    console.log(socket.current);
  }, []);

  useEffect(() => {
    socket.current.emit("receive_message", (data) => {
      alert(data.message);
    });
  }, []);

  const emitATime = () => {
    socket.current.emit("message", new Date().getTime());
  };

  const sendMessage = () => {
    socket.current.emit("send_message", {
      message: {
        name: "kishor",
        age: 12,
      },
    });
  };

  return (
    <div className="App">
      <p>socket io app</p>
      <button style={{ marginRight: "3px" }} type="button" onClick={emitATime}>
        emit a time message
      </button>
      <button type="button" onClick={sendMessage}>
        Send a message
      </button>
    </div>
  );
}

export default App;
