import { Person } from "models/Person";
import { IRepository } from "../repositories/IRepository";

export interface IPersonService extends IRepository<Person> { }