import React from "react";

const NewFolderIcon = ({
  onClick,
}: React.AllHTMLAttributes<HTMLDivElement>) => {
  return (
    <div onClick={onClick} className="rfm-folder-icon-container">
      <span className="rfm-folder-icon-span">+</span>
    </div>
  );
};

export default NewFolderIcon;
