import { ClientService } from "data/services/ClientService";
import { PersonService } from "data/services/PersonService";
// tslint:disable:member-ordering

export class InstancesLocator {
    // Instance.
    private static _instance: InstancesLocator;

    private _clientService: ClientService;
    public get clientService() : ClientService {
        return this._clientService 
            ? this._clientService 
            : this._clientService = new ClientService('http://localhost:3000/api/clients');
    }

    private _personService: PersonService;
    public get personService() : PersonService {
        return this._personService 
            ? this._personService 
            : this._personService = new PersonService('http://localhost:3000/api/person');
    }
    
    private constructor() 
    { }

    public static getInstance(): InstancesLocator {
        return this._instance || (this._instance = new this());
    }
}