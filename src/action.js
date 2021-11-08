export const actionTypes = {
  getAllMessages: "GETALLMESSAGESLIST",
  deleteMessage: "DELETETHEMESSAGE",
  changeFlagMessage: "CHANGEFLAGTHEMESSAGE",
  readMessage: "READTHEMESSAGE"
};

export const getAllMessagesAction = () => {
  return {
    type: actionTypes.getAllMessages
  };
};

export const deleteMessageAction = (payload) => {
  return {
    type: actionTypes.deleteMessage,
    payload
  };
};

export const changeFlagMessageAction = (payload) => {
  return {
    type: actionTypes.changeFlagMessage,
    payload
  };
};

export const readMessageAction = (payload) => {
  return {
    type: actionTypes.readMessage,
    payload
  };
};
