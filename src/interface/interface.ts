export interface RepositoryObject {
    name:string,
    description:string|null,
    stargazers_count:number,
    [key: string]: any
}
