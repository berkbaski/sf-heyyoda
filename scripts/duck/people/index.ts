export namespace Constants {
    export const SET_PEOPLE_LIST = 'SET_PEOPLE_LIST';
    export const SET_FILTERED_PEOPLE_LIST = 'SET_FILTERED_PEOPLE_LIST';
}

export namespace Actions {
    export interface SetPeopleList {
        type: typeof Constants.SET_PEOPLE_LIST;
        peopleList: SubState.People[];
    }
    export interface SetFilteredPeopleList {
        type: typeof Constants.SET_FILTERED_PEOPLE_LIST;
        filteredPeopleList: SubState.People[];
    }
}

export namespace SubState {
    export interface People {
        name: string;
        height: string;
        mass: string;
        hair_color: string;
        skin_color: string;
        eye_color: string;
        birth_year: string;
        gender: string;
        homeworld: string;
        films: string[];
        species: any[];
        vehicles: string[];
        starships: string[];
        created: Date;
        edited: Date;
        url: string;
    }
}

export interface State {
    peopleList: SubState.People[];
    filteredPeopleList: SubState.People[];
}

//TODO: Find a better implementation to avoid duplicate typing
export type ActionTypes = Actions.SetPeopleList | Actions.SetFilteredPeopleList;