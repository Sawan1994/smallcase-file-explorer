import React, { PureComponent } from "react";
import Modal from "./Modal";
import "../styles/fileinfo.css";

class InfoModal extends PureComponent {
  render() {
    const { dismiss, info } = this.props;
    const type = info.name.split(".");

    return (
      <Modal
        title={`${info.type === "file" ? "File" : "Folder"} Info`}
        dismiss={dismiss}
      >
        <div className="file_info_container">
          {info.type === "file" ? (
            <div className="file_icon">
              <img
                className="icon"
                src={require("../assets/file-icon.png")}
                alt="file icon"
              />
              <span className="file__type">{"." + type[type.length - 1]}</span>
            </div>
          ) : (
            <div className="file_icon">
              <img
                className="folder__icon"
                src={require("../assets/folder-shape.png")}
                alt="folder icon"
              />
            </div>
          )}
          <div className="file_info_content">
            <div className="file_info_row">
              <span>Name:</span>
              <span>{info.name}</span>
            </div>
            <div className="file_info_row">
              <span>Size:</span>
              <span>{info.size}</span>
            </div>
            <div className="file_info_row">
              <span>Creator name:</span>
              <span>{info.creator_name}</span>
            </div>
            <div className="file_info_row">
              <span>Created date:</span>
              <span>{info.created_date}</span>
            </div>
          </div>
        </div>
      </Modal>
    );
  }
}

export default InfoModal;
