import React, { useState } from "react";
// Context
import { FileManagerContext } from "./context";
// Components
import { Navbar, Workspace } from "./components";
// Types
import type { FileSystemType } from "./types";
import { ViewStyle } from "./types";

export interface IFileManagerProps {
  fs: FileSystemType;
  viewOnly?: boolean;
  onDoubleClick?: (id: string) => Promise<void>;
  onRefresh?: (id: string) => Promise<void>;
  onUpload?: (fileData: any, folderId: string) => Promise<void>;
  onCreateFolder?: (folderName: string) => Promise<void>;
  onDelete?: (fileId: string) => Promise<void>;
}

export const ReactFileManager = ({
  fs,
  viewOnly,
  onDoubleClick,
  onRefresh,
  onUpload,
  onCreateFolder,
  onDelete,
}: IFileManagerProps) => {
  const [currentFolder, setCurrentFolder] = useState<string>("0"); // Root folder ID must be "0"
  const [uploadedFileData, setUploadedFileData] = useState<any>();
  const [viewStyle, setViewStyle] = useState<ViewStyle>(ViewStyle.List);

  return (
    <FileManagerContext.Provider
      value={{
        fs: fs,
        viewStyle: viewStyle,
        setViewStyle: setViewStyle,
        viewOnly: viewOnly,
        currentFolder: currentFolder,
        setCurrentFolder: setCurrentFolder,
        onDoubleClick: onDoubleClick,
        onRefresh: onRefresh,
        onUpload: onUpload,
        onCreateFolder: onCreateFolder,
        onDelete: onDelete,
        uploadedFileData: uploadedFileData,
        setUploadedFileData: setUploadedFileData,
      }}
    >
      <div className="rfm-main-container">
        <Navbar />
        <Workspace />
      </div>
    </FileManagerContext.Provider>
  );
};
