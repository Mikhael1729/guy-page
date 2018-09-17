export interface IRepository<T> {
    get(id: number): Promise<T>;
    getAll(): Promise<T[]>;
    add(entity: T): Promise<T>;
    delete(entity: T): void;
    update(entity: T): Promise<T>;
}