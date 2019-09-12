import React from "react";
import last from "lodash/last";
import PropTypes from "prop-types";
import "../styles/tree.css";

const getPaddingLeft = (level, type) => {
  let paddingLeft = level * 20;
  if (type === "file") paddingLeft += 20;
  return paddingLeft;
};

const getNodeLabel = node => last(node.path.split("/"));

const TreeNode = props => {
  const {
    node,
    getChildNodes,
    level,
    onToggle,
    onNodeSelect,
    currentFolder
  } = props;

  return (
    <React.Fragment>
      <div
        className="styled_tree_node"
        style={{
          paddingLeft: !node.isRoot && getPaddingLeft(level, node.type),
          background: currentFolder.path === node.path ? "#EEEFF1" : "",
          color: node.isRoot ? "#AFB2B6" : ""
        }}
      >
        <div
          role="button"
          className="node_label"
          onClick={() => onNodeSelect(node)}
        >
          {getNodeLabel(node)}
        </div>
        <div className="node_icon" onClick={() => onToggle(node)}>
          {!node.isRoot && node.type === "folder" &&
            node.children.length > 0 &&
            (node.isOpen ? (
              <img
                src={require("../assets/dropdown.svg")}
                alt="dropdown"
                style={{ transform: "rotate(180deg)" }}
              />
            ) : (
              <img src={require("../assets/dropdown.svg")} alt="dropdown" />
            ))}
        </div>
      </div>

      {(node.isOpen || node.isRoot) &&
        getChildNodes(node).map(
          childNode =>
            childNode.type !== "file" && (
              <TreeNode
                {...props}
                node={childNode}
                level={level + 1}
                key={childNode.path}
              />
            )
        )}
    </React.Fragment>
  );
};

TreeNode.propTypes = {
  node: PropTypes.object.isRequired,
  getChildNodes: PropTypes.func.isRequired,
  level: PropTypes.number.isRequired,
  onToggle: PropTypes.func.isRequired,
  onNodeSelect: PropTypes.func.isRequired
};

TreeNode.defaultProps = {
  level: 0
};

export default TreeNode;
