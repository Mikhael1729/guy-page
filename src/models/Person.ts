import { init } from "helpers/Init";

export interface IPerson {
    id?: number;
    email?: string;
    password?: string;
    name?: string;
}
export interface Person extends IPerson { }

export class Person implements Person {
    constructor(person: Person) {
        init<Person>(this, person);
    }
}