import { IRepository } from "./IRepository";

export class BaseRepository<T> implements IRepository<T>{
    private _context: string;

    constructor(context: string) {
        this._context = context;
    }

    public get(id: number): Promise<T> {
        return fetch(this._context + `/${id}`, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
    }

    public getAll(): Promise<T[]> {
        return fetch(this._context, {
            method: 'GET',
            headers: {
                "Content-type": "application/json"
            }
        }).then(response => {
            if (!response.ok) {
              throw new Error(response.statusText)
            }
            return response.json()
          })
    }

    public add(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }

    public delete(entity: T): void {
        throw new Error("Method not implemented.");
    }

    public update(entity: T): Promise<T> {
        throw new Error("Method not implemented.");
    }
}