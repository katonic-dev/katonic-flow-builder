import React, { useState, useContext, useEffect } from 'react';
import ActionButton from '../ActionButton';
import { SplitLine } from '../Lines';
import DropButton from '../DropButton';
import {
  getRegisterNode,
  getIsStartNode,
  getIsEndNode,
  getIsBranchNode,
  getIsConditionNode,
} from '../utils';
import { BuilderContext, NodeContext } from '../contexts';
import { useAction } from '../hooks';

import AddIcon from '../icons/add-button.svg';
import AddNormalIcon from '../icons/add-normal.svg';
import AddBranchIcon from '../icons/add-branch.svg';
import './index.less';
import DrawerComponent from '@/Custom';

interface IProps {
  inLoop?: boolean;
}

const AddNodeButton: React.FC<IProps> = (props) => {
  const { inLoop } = props;
  const [modal, setModal] = useState(false);

  const {
    registerNodes,
    nodes,
    readonly,
    dragType,
    DropComponent = DropButton,
    PopoverComponent,
    onDropNodeSuccess,
    onAddNodeSuccess,
  } = useContext(BuilderContext);

  const node = useContext(NodeContext);

  const { addNode, addNodeInLoop } = useAction();

  const handleAdd = inLoop ? addNodeInLoop : addNode;

  const [visible, setVisible] = useState(false);

  const [search, setSearch] = useState<string>('');

  useEffect(() => {
    console.log(search);
  }, [search]);

  const registerNode = getRegisterNode(registerNodes, node.type);
  const AddableComponent = registerNode?.addableComponent;
  const addableNodeTypes = registerNode?.addableNodeTypes;

  const droppable =
    dragType &&
    !getIsConditionNode(registerNodes, dragType) &&
    (Array.isArray(addableNodeTypes)
      ? addableNodeTypes.includes(dragType)
      : true);

  const options = registerNodes.filter(
    (item) =>
      !getIsStartNode(registerNodes, item.type) &&
      !getIsEndNode(registerNodes, item.type) &&
      !getIsConditionNode(registerNodes, item.type) &&
      (Array.isArray(addableNodeTypes)
        ? addableNodeTypes.includes(item.type)
        : true),
  );

  const handleAddNode = (newNodeType: string) => {
    const newNode = handleAdd(newNodeType);
    onAddNodeSuccess?.(newNodeType, newNode);
    setVisible(false);
  };

  const handleDrop = () => {
    const newNode = handleAdd(dragType);
    onDropNodeSuccess?.(dragType, newNode);
  };

  const addableOptions = AddableComponent ? (
    <AddableComponent node={node} nodes={nodes} add={handleAddNode} />
  ) : (
    <>
      {options
        .filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase()),
        )
        .map((item) => {
          const registerNode = getRegisterNode(registerNodes, item.type);
          const defaultIcon = getIsBranchNode(registerNodes, item.type)
            ? AddBranchIcon
            : AddNormalIcon;

          return (
            <div
              className="flow-builder-addable-node-item"
              key={item.type}
              onClick={(e) => {
                e.stopPropagation(); // Prevent the click from bubbling up to the overlay
                handleAddNode(item.type);
              }}
            >
              {/* {console.log(item)} */}
              <div className="flow-builder-addable-node-icon">
                {registerNode?.addIcon ? (
                  <img
                    className="node-image-container"
                    src={registerNode.addIcon}
                    alt={item.name}
                  />
                ) : (
                  <img
                    className="node-image-container"
                    src={defaultIcon}
                    alt={item.name}
                  />
                )}
              </div>
              <div className="node-info">
                <span className="node-title">{item.name}</span>
                <span className="node-desc">{item.addDescription || ''}</span>
              </div>
            </div>
          );
        })}
    </>
  );

  return (
    <>
      <SplitLine />
      {!readonly && options.length > 0 ? (
        droppable ? (
          <DropComponent onDrop={handleDrop} />
        ) : PopoverComponent ? (
          <div className="flow-builder-add-btn">
            <ActionButton icon={AddIcon} setModal={setModal} modal={modal} />
          </div>
        ) : null
      ) : null}

      <DrawerComponent
        visible={modal}
        onClose={() => setModal(false)}
        setSearch={setSearch}
        title="Addable Nodes"
        content={addableOptions}
      />

      <SplitLine />
    </>
  );
};

export default AddNodeButton;
