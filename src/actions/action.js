import {
  SET_FOLDER_DATA,
  SET_CREATE_MODAL,
  CREATE_FILE,
  SET_INFO_MODAL,
  DELETE_FILE
} from "./actionTypes";

export const setFolderData = data => ({
  type: SET_FOLDER_DATA,
  payload: data
});

export const setCreateModal = isOpen => ({
  type: SET_CREATE_MODAL,
  payload: isOpen
});

export const setInfoModal = isOpen => ({
  type: SET_INFO_MODAL,
  payload: isOpen
});

export const createFile = (data, parentPath) => ({
  type: CREATE_FILE,
  payload: data,
  parentPath
});

export const deleteFile = (data, parentPath) => ({
  type: DELETE_FILE,
  payload: data,
  parentPath
});
