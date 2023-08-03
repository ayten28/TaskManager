export interface ITasksDtoModel
{
    "id": number,
    "taskName": string,
    "taskDescription": string,
    "createdDate": Date,
    "createUser": string,
    "createUserLogin": string,
    "createUserFullName": string,
    "isDone": boolean,
    "assignUser": string,
    "assignUserLogin": string,
    "assignUserFullName": string,
    "resolveDate": Date
}