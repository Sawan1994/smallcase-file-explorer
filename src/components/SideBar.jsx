import React, { PureComponent } from "react";

import { connect } from "react-redux";
import Tree from "./Tree";

import "../styles/sidebar.css";
import { setFolderData } from "../actions/action";

class SideBar extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedFile: ""
    };
  }

  onSelect = file => {
    this.setState(
      {
        selectedFile: file
      },
      () => this.props.setFolderData(this.state.selectedFile)
    );
  };

  render() {
    const { data } = this.props;
    const { selectedFile } = this.state;

    return (
      <aside className="sidebar__window">
        <Tree
          onSelect={this.onSelect}
          nodes={data}
          currentFolder={selectedFile}
        />
      </aside>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data
});
const mapDispatchToProps = dispatch => ({
  setFolderData: data => dispatch(setFolderData(data))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideBar);
