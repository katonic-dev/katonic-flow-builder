// DrawerComponent.tsx
import React from 'react';
import './index.less';

interface DrawerComponentProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  visible,
  onClose,
  title,
  content,
}) => {
  return (
    <>
      {visible && <div className="drawer-overlay" onClick={onClose} />}
      <div className={`drawer ${visible ? 'open' : ''}`}>
        <div className="drawer-content">
          <div className="drawer-header">
            <h3>{title}</h3>
            <button className="close-button" onClick={onClose}>
              &times;
            </button>
          </div>
          <div className="drawer-body">
            {content} {/* Ensure the content is rendered directly */}
          </div>
        </div>
      </div>
    </>
  );
};

export default DrawerComponent;
