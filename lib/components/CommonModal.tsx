import React from "react";
import Draggable from "react-draggable";
import SvgIcon from "./SvgIcon";

interface IModalProps {
  title: string;
  children: React.ReactNode;
  isVisible: boolean;
  onClose: () => void;
}

const CommonModal: React.FC<IModalProps> = ({
  children,
  title,
  isVisible,
  onClose,
}: IModalProps) => {
  if (!isVisible) {
    return <></>;
  }
  return (
    <Draggable bounds="#react-file-manager-workspace">
      <div className="rfm-modal-container">
        <div>
          <h3 className="rfm-modal-title">{title}</h3>
          <SvgIcon
            onClick={onClose}
            svgType="close"
            className="rfm-modal-icon"
          />
        </div>
        {children}
      </div>
    </Draggable>
  );
};

export default CommonModal;
