import * as Constant from '../constants';

const initialState = {
  loading: true,
  data: [],
  error: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case Constant.IMAGE_REQUEST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case Constant.IMAGE_REQUEST_SUCCESS:
      // console.log(state);
      return {
        ...state,
        loading: false,
        data: [...state.data, ...action.payload],
      };
    case Constant.IMAGE_REQUEST_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case Constant.RESET:
      return initialState;

    default:
      return state;
  }
};
