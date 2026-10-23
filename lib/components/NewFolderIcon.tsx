import React from "react";

const NewFolderIcon = ({ onClick }: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rfm-folder-icon-container"
      aria-label="Create new folder"
    >
      <span className="rfm-folder-icon-span">+</span>
    </button>
  );
};

export default NewFolderIcon;
