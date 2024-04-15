import React, { useRef } from "react";
import { useFileManager } from "../context";
import CommonModal from "./CommonModal";

interface INewFolderModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const NewFolderModal = (props: INewFolderModalProps) => {
  const { onCreateFolder } = useFileManager();
  const folderName = useRef<any>();

  const onConfirm = async () => {
    if (
      folderName &&
      folderName.current &&
      folderName.current.value &&
      folderName.current.value.length > 0 &&
      onCreateFolder
    ) {
      await onCreateFolder(folderName.current.value);
    }
  };

  return (
    <CommonModal title="Create New Folder" {...props}>
      <div>
        <form className="rfm-new-folder-modal-form">
          <div>
            <input
              ref={folderName}
              type="text"
              className="rfm-new-folder-modal-input"
              placeholder="Folder Name"
              required
            />
          </div>
          <button
            onClick={onConfirm}
            disabled={
              folderName &&
              folderName.current &&
              folderName.current.value &&
              folderName.current.value.length === 0
            }
            type="submit"
            className="rfm-new-folder-modal-btn"
          >
            Create
          </button>
        </form>
      </div>
    </CommonModal>
  );
};

export default NewFolderModal;
