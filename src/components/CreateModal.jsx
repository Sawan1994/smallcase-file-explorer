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
      type: "file",
      errors: null
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCreate = this.handleCreate.bind(this);
    this.isFileNameDuplicate = this.isFileNameDuplicate.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  isFileNameDuplicate(filelName) {
    const { folderData } = this.props;
    const { path, children } = folderData;

    return children.find(child => child === `${path}/${filelName}`)
      ? true
      : false;
  }

  handleNameChange(event) {
    const target = event.target;
    const targetName = target.name;
    const value = target.value;

    const { name, ...restErrors } = this.state.errors || {};

    if (this.isFileNameDuplicate(value)) {
      this.setState({
        [targetName]: value,
        errors: { ...restErrors, name: "Name should be unique" }
      });

      return;
    }

    this.setState({
      [targetName]: value,
      errors: { ...restErrors }
    });
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
    const { name, creator_name, created_date, size, type } = this.state;

    if (type === "file" && name.search("^[\\w]+\\.[A-Za-z]+$") === -1) {
      this.setState(prevState => ({
        errors: { ...prevState.errors, name: "Filename should contain extension" }
      }));

      return;
    }

    const data = {
      name,
      creator_name,
      created_date,
      size,
      type,
      path: path + "/" + name,
      children: []
    };

    createFile(data, path);
    dismiss(false);
  }

  render() {
    const { dismiss } = this.props;
    const { type, errors } = this.state;

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
            onChange={this.handleNameChange}
          />
          {errors && errors.name && (
            <span className="error-text">{errors.name}</span>
          )}
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
          <button
            className={
              errors && Object.keys(errors).length > 0
                ? "btn disabled"
                : "btn btn-blue"
            }
            onClick={this.handleCreate}
            disabled={errors && Object.keys(errors).length > 0}
          >
            Create
          </button>
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
