import React, { PureComponent } from "react";
import { connect } from "react-redux";
import Modal from "./Modal";
import { createFile } from "../actions/action";

class CreateModal extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      name: "",
      creator_name: "",
      created_date: "",
      size: "",
      type: "file"
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  }

  handleSwitch(value) {
    this.setState({
      type: value
    });
  }

  handleCreate() {
    const { createFile, path, dismiss } = this.props;
    const data = {
      ...this.state,
      path: path + "/" + this.state.name,
      children: []
    };

    createFile(data, path);
    dismiss(false);
  }

  render() {
    const { dismiss } = this.props;
    const { type } = this.state;

    return (
      <Modal title="Create New" dismiss={dismiss}>
        <div className="nav__pill">
          <div
            className={`nav ${type === "file" ? "active" : ""}`}
            onClick={() => this.handleSwitch("file")}
          >
            <p>File</p>
          </div>
          <div
            className={`nav ${type === "folder" ? "active" : ""}`}
            onClick={() => this.handleSwitch("folder")}
          >
            <p>Folder</p>
          </div>
        </div>
        <div className="file__form">
          <input
            type="text"
            placeholder="Name"
            name="name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Creator"
            name="creator_name"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Size"
            name="size"
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Date"
            name="created_date"
            onChange={this.handleChange}
          />
          <button className="btn btn-blue" onClick={this.handleCreate}>Create</button>
        </div>
      </Modal>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createFile: (data, parentPath) => dispatch(createFile(data, parentPath))
});

export default connect(
  null,
  mapDispatchToProps
)(CreateModal);
