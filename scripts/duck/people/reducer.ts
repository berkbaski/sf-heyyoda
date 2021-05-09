import { Constants, ActionTypes, State } from ".";

const initialState: State = {
    peopleList: [],
    filteredPeopleList: []
}

export default function (state = initialState, action: ActionTypes): State {
    const newState = Object.assign({}, state);
    switch (action.type) {
        case Constants.SET_PEOPLE_LIST: {
            newState.peopleList = [...action.peopleList]
            break;
        }
        case Constants.SET_FILTERED_PEOPLE_LIST: {
            newState.filteredPeopleList = [...action.filteredPeopleList]
            break;
        }
        default: {
            break;
        }
    }
    return newState;
}