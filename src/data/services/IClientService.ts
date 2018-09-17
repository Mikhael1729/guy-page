import { IRepository } from "../repositories/IRepository";
import { Client } from "models/Client";

export interface IClientService extends IRepository<Client> { }