import "./styles.css";
import { FolderPanel } from "./FolderPanel";
import { MessageListPanel } from "./MessageListPanel";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { actionTypes } from "./action";
export default function App() {
  const dispatch = useDispatch();
  const [currentTab, setcurrentTab] = useState("inbox");
  useEffect(() => {
    dispatch({
      type: actionTypes.getAllMessages
    });
  });
  return (
    <>
      <div style={{ display: "flex" }}>
        <FolderPanel updateTab={setcurrentTab} currentTab={currentTab} />
        <MessageListPanel currentTab={currentTab} />
        <div></div>
      </div>
    </>
  );
}
