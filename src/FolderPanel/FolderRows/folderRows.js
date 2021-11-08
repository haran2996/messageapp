import "./folderRows.css";

export const FolderRows = ({
  label,
  count,
  folderExpanded,
  updateTab,
  currentTab
}) => {
  return (
    <div
      className={label === currentTab ? "folder-rows-selected" : "folder-rows"}
      onClick={() => {
        updateTab(label);
      }}
    >
      <div className="folder-label-icon-container">
        <img
          className="folder-label-icon"
          src={`/assets/${label}.png`}
          alt={label}
        />
      </div>
      {folderExpanded && (
        <>
          <span
            style={{ width: count !== 0 ? "90px" : "115px" }}
            className="folder-label"
          >
            {label}
          </span>
          {count !== 0 && <span className="folder-label-count">{count}</span>}
        </>
      )}
    </div>
  );
};
