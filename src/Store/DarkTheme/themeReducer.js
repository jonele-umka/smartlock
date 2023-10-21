import { TOGGLE_DARK_MODE } from "./themeTypes";

const initialState = {
  isDarkModeEnabled: false,
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_DARK_MODE:
      return {
        ...state,
        isDarkModeEnabled: state.isDarkModeEnabled,
      };
    default:
      return state;
  }
};

export default themeReducer;
