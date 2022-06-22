
import { Dispatch } from 'redux'
import {ResponseType} from '../api/todolists-api'

import {setAppErrorAC, setAppStatusAC} from "../app/App-reducer";
import {AppActionsType} from "../app/store";

export const handleServerAppError = <D>(data:ResponseType<D>, dispatch:Dispatch<AppActionsType>) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch:Dispatch<AppActionsType> ) => {
    dispatch(setAppErrorAC(error.message? error.message : 'Some error occurred'))
    dispatch(setAppStatusAC('failed'))
}

