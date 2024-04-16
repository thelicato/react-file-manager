import React from "react";
import { useMemo } from "react";
// Context
import { useFileManager } from "../context";
// Components
import SvgIcon from "./SvgIcon";

interface IFileIcon {
  id: string;
  name: string;
  isDir: boolean;
}

const FileIcon = (props: IFileIcon) => {
  const { setCurrentFolder, onRefresh } = useFileManager();

  const handleClick = async () => {
    if (props.isDir) {
      setCurrentFolder(props.id);
      if (onRefresh !== undefined) {
        try {
          await onRefresh(props.id);
        } catch (e) {
          throw new Error("Error during refresh");
        }
      }
    }
  };

  const fileExtension = useMemo((): string => {
    if (!props.name.includes(".")) {
      return "";
    }

    const nameArray = props.name.split(".");
    return `.${nameArray[nameArray.length - 1]}`;
  }, [props.id]);

  return (
    <>
      <div onClick={handleClick} className="rfm-file-icon-container">
        <SvgIcon
          svgType={props.isDir ? "folder" : "file"}
          className="rfm-file-icon-svg"
        />
        <span className="rfm-file-icon-extension">{fileExtension}</span>
        <span className="rfm-file-icon-name">{props.name}</span>
      </div>
    </>
  );
};

export default FileIcon;
