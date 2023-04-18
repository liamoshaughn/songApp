import React, { useState } from "react";
import { sendMessage } from "../../services/api";

export const ClientComponent = () => {
  const [message, setMessage] = useState("");

  // Handler for connecting to the WebSocket server

  return (
    <div>
      <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={() => sendMessage(message)}>Send</button>
    </div>
  );
};
