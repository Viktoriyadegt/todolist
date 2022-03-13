import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterValuesType} from "./App";

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
                props.addTask(props.todolistId, title.trim())
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }

    const addTaskNewTaskTitle = () => {
        if (title.trim() !== '') {
            props.addTask(props.todolistId, title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

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

    return (
        <div>
            <h3>
                {props.title}
                <button onClick={onClickHandlerForRemoveTodo}>X</button>
            </h3>


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
                               onChange={(e) => onChangeStatusHandler(t.id, e.currentTarget.checked)}
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
