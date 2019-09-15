import React, { PureComponent } from "react";
import { connect } from "react-redux";
import "../styles/main.css";
import {
  setFolderData,
  setCreateModal,
  setInfoModal,
  deleteFile
} from "../actions/action";
import CreateModal from "./CreateModal";
import NavBar from "./NavBar";
import InfoModal from "./InfoModal";
import CustomContext from "./CustomContext";

class Main extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      menu: [
        { label: "Open", callback: this.openFolder.bind(this) },
        { label: "Get Info", callback: this.getInfo.bind(this) },
        { label: "Delete", callback: this.deleteFile.bind(this) }
      ],
      isContextMenuOpen: false,
      contextMenuX: 0,
      contextMenuY: 0,
      rightClicked: null
    };

    this.handleContextMenu = this.handleContextMenu.bind(this);
    this.handleUp = this.handleUp.bind(this);
    this.closeContextMenu = this.closeContextMenu.bind(this);
  }

  openFolder() {
    const { setFolderData } = this.props;
    const { rightClicked } = this.state;

    if (rightClicked.type === "file") {
      alert("File Opened.");
    } else {
      setFolderData(rightClicked);
    }

    this.setState({
      isContextMenuOpen: false,
      contextMenuX: 0,
      contextMenuY: 0,
      rightClicked: null
    });
  }

  getInfo() {
    const { setInfoModal } = this.props;

    setInfoModal(true);

    this.setState({
      isContextMenuOpen: false,
      contextMenuX: 0,
      contextMenuY: 0
    });
  }

  deleteFile() {
    const { deleteFile, folderData } = this.props;
    const { rightClicked } = this.state;

    deleteFile(rightClicked, folderData.path);

    this.setState({
      isContextMenuOpen: false,
      contextMenuX: 0,
      contextMenuY: 0,
      rightClicked: null
    });
  }

  handleContextMenu(event, data) {
    event.preventDefault();
    this.setState({
      rightClicked: data,
      isContextMenuOpen: true,
      contextMenuX: event.clientX,
      contextMenuY: event.clientY
    });
  }

  handleUp(path) {
    if (path.length === 0) return;

    const { setFolderData, data } = this.props;
    const newPath = path.split("/");

    const parentDirectory = newPath.slice(0, newPath.length - 1).join("/");

    if (data[parentDirectory] === undefined) return;

    setFolderData(data[parentDirectory]);
  }

  closeContextMenu() {
    this.setState({
      rightClicked: null,
      isContextMenuOpen: false,
      contextMenuX: 0,
      contextMenuY: 0
    });
  }

  render() {
    const {
      folderData,
      setFolderData,
      isModalVisible,
      setCreateModal,
      setInfoModal,
      data
    } = this.props;

    const {
      isContextMenuOpen,
      contextMenuX,
      contextMenuY,
      rightClicked
    } = this.state;

    return (
      <div className="content">
        <NavBar
          path={folderData.path}
          currentFolder={folderData.name}
          onBackClick={this.handleUp}
        />
        <div className="main__container">
          {folderData.children &&
            folderData.children.map(childPath => {
              const type =
                data[childPath].type === "file"
                  ? data[childPath].name.split(".")
                  : "";
              return (
                <div
                  className="folder__container"
                  key={data[childPath].name}
                  onDoubleClick={() =>
                    data[childPath].type !== "file"
                      ? setFolderData(data[childPath])
                      : null
                  }
                  onContextMenu={event =>
                    this.handleContextMenu(event, data[childPath])
                  }
                >
                  {data[childPath].type === "file" ? (
                    <div className="file__icon_container">
                      <img
                        className="file__icon"
                        src={require("../assets/file-icon.png")}
                        alt="file icon"
                      />
                      <span className="file__type">
                        {"." + type[type.length - 1]}
                      </span>
                    </div>
                  ) : (
                    <div className="folder__icon_container">
                      <img
                        className="folder__icon"
                        src={require("../assets/folder-shape.png")}
                        alt="folder icon"
                      />
                    </div>
                  )}
                  <span>{data[childPath].name}</span>
                </div>
              );
            })}
          <div
            className="folder__container"
            onClick={() => setCreateModal(true)}
          >
            <img
              className="create__icon"
              src={require("../assets/create-icon.png")}
              alt="create icon"
            />
          </div>
          {isModalVisible.createModal ? (
            <CreateModal dismiss={setCreateModal} path={folderData.path} folderData={folderData}/>
          ) : null}
          {isModalVisible.infoModal ? (
            <InfoModal dismiss={setInfoModal} info={rightClicked} />
          ) : null}
          {isContextMenuOpen ? (
            <CustomContext
              items={this.state.menu}
              x={contextMenuX}
              y={contextMenuY}
              onClose={this.closeContextMenu}
            />
          ) : null}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  data: state.data,
  folderData: state.folderData,
  isModalVisible: state.isModalVisible
});

const mapDispatchToProps = dispatch => ({
  setFolderData: data => dispatch(setFolderData(data)),
  setCreateModal: isOpen => dispatch(setCreateModal(isOpen)),
  setInfoModal: isOpen => dispatch(setInfoModal(isOpen)),
  deleteFile: (data, parentPath) => dispatch(deleteFile(data, parentPath))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
