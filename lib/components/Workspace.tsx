import React, { useState, useMemo, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useFileManager } from "../context";
import type { FileType } from "../types";

// Components
import FileIcon from "./FileIcon";
import NewFolderIcon from "./NewFolderIcon";
import FolderPath from "./FolderPath";
import NewFolderModal from "./NewFolderModal";
import UploadFileModal from "./UploadFileModal";

const Workspace = () => {
  const { currentFolder, fs, viewOnly, setUploadedFileData } = useFileManager();
  const [newFolderModalVisible, setNewFolderModalVisible] =
    useState<boolean>(false);
  const [uploadFileModalVisible, setUploadFileModalVisible] =
    useState<boolean>(false);

  const setUploadModalVisible = (value: boolean) => {
    if (viewOnly) {
      setUploadFileModalVisible(false);
    } else {
      setUploadFileModalVisible(value);
    }
  };

  useEffect(() => {
    if (newFolderModalVisible) {
      setNewFolderModalVisible(false);
    }
    if (uploadFileModalVisible) {
      setUploadModalVisible(false);
      setUploadedFileData(undefined);
    }
  }, [currentFolder]);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      setUploadedFileData(file);
      setUploadModalVisible(true);
    },
    [setUploadedFileData]
  );

  const onCloseUploadFileModal = () => {
    setUploadModalVisible(false);
    setUploadedFileData(undefined);
  };

  const { getRootProps, isDragAccept } = useDropzone({
    noClick: true,
    noKeyboard: true,
    onDrop: onDrop,
  });

  const currentFolderFiles = useMemo(() => {
    const files = fs.filter((f: FileType) => f.parentId === currentFolder);
    return files;
  }, [fs, currentFolder]);

  return (
    <section
      id="react-file-manager-workspace"
      className={`rfm-workspace ${
        isDragAccept && !viewOnly ? "rfm-workspace-dropzone" : ""
      }`}
      {...getRootProps()}
    >
      {/* Top bar with folder path */}
      <FolderPath />

      {/* File listing */}
      <div className="rfm-workspace-file-listing">
        {currentFolderFiles.map((f: FileType, key: number) => {
          return <FileIcon id={f.id} name={f.name} isDir={f.isDir} key={key} />;
        })}

        {!viewOnly && (
          <>
            <NewFolderIcon onClick={() => setNewFolderModalVisible(true)} />
            <NewFolderModal
              isVisible={newFolderModalVisible}
              onClose={() => setNewFolderModalVisible(false)}
            />
            <UploadFileModal
              isVisible={uploadFileModalVisible}
              onClose={onCloseUploadFileModal}
            />
          </>
        )}
      </div>
    </section>
  );
};

export default Workspace;
