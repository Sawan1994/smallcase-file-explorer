import React from "react";
import "../styles/customcontext.css";

class CustomContext extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      visible: true,
      x: this.props.x,
      y: this.props.y
    };

    this.hideOnClickOutside = this.hideOnClickOutside.bind(this);
  }

  static getDerivedStateFromProps(props, state) {
    if (props.x !== state.x || props.y !== state.y) {
      return {
        x: props.x,
        y: props.y
      };
    }

    return null;
  }

  componentDidMount(){
    this.hideOnClickOutside(document.getElementById("customcontext"))
  }

  isVisible = elem =>
    !!elem &&
    !!(elem.offsetWidth || elem.offsetHeight || elem.getClientRects().length);

  hideOnClickOutside(element) {
    const outsideClickListener = event => {
      if (!element.contains(event.target) && this.isVisible(element)) {
        this.props.onClose();
        removeClickListener();
      }
    };

    const removeClickListener = () => {
      document.removeEventListener("click", outsideClickListener);
    };

    document.addEventListener("click", outsideClickListener);
  }

  returnMenu(items) {
    var myStyle = {
      position: "absolute",
      top: `${this.state.y}px`,
      left: `${this.state.x + 5}px`
    };

    return (
      <div
        className="custom-context"
        id="customcontext"
        style={myStyle}
        ref={this.contextRef}
      >
        {items.map((item, index, arr) => {
          if (arr.length - 1 === index) {
            return (
              <div
                key={index}
                className="custom-context-item text-red"
                index={index}
                onClick={item.callback}
              >
                {item.label}
              </div>
            );
          } else {
            return (
              <div
                key={index}
                className="custom-context-item"
                index={index}
                onClick={item.callback}
              >
                {item.label}
              </div>
            );
          }
        })}
      </div>
    );
  }

  render() {
    return (
      <div id="cmenu">
        {this.state.visible ? this.returnMenu(this.props.items) : null}
      </div>
    );
  }
}

export default CustomContext;
