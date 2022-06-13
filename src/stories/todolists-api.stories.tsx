import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {todolistAPI} from "../API/ todolist-api";

export default {
    title: 'API'
}


export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            //debugger
            todolistAPI.getTodolist()
                .then((res) => {
                    setState(res.data)
                })
        },
        [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>('')

    const createTodolist = () => {
        todolistAPI.createTodolist(title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'todolist title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTodolist}>create todolist</button>
        </div>
    </div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)

    const deleteTodolist = () => {
        todolistAPI.deleteTodolist(todolistId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTodolist}>delete todolist</button>
        </div>

    </div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>('')

    const updateTodolistTitle = () => {
        todolistAPI.updateTodolist(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'todolist title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTodolistTitle}>update todolist title</button>
        </div>
    </div>
}

export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
            const todolistId = '81391893-338f-4e35-8847-b8442105d6e8'
            todolistAPI.getTasks(todolistId)
                .then((res) => {
                    setState(res.data)
                })
        },
        [])
    return <div>{JSON.stringify(state)}</div>
}

export const CreateTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [title, setTitle] = useState<any>('')

    const createTask = () => {
        todolistAPI.createTask(todolistId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'task title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={createTask}>create task</button>
        </div>
    </div>
}

export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const [title, setTitle] = useState<any>('')
    const updateTask = () => {
        todolistAPI.updateTask(todolistId, taskId, title)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <input placeholder={'task title'} value={title} onChange={(e) => {
                setTitle(e.currentTarget.value)
            }}/>
            <button onClick={updateTask}>update task title</button>
        </div>
    </div>
}


export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    const [todolistId, setTodolistId] = useState<any>(null)
    const [taskId, setTaskId] = useState<any>(null)
    const deleteTask = () => {
        todolistAPI.deleteTask(todolistId, taskId)
            .then((res) => {
                setState(res.data)
            })
    }

    return <div>
        {JSON.stringify(state)}
        <div>
            <input placeholder={'taskId'} value={taskId} onChange={(e) => {
                setTaskId(e.currentTarget.value)
            }}/>
            <input placeholder={'todolistId'} value={todolistId} onChange={(e) => {
                setTodolistId(e.currentTarget.value)
            }}/>
            <button onClick={deleteTask}>delete task</button>
        </div>
    </div>
}


