import { combineReducers } from "redux";
import { actionTypes } from "./action";
import { messages } from "./messageList";
const initState = {
  inbox: [],
  flagged: [],
  deleted: [],
  spam: [],
  tabList: {
    inbox: 0,
    flagged: 0,
    deleted: 0,
    spam: 0
  }
};

const messageReducer = (state = initState, action) => {
  switch (action.type) {
    case actionTypes.getAllMessages: {
      messages.sort((a, b) => (a.date < b.date ? 1 : -1));
      const inbox = [];
      const flagged = [];
      const deleted = [];
      const spam = [];
      let unread = 0;
      messages.map((value) => {
        if (value.folder === "inbox") {
          inbox.push(value);
          if (value.flagged) {
            flagged.push(value);
          }
          if (value.unread) unread += 1;
        } else if (value.folder === "deleted") deleted.push(value);
        else if (value.folder === "spam") spam.push(value);
        return value;
      });
      const tabList = {
        inbox: unread,
        deleted: deleted.length,
        flagged: flagged.length,
        spam: spam.length
      };

      return {
        ...state,
        inbox,
        flagged,
        deleted,
        spam,
        tabList
      };
    }
    case actionTypes.readMessage: {
      const inbox = state.inbox.map((value) => {
        if (value.id === action.payload.messageId) value.unread = undefined;
        return value;
      });
      const tabList = { ...state.tabList };
      tabList.inbox -= 1;
      return {
        ...state,
        inbox,
        tabList
      };
    }
    case actionTypes.changeFlagMessage: {
      const tabList = { ...state.tabList };
      const inbox = state.inbox.map((value) => {
        if (value.id === action.payload.messageId) {
          value.flagged = !value.flagged;
          if (value.flagged) tabList.flagged += 1;
          else tabList.flagged -= 1;
        }
        return value;
      });
      return {
        ...state,
        inbox,
        tabList
      };
    }
    case actionTypes.deleteMessage: {
      const inbox = [];
      const deleted = [...state.deleted];
      const tabList = { ...state.tabList };
      state.inbox.map((value) => {
        if (value.id === action.payload.messageId) {
          value.folder = "deleted";
          tabList.deleted += 1;
          if (value.unread) tabList.inbox -= 1;
          if (value.flagged) tabList.flagged -= 1;
          deleted.push(value);
          return value;
        }
        inbox.push(value);
        return value;
      });
      deleted.push();
      return {
        ...state,
        inbox,
        deleted,
        tabList,
        flagged: state.flagged.filter(
          (value) => value.id !== action.payload.messageId
        )
      };
    }
    default:
      return state;
  }
};

export const rootReducer = combineReducers({
  messages: messageReducer
});
