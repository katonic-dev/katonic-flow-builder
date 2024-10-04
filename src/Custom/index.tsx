import React from 'react';
import { Drawer, Button, Space } from 'antd';
import './index.less';

interface MyDrawerProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  content: React.ReactNode;
}

const MyDrawer: React.FC<MyDrawerProps> = ({
  visible,
  setVisible,
  content,
}) => {
  const onClose = () => {
    setVisible(false);
  };

  return (
    <Drawer
      title="Addable Nodes"
      placement="right"
      width={500}
      onClose={onClose}
      visible={visible}
      extra={
        <Space>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="primary" onClick={onClose}>
            OK
          </Button>
        </Space>
      }
    >
      <div className="custom-node-container">{content}</div>
    </Drawer>
  );
};

export default MyDrawer;
