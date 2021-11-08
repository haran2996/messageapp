import "./MessageListPanel.css";
import { useDispatch, useSelector } from "react-redux";
import { MessageRows } from "./MessageRows";
import {
  readMessageAction,
  changeFlagMessageAction,
  deleteMessageAction
} from "../action";
import { useState } from "react";
export const MessageListPanel = ({ currentTab }) => {
  const dispatch = useDispatch();
  const handleMessageRead = (messageId) => {
    dispatch(readMessageAction({ messageId }));
  };
  const handleMessageFlag = (messageId) => {
    dispatch(changeFlagMessageAction({ messageId }));
  };
  const handleMessageDelete = (messageId) => {
    dispatch(deleteMessageAction({ messageId }));
  };
  const [searchStr, setsearchStr] = useState("");
  const messagesList = {
    inbox: useSelector((state) => state.messages.inbox),
    flagged: useSelector((state) => state.messages.flagged),
    deleted: useSelector((state) => state.messages.deleted),
    spam: useSelector((state) => state.messages.spam)
  };
  const currentMsgList = messagesList[currentTab].filter((value) => {
    const message = value.message?.trim().toLowerCase();
    const from = value.from?.trim().toLowerCase();
    return (
      message?.includes(searchStr.trim().toLowerCase()) ||
      from?.includes(searchStr.trim().toLowerCase())
    );
  });
  return (
    <div className="message-list-panel">
      <div className="search-bar-header">
        <input
          value={searchStr}
          onChange={(e) => setsearchStr(e.target.value)}
          className="search-bar"
          type="text"
        />
        <span className="search-icon-container">
          <img className="search-icon" src="/assets/search.png" alt="search" />
        </span>
      </div>
      {currentMsgList.length > 0 ? (
        <div className="message-list">
          {currentMsgList.map((value) => (
            <MessageRows
              {...value}
              handleMsgRead={handleMessageRead}
              key={value.id}
              handleMsgFlag={handleMessageFlag}
              handleMsgDelete={handleMessageDelete}
            />
          ))}
        </div>
      ) : (
        <div className="empty-message">
          Your {currentTab} messages are empty
        </div>
      )}
    </div>
  );
};
