import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

export type TasksType = {
    id: string
    title: string
    isDone: boolean
}

export type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
    onChangeTaskStatus: (id: string, isDone: boolean) => void
    filter: FilterValuesType
}
export const Todolist = (props: TodolistPropsType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            if (title.trim() !== '') {
                props.addTask(title.trim())
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }

    const addTaskNewTaskTitle = () => {
        if (title.trim() !== '') {
            props.addTask(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    const onClickRemoveTaskHandler = (id: string) => {
        props.removeTask(id)
    }

    const onClickFilterHandler = (value: FilterValuesType) => {
        props.changeFilter(value)
    }


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <div>
                    <input value={title}
                           onChange={OnChangeHandler}
                           onKeyPress={onKeyPressHandler}
                           className={error ? 'error' : ''}
                    />
                    <button onClick={addTaskNewTaskTitle}>+</button>
                    {error && <div className={'error-message'}>Title is required!</div>}
                </div>
                <ul>
                    {props.tasks.map(t => <li key={t.id} className={t.isDone === true ? 'is-done' : ''}>
                        <input type='checkbox'
                               checked={t.isDone}
                               onChange={(e) => {
                                   props.onChangeTaskStatus(t.id, e.currentTarget.checked)
                               }}
                        />
                        <span>{t.title}</span>
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
