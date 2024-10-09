// DrawerComponent.tsx
import React from 'react';
import './index.less';

interface DrawerComponentProps {
  visible: boolean;
  onClose: () => void;
  title: string;
  content: React.ReactNode;
  setSearch: (searchTerm: string) => void;
}

const DrawerComponent: React.FC<DrawerComponentProps> = ({
  visible,
  onClose,
  title,
  content,
  setSearch,
}) => {
  return (
    <>
      {visible && <div className="drawer-overlay" onClick={onClose} />}
      <div className={`drawer ${visible ? 'open' : ''}`}>
        <div className="drawer-content">
          <div className="drawer-header">
            <div className="header-top">
              <h3>{title}</h3>
              <button className="close-button" onClick={onClose}>
                &times;
              </button>
            </div>
            <input
              placeholder="Search"
              className="drawer-search"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="drawer-body">{content}</div>
        </div>
      </div>
    </>
  );
};

export default DrawerComponent;
