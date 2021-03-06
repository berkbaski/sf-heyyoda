import { sc, scEmpty } from "./serviceConfig";
import { People, PeopleGetAll } from "./types/people";
import store from 'duck/store';
import PeopleActions from 'duck/people/actions';

export async function getAll(page?: number): Promise<void> {
    try {
        const pagination = page || 1;
        const newPeopleList: PeopleGetAll = await sc.request(`/people?page=${pagination}`, { method: "GET" });
        const peopleList = [...store.getState().people.peopleList, ...newPeopleList.results];
        store.dispatch(PeopleActions.setPeopleList(peopleList));
        store.dispatch(PeopleActions.setFilteredPeopleList(peopleList));
    } catch (error) {
        throw error;
    }
}

export async function get(id: number): Promise<People> {
    try {
        return await sc.request(`/people/${id}`, { method: "GET" });
    } catch (error) {
        throw error;
    }
}

export async function execute(url: string): Promise<any> {
    try {
        return await scEmpty.request(url, { method: "GET" })
    } catch (error) {
        throw error;
    }
}