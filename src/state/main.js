import {
  SET_FOLDER_DATA,
  SET_CREATE_MODAL,
  CREATE_FILE,
  SET_INFO_MODAL,
  DELETE_FILE
} from "../actions/actionTypes";
import { initial_data } from "../utils/example-data";

const initialState = {
  data: initial_data,
  isModalVisible: {
    createModal: false,
    infoModal: false
  },
  folderData: initial_data["root"]
};

export const reducers = (state = initialState, action) => {
  switch (action.type) {
    case SET_FOLDER_DATA:
      return {
        ...state,
        folderData: {
          name: action.payload.name,
          path: action.payload.path,
          type: action.payload.type,
          size: action.payload.size,
          creator_name: action.payload.creator_name,
          created_date: action.payload.created_date,
          children: action.payload.children
        }
      };
    case SET_CREATE_MODAL:
      return {
        ...state,
        isModalVisible: {
          ...state.isModalVisible,
          createModal: action.payload
        }
      };
    case SET_INFO_MODAL:
      return {
        ...state,
        isModalVisible: {
          ...state.isModalVisible,
          infoModal: action.payload
        }
      };
    case CREATE_FILE:
      return {
        ...state,
        data: {
          ...state.data,
          [action.payload.path]: { ...action.payload },
          [action.parentPath]: {
            ...state.data[action.parentPath],
            children: [
              ...state.data[action.parentPath].children,
              action.payload.path
            ]
          }
        },
        folderData: {
          ...state.data[action.parentPath],
          children: [
            ...state.data[action.parentPath].children,
            action.payload.path
          ]
        }
      };
    case DELETE_FILE:
      const data = { ...state.data };
      delete data[action.payload.path];
      return {
        ...state,
        data: {
          ...data,
          [action.parentPath]: {
            ...state.data[action.parentPath],
            children: [
              ...state.data[action.parentPath].children.filter(
                d => d !== action.payload.path
              )
            ]
          }
        },
        folderData: {
          ...state.data[action.parentPath],
          children: [
            ...state.data[action.parentPath].children.filter(
              d => d !== action.payload.path
            )
          ]
        }
      };
    default:
      return state;
  }
};
