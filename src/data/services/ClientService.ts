import { Client } from "models/Client";
import { IClientService } from "./IClientService";
import { BaseRepository } from "../repositories/BaseRepository";

export class ClientService extends BaseRepository<Client> implements IClientService {
    constructor(url: string) {
        super(url)
    }
}