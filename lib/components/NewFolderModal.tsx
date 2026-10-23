import React, { useRef } from "react";
import { useFileManager } from "../context";
import CommonModal from "./CommonModal";

interface INewFolderModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const NewFolderModal = (props: INewFolderModalProps) => {
  const { onCreateFolder } = useFileManager();
  const folderName = useRef<HTMLInputElement>(null);

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

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    void onConfirm();
  };

  return (
    <CommonModal title="Create New Folder" {...props}>
      <div>
        <form className="rfm-new-folder-modal-form" onSubmit={onSubmit}>
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
