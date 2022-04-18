import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistACType, RemoveTodolistACType} from "./todolist-reducer";

export type  ActionsType = RemoveTaskACType | AddTaskACType | ChangeTaskStatusACType | AddTodolistACType | ChangeTitleTaskACType | RemoveTodolistACType

let initialState: TasksStateType = {}

export const tasksReducer = (state: TasksStateType = initialState , action: ActionsType) => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.todolistID]: state[action.todolistID].filter(f=>f.id !== action.taskId)
            }
        }
        case "ADD-TASK": {
            return {
                ...state,
                [action.todolistID]: [{id:v1(), title:action.title, isDone: false}, ...state[action.todolistID]]
            }
        }
        case "CHANGE-TASK-STATUS": {
            return {
                ...state,
                [action.todolistID]:state[action.todolistID].map(m=>m.id === action.taskId ? {...m, isDone:action.isDone} : m)
            }
        }
        case "CHANGE-TITLE-TASK": {
            return {
                ...state,
                [action.todolistID]:state[action.todolistID].map(m=>m.id === action.taskId ? {...m, title:action.title} : m)
            }
        }
        case "ADD_TODOLIST": {
            return {
                ...state,
                [action.todolistId] : []
            }
        }
        case "REMOVE-TODOLIST": {
            //let {[action.payload.id]:[], ...part} = {...state}
            let newState = {...state}
            delete newState[action.payload.id]
            return newState
        }


        default:
            return state
    }
}


export type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export type AddTaskACType = ReturnType<typeof addTaskAC>
export type ChangeTaskStatusACType = ReturnType<typeof changeTaskStatusAC>
export type ChangeTitleTaskACType = ReturnType<typeof changeTitleTaskAC>

export const removeTaskAC = (taskId: string, todolistID: string) => {
    return {type: "REMOVE-TASK", taskId, todolistID} as const
}

export const addTaskAC = (title: string, todolistID: string) => {
    return {type: "ADD-TASK", title, todolistID} as const
}

export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistID: string) => {
    return {type: "CHANGE-TASK-STATUS", taskId,isDone, todolistID} as const
}
export const changeTitleTaskAC = (taskId: string, title: string, todolistID: string) => {
    return {type: "CHANGE-TITLE-TASK", taskId,title, todolistID} as const
}
