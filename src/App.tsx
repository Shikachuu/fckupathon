import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useSpeech } from "react-text-to-speech";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const { start: nameStart } = useSpeech({ text: "Name" });
  const { start: emailStart } = useSpeech({ text: "Email address" });

  useEffect(() => {
    nameStart();
  }, [name]);

  useEffect(() => {
    emailStart();
  }, [email]);

  return (
    <div className="text-center mt-8">
      <h1 className="text-2xl">Contact us</h1>
      <div className="flex flex-col p-8">
        <input
          className="border-2 m-8"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="border-2 m-8"
          type="email"
          placeholder="me@here.io"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
    </div>
  );
}

export default App;
