import sc from "./serviceConfig";
import { People, PeopleGetAll } from "./types/people";

export async function getAll(): Promise<People[]> {
    try {
        const peopleList: PeopleGetAll = await sc.request(`/people`, { method: "GET" });
        return peopleList.results;
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