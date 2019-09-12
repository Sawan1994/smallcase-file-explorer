import React, { PureComponent } from "react";
import { PropTypes } from "prop-types";
import "../styles/navbar.css";

class NavBar extends PureComponent {
  render() {
    const { path, onBackClick } = this.props;
    const pathArray = path.split("/");

    return (
      <div className="nav__bar">
        <div className="nav__icon">
          <img
            src={require("../assets/arrow-green-circle.png")}
            alt="up icon"
            onClick={() => onBackClick(path)}
          />
        </div>
        <div className="nav__path">
          {path.length > 0 &&
            pathArray.map((d, index) => (
              <span className="path__name" key={d}>
                {d + `${index !== pathArray.length - 1 ? " / " : ""}`}
              </span>
            ))}
        </div>
        <div className="search__block">
          <input type="text" placeholder="Search for anything" />
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  path: PropTypes.string.isRequired
};

export default NavBar;
