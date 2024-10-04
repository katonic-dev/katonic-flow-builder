import React from 'react';

import './index.less';

interface IProps {
  size?: number;
  icon: string;
  setModal: (value: boolean) => void;
  modal: boolean;
}

const ActionButton: React.FC<IProps> = (props) => {
  const { size = 28, icon, setModal, modal } = props;

  return (
    <button
      className="flow-builder-action-button"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: `${size / 2}px`,
      }}
      onClick={() => setModal(!modal)} // Toggle the modal state
    >
      <img src={icon} alt="Action icon" />
    </button>
  );
};

export default ActionButton;
