import React, { useState, useContext } from 'react';
import FlowBuilder, {
  NodeContext,
  IRegisterNode,
  INode,
  IAddableComponent,
} from '@katonic/flow-builder';
import {
  DrawerComponent,
  PopconfirmComponent,
  PopoverComponent,
} from '../../antd';

import './index.css';

const StartNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="start-node">{node.name}</div>;
};

const EndNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="end-node">{node.name}</div>;
};

const NodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="other-node">{node.name}</div>;
};

const ConditionNodeDisplay: React.FC = () => {
  const node = useContext(NodeContext);
  return <div className="condition-node">{node.name}</div>;
};

const CustomAddableComponent: React.FC<IAddableComponent> = ({ add }) => {
  return (
    <div>
      <div
        className="flow-builder-custom-addable-node-item"
        onClick={() => add('node')}
      >
        普通节点
      </div>
    </div>
  );
};

const registerNodes: IRegisterNode[] = [
  {
    type: 'start',
    name: '开始节点',
    displayComponent: StartNodeDisplay,
    isStart: true,
    addableComponent: CustomAddableComponent,
  },
  {
    type: 'end',
    name: '结束节点',
    displayComponent: EndNodeDisplay,
    isEnd: true,
  },
  {
    type: 'node',
    name: '普通节点',
    displayComponent: NodeDisplay,
  },
  {
    type: 'condition',
    name: '条件节点',
    displayComponent: ConditionNodeDisplay,
  },
  {
    type: 'branch',
    name: '分支节点',
    conditionNodeType: 'condition',
  },
];

const AddableComponent = () => {
  const [nodes, setNodes] = useState<INode[]>([]);

  const handleChange = (nodes: INode[]) => {
    console.log('nodes change', nodes);
    setNodes(nodes);
  };

  return (
    <FlowBuilder
      registerNodes={registerNodes}
      nodes={nodes}
      onChange={handleChange}
      DrawerComponent={DrawerComponent}
      PopoverComponent={PopoverComponent}
      PopconfirmComponent={PopconfirmComponent}
    />
  );
};

export default AddableComponent;
