import React from "react";
import { useFileManager } from "../context";
import CommonModal from "./CommonModal";

interface IUploadFileModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const UploadFileModal = (props: IUploadFileModalProps) => {
  const { onUpload, uploadedFileData, currentFolder } = useFileManager();

  const onConfirm = async () => {
    if (onUpload && uploadedFileData) {
      await onUpload(uploadedFileData, currentFolder);
    }
  };

  return (
    <CommonModal title="Upload file" {...props}>
      <div>
        <h4 className="rfm-upload-file-modal-title">
          Are you sure you want to upload the file?
        </h4>
        <div className="rfm-upload-file-modal-container">
          <button
            onClick={onConfirm}
            type="submit"
            className="rfm-upload-file-modal-btn rfm-upload-file-modal-btn-confirm"
          >
            Upload
          </button>
          <button
            onClick={props.onClose}
            type="submit"
            className="rfm-upload-file-modal-btn rfm-upload-file-modal-btn-cancel"
          >
            Cancel
          </button>
        </div>
      </div>
    </CommonModal>
  );
};

export default UploadFileModal;
