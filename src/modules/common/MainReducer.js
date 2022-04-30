import { COMMON_ACTIONS } from "./CommonActions";

export default function reducer(
  state = {
    success: false,
    error: false,
    loading: false,
    showSuccessMessage: undefined,
  },
  action
) {
  switch (action.type) {
    case COMMON_ACTIONS.API_CALL_START:
      return {
        ...state,
        loading: true,
      };
    case COMMON_ACTIONS.API_CALL_FINISH:
      return {
        ...state,
        loading: false,
      };
    case COMMON_ACTIONS.RERENDER:
      return {
        ...state,
        triggerRerender: !state.triggerRerender,
      };
    case COMMON_ACTIONS.SET_LOADING:
      return {
        ...state,
        loading: action.payload.value,
      };
    case COMMON_ACTIONS.SHOW_SUCCESS_MESSAGE:
      return {
        ...state,
        showSuccessMessage: action.payload.showSuccessMessage,
      };
    case COMMON_ACTIONS.CLEAR_NOTIFICATIONS:
      return {
        ...state,
        showSuccessMessage: undefined,
      };
    default:
      return state;
  }
}
