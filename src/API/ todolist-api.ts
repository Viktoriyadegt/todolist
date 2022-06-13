import axios from 'axios'
import {resolveNaptr} from "dns";

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
    headers: {
        'API-KEY': '11bc4102-72ab-40e1-a76b-b87af6c4cd4f'
    }
})

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistDomainType = TodolistType & {
    filter: FilterValuesType
}



export enum TaskStatuses {
    New = 0,
    InProgress = 1,
    Completed = 2,
    Draft = 3
}

export enum TaskPriorities {
    Low = 0,
    Middle = 1,
    Hi = 2,
    Urgently = 3,
    Later = 4
}

export type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

export type ResponseType<D = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: string[]
    data: D
}

export type  UpdateTaskType = {
    title: string
    description: string
    completed: boolean
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
}

export type TaskType = {
    description: string
    title:string
    status: TaskStatuses
    priority: TaskPriorities
    startDate: string
    deadline: string
    id: string
    todoListId: string
    order: number
    addedDate: string
}

export type TasksResponsType = {
    items: Array<TaskType>
    fieldsErrors: string[]
    totalCount: number
    error: string | null
}

type CreateTaskType = {
    item: TasksResponsType
    fieldsErrors: string[]
    messages: string[]
    resultCode: number
}


export const todolistAPI = {
    getTodolist() {
        return  instance.get<Array<TodolistType>>('todo-lists')
    },

    updateTodolist(todolistId: string, title: string) {
        return instance.put<ResponseType>(`todo-lists/${todolistId}`,
            {title: title}
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}`
        )
    },
    createTodolist(title: string) {
        return instance.post<ResponseType<{item: TodolistType}>>('todo-lists', {title:title}
        )
    },

    getTasks(todolistId:string) {
        return  instance.get<TasksResponsType>(`todo-lists/${todolistId}/tasks`)
    },

    createTask(todolistId:string,title: string) {
        return instance.post<CreateTaskType>(`todo-lists/${todolistId}/tasks`, {title:title}
        )
    },
    updateTask(todolistId: string, taskId: string, title:string) {
        return instance.put<UpdateTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`, {title: title}
        )
    },
    deleteTask(todolistId: string, taskId: string) {
        return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`)
    },




}
