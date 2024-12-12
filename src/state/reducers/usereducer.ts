import { Action } from '../ActionTypes/Actionts';
import { ActionType } from '../ActionTypes/Actiontype';

interface State {
  users: any[];
  userDetails: null,
}

const initialState: State = {
  users: [],
  userDetails: null
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case ActionType.ALLUSER:
      return { ...state, users: action.payload };

    case ActionType.DETAILUSER:
      return { ...state, userDetails: action.payload };

    default:
      return state;
  }
};

export default reducer;
