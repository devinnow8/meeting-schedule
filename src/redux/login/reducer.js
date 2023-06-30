const defaultState = {
  user_details: {}
};

const loginReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "SET_USER_DETAILS": {
      return {
        ...state,
        user_details: action.data
      };
    }
    default:
      return state;
  }
};

export default loginReducer;
