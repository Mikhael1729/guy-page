import { Person } from "models/Person";
import { IPersonService } from "./IPersonService";
import { BaseRepository } from "../repositories/BaseRepository";

export class PersonService extends BaseRepository<Person> implements IPersonService {
    constructor(url: string) {
        super(url);
    }

    public logIn(person: Person) : Promise<{ id: string, ttl: number, created:string, userId: number }> {
        return fetch(this._context + '/login', {
            method: 'POST',
            body: JSON.stringify(person),
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if (!response.ok) {
                return new Error(response.statusText)
            }
            return response.json()
        })
    }
}