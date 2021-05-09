import { Constants, ActionTypes, State, SubState } from ".";

export default class Actions {
    static setPeopleList(peopleList: SubState.People[]): ActionTypes {
        return {
            type: Constants.SET_PEOPLE_LIST,
            peopleList
        }
    }
    static setFilteredPeopleList(filteredPeopleList: SubState.People[]): ActionTypes {
        return {
            type: Constants.SET_FILTERED_PEOPLE_LIST,
            filteredPeopleList
        }
    }
}