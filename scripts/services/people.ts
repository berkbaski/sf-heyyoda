import sc from "./serviceConfig";
import { People, PeopleGetAll } from "./types/people";

export async function getAll(page?: number): Promise<People[]> {
    try {
        const pagination = page || 1;
        const peopleList: PeopleGetAll = await sc.request(`/people?page=${pagination}`, { method: "GET" });
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