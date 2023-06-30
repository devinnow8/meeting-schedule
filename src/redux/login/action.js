import action from "../action";
export const SET_USER_DETAILS = "SET_USER_DETAILS";

export const set_user_details = (data) =>
  action({
    type: SET_USER_DETAILS,
    data
  });
