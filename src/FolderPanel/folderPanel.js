import "./folderPanel.css";
import { FolderRows } from "./FolderRows";
import { useSelector } from "react-redux";
import { useState } from "react";

export const FolderPanel = ({ updateTab, currentTab }) => {
  const tabList = useSelector((state) => state.messages.tabList);
  const [folderExpanded, setfolderExpanded] = useState(true);
  return (
    <div className="folder-panel">
      <div
        className="folder-toggle-container"
        onClick={() => setfolderExpanded((value) => !value)}
      >
        <img
          className="folder-toggle"
          src="/assets/controls.png"
          alt="toogle"
        />
      </div>
      {Object.keys(tabList).map((tab, index) => (
        <FolderRows
          key={index}
          label={tab}
          count={tabList[tab]}
          folderExpanded={folderExpanded}
          updateTab={updateTab}
          currentTab={currentTab}
        />
      ))}
    </div>
  );
};
