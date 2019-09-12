import React, { PureComponent } from "react";
import "../styles/modal.css";

class Modal extends PureComponent {
  render() {
    const { dismiss, title, children } = this.props;

    return (
      <div className="modal__container">
        <div className="modal">
          <div className="modal__header">
            <p>{title}</p>
            <img
              className="close__icon"
              src={require("../assets/close-icon.svg")}
              alt="close icon"
              onClick={() => dismiss(false)}
            />
          </div>
          <div className="modal__body">{children}</div>
        </div>
      </div>
    );
  }
}

export default Modal;
