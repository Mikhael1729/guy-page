import { init } from "helpers/Init";

export interface IClient {
    id?: number;
    name?: string;
    email?: string;
    lastname?: string;
    public?: boolean;
    birthDate?: Date;
}
export interface Client extends IClient { }

export class Client implements Client {
    constructor(client: Client) {
        init<Client>(this, client);
    }
}