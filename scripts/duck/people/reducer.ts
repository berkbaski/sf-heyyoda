import { Constants, ActionTypes, State } from ".";

const initialState: State = {
    peopleList: [],
}

export default function (state = initialState, action: ActionTypes): State {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.SET_PEOPLE_LIST: {
            newState.peopleList = [...action.peopleList]
            break;
        }
        default: {
            break;
        }
    }
    return newState;
}