import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";
import EditableSpan, {EditableSpanType} from "./EditableSpan";
import AppItemForm from "./AppItemForm";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    todolistId: string
    title: string
    tasks: Array<TasksType>
    removeTask: (todolistId: string, id: string) => void
    changeFilter: (todolistId: string, value: FilterValuesType) => void
    addTask: (todolistId: string, title: string) => void
    onChangeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodo: (todolistId: string) => void
    editableTodoTitle: (todolistId:string, title:string)=>void
    editableTaskTitle:(todolistId:string, TID:string, title:string)=>void
}
export const Todolist = (props: TodolistPropsType) => {

    const onClickRemoveTaskHandler = (id: string) => {
        props.removeTask(props.todolistId, id)
    }

    const onClickFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value)
    }

    const onChangeStatusHandler = (id: string, isDone: boolean) => {
        props.onChangeTaskStatus(props.todolistId, id, isDone)
    }

    const onClickHandlerForRemoveTodo = () => {
        props.removeTodo(props.todolistId)
    }
    const addTaskTitle = (title:string) => {
        props.addTask(props.todolistId,title)

    }
    const editableTodoTitleHandler = (title:string) => {
        props.editableTodoTitle(props.todolistId, title)
    }
    const editableTaskTitleHandler = (TID:string,title:string) => {
        props.editableTaskTitle(props.todolistId,TID,title )

    }


    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={editableTodoTitleHandler}/>
                <button onClick={onClickHandlerForRemoveTodo}>X</button>
            </h3>


            <div>
                <div>
                   <AppItemForm  callback={addTaskTitle}/>
                </div>
                <ul>
                    {props.tasks.map(t => <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                        <input type='checkbox'
                               checked={t.isDone}
                               onChange={(e) => onChangeStatusHandler(t.id, e.currentTarget.checked)}
                        />
                        <EditableSpan title={t.title} callback={(title)=>editableTaskTitleHandler(t.id, title)}/>
                        <button onClick={() => onClickRemoveTaskHandler(t.id)}>x</button>

                    </li>)}


                </ul>
            </div>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => onClickFilterHandler('all')}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => onClickFilterHandler('active')}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => onClickFilterHandler('completed')}>Completed
                </button>
            </div>

        </div>
    )
}
