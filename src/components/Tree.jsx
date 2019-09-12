import React, { Component } from "react";
import values from "lodash/values";
import PropTypes from "prop-types";
import TreeNode from "./TreeNode";

export default class Tree extends Component {
  getRootNodes = () => {
    const { nodes } = this.props;
    
    return values(nodes).filter(node => node.isRoot === true);
  };

  getChildNodes = node => {
    const { nodes } = this.props;
    if (!node.children) return [];
    return node.children.map(path => nodes[path]);
  };

  onToggle = node => {
    const { nodes } = this.props;
    nodes[node.path].isOpen = !node.isOpen;
    this.setState({ nodes });
  };

  onNodeSelect = node => {
    const { onSelect } = this.props;
    onSelect(node);
  };

  render() {
    const { currentFolder } = this.props;

    const rootNodes = this.getRootNodes();
    return (
      <div>
        {rootNodes.map(node => (
          <TreeNode
            key={node.path}
            node={node}
            getChildNodes={this.getChildNodes}
            onToggle={this.onToggle}
            onNodeSelect={this.onNodeSelect}
            currentFolder={currentFolder}
          />
        ))}
      </div>
    );
  }
}

Tree.propTypes = {
  onSelect: PropTypes.func.isRequired
};
