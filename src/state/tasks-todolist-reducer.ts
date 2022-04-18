import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";


export const todolistReducer = (state: Array<TodolistType>, action:ActionsType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            return state.filter(f => f.id !== action.payload.id)
        }
        case "ADD_TODOLIST": {
            const newTodo: TodolistType = {id: v1(), title: action.payload.title, filter: 'all'}
            return [newTodo,...state]
        }
        case "CHANGE-TODOLIST-TITLE": {
            return state.map(m=>m.id===action.payload.id ? {...m,title:action.payload.title} : m)
        }
        case "CHANGE-TODOLIST-FILTER":{
           return  state.map(m=>m.id===action.payload.id ? {...m,filter:action.payload.filter} : m)
        }
        default:
            return state
    }
}

export type  ActionsType = RemoveTodolistACType | AddTodolistACType | EditableTodoTitleACType | ChangeFilterACType


export type RemoveTodolistACType = ReturnType<typeof RemoveTodolistAC>

export const RemoveTodolistAC = (todolistID:string) => {
    return {
        type: "REMOVE-TODOLIST",
        payload: {
            id: todolistID
        }
    } as const
}
export type AddTodolistACType = ReturnType<typeof AddTodolistAC>
export const AddTodolistAC = (newTodolistTitle:string) => {
    return {
        type: "ADD_TODOLIST",
        payload: {
            title: newTodolistTitle
        }
    } as const
}
export type EditableTodoTitleACType = ReturnType<typeof EditableTodoTitleAC>
export const EditableTodoTitleAC = (todolistId2:string, newTodolistTitle:string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: todolistId2,
            title: newTodolistTitle
        }
    } as const
}
export type ChangeFilterACType = ReturnType<typeof ChangeFilterAC>
export const ChangeFilterAC = (id:string, filter:FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload:{id, filter}
    } as const
}