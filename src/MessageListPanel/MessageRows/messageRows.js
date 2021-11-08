import "./messageRows.css";

export const MessageRows = ({
  flagged,
  date,
  message,
  unread,
  from,
  id,
  handleMsgRead,
  handleMsgFlag,
  handleMsgDelete,
  folder
}) => {
  return (
    <div
      className={`message-row ${unread ? "bold-font" : ""}`}
      onClick={() => {
        if (unread) handleMsgRead(id);
      }}
    >
      <div
        className={flagged ? "message-flag" : "message-unflag"}
        onClick={(e) => {
          e.stopPropagation();
          handleMsgFlag(id);
        }}
      ></div>
      <div className="message-content">
        <div className="message-body">
          <div className="message">{message}</div>
          {unread && <div className="message-count">1</div>}
          <div className="message-date">{date}</div>
        </div>
        <div className="message-from">
          <img
            className="message-contact"
            src="https://img.icons8.com/ios/24/000000/topic.png"
            alt="contacts"
          />
          <span className="message-contact-no">{from}</span>
          {folder !== "deleted" && (
            <div className="delete-message-container">
              <img
                onClick={(e) => {
                  e.stopPropagation();
                  handleMsgDelete(id);
                }}
                src="/assets/deleted.png"
                alt="delete"
                className="delete-message"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
