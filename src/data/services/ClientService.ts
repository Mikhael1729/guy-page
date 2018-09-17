import { Client } from "models/Client";
import { IClientService } from "./IClientService";
import { BaseRepository } from "../repositories/BaseRepository";

export class ClientService extends BaseRepository<Client> implements IClientService {
    constructor(url: string) {
        super(url)
    }

    public count() : Promise<{ count: number }>{
        return fetch(this._context + '/count', {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if(!response.ok) {
                return new Error(response.statusText)
            }
            return response.json()
        })
    }

    public countByPersonId(personId: number): Promise<{count: number}> {
        return fetch(this._context + `/count?filter={"where":{"personId":"${personId}"}}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if(!response.ok) {
                return new Error(response.statusText)
            }
            return response.json()
        })
    }

    public getClientsByPersonId(personId: number): Promise<Client[]> {
        return fetch(this._context + `?filter={"where":{"personId":"${personId}"}}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if(!response.ok) {
                return new Error(response.statusText)
            }
            return response.json()
        })
    }

    public getClientsByFilter(filter: string): Promise<Client[]> {
        return fetch(this._context + `?filter={"where":${filter}}`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        }).then(response => {
            if(!response.ok) {
                return new Error(response.statusText)
            }
            return response.json()
        })
    }
}