import { useEffect, useState, useRef } from "react";
import "./App.css";
import { useSpeech } from "react-text-to-speech";
import { Rating } from "./Rating";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isBad, setIsBad] = useState(false);

  const { start: nameStart } = useSpeech({ text: "Name" });
  const { start: emailStart } = useSpeech({ text: "Email address" });
  const { start: textStart } = useSpeech({ text: "Your message." });
  const { start: sendStart } = useSpeech({ text: "Sending..." });
  const { start: byeStart } = useSpeech({ text: "Have a nice day!" });

  const [formText, setFormText] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    nameStart();
  }, [name]);

  useEffect(() => {
    emailStart();
  }, [email]);

  useEffect(() => {
    textStart();
  }, [formText]);

  function pxToNumber(px: string) {
    return parseFloat(px.replace("px", ""));
  }

  function numberToPx(number: number) {
    return `${number}px`;
  }

  function random(max: number) {
    return Math.floor(Math.random() * max);
  }

  function handleFormTextChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    setFormText(e.target.value);
    const oriValue = pxToNumber(e.target.style.marginBottom);

    const topOrBottom = random(2);

    if (topOrBottom === 0) {
      e.target.style.marginTop = numberToPx(oriValue + random(25));
      setTimeout(() => {
        e.target.style.marginTop = numberToPx(0);
      }, 200);
      return;
    } else {
      e.target.style.marginBottom = numberToPx(oriValue + random(25));
      setTimeout(() => {
        e.target.style.marginBottom = numberToPx(0);
      }, 200);
      return;
    }
  }

  if (isBad) {
    return <div>BAD</div>
  }

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
        <textarea
          name="text"
          id="text"
          placeholder="Enter text here"
          value={formText}
          ref={textAreaRef}
          style={{ marginBottom: "0px" }}
          className="border-2 m-8 resize-none"
          onChange={(e) => handleFormTextChange(e)}
        ></textarea>
        <button
          className="relative mx-auto mt-8"
          onPointerEnter={() => sendStart()}
          onClick={(e) => {
            e.preventDefault();
            byeStart();
          }}
        >
          <span className="text-6xl absolute top-0 left-0  animate-spin">
            🎣
          </span>
          <span className="absolute top-0 left-0 text-2xl">Send</span>
        </button>
      </div>
      <div>
        <div className="text-2xl mt-12 mb-4">Rate your experience!</div>
        <Rating setIsBad={setIsBad}/>
      </div>
    </div>
  );
}

export default App;
