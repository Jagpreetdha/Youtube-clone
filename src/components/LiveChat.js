import { useEffect, useState } from "react";
import ChatMessage from "./ChatMessage";
import { useDispatch, useSelector } from "react-redux";
import { addMessage } from "../utils/chatSlice";
import generateRandomName from "../utils/helper";

function LiveChat() {
  const [liveMessage, setLiveMessage] = useState();
  const dispatch = useDispatch();
  const chat = useSelector((store) => store.chat.messages);
  useEffect(function () {
    const i = setInterval(() => {
      dispatch(
        addMessage({
          name: generateRandomName(),
          message: "Implementing API Polling using useInterval 😁",
        })
      );
    }, 1000);
    return () => clearInterval(i);
  }, []);
  return (
    <div className="m-6 mr-4 ml-4 ">
      Live Chat
      <div className="w-full border border-black h-[550px] p-4 bg-gray-100 rounded-lg overflow-y-scroll flex flex-col-reverse">
        {chat.map((c) => (
          <ChatMessage name={c.name} message={c.message} />
        ))}
      </div>
      <form
        className="w-full p-2 mt-2 rounded-lg border border-black flex items-center"
        onSubmit={(e) => {
          e.preventDefault();
          dispatch(
            addMessage({ name: generateRandomName(), message: liveMessage })
          );
        }}>
        <input
          type="text"
          className="w-80 border border-black p-2"
          value={liveMessage}
          onChange={(e) => setLiveMessage(e.target.value)}
        />
        <button className="px-2 py-1 mx-2 bg-green-100 rounded-lg">Send</button>
      </form>
    </div>
  );
}

export default LiveChat;
