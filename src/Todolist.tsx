import React, {useCallback} from "react";
import {FilterValuesType} from "./App";
import EditableSpan from "./EditableSpan";
import AddItemForm from "./AddItemForm";
import {Button, IconButton} from "@mui/material";
import {Delete} from "@mui/icons-material";
import Tasks from "./state/Tasks.";

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
    editableTodoTitle: (todolistId: string, title: string) => void
    editableTaskTitle: (todolistId: string, TID: string, title: string) => void
}
export const Todolist = React.memo((props: TodolistPropsType) => {

    const onClickFilterHandler = useCallback((value: FilterValuesType) => {
        props.changeFilter(props.todolistId, value)
    }, [props.changeFilter, props.todolistId])

    const onClickHandlerForRemoveTodo = () => {
        props.removeTodo(props.todolistId)
    }
    const addTaskTitle = useCallback((title: string) => {
        props.addTask(props.todolistId, title)
    }, [props.addTask, props.todolistId])

    const editableTodoTitleHandler = useCallback((title: string) => {
        props.editableTodoTitle(props.todolistId, title)
    }, [props.editableTodoTitle, props.todolistId])

    let tasksForTodoList = props.tasks;
    if (props.filter === 'active') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
    } else if (props.filter === 'completed') {
        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
    }

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} callback={editableTodoTitleHandler}/>
                <IconButton aria-label="delete" onClick={onClickHandlerForRemoveTodo}>
                    <Delete/>
                </IconButton>
            </h3>


            <div>
                <div>
                    <AddItemForm callback={addTaskTitle}/>
                </div>
                <ul>
                    {tasksForTodoList.map(t => <Tasks
                        key={t.id}
                        tasks={t}
                        todolistId={props.todolistId}
                        removeTask={props.removeTask}
                        editableTaskTitle={props.editableTaskTitle}
                        onChangeTaskStatus={props.onChangeTaskStatus}
                    />)}

                </ul>
            </div>
            <div>
                <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                        onClick={() => onClickFilterHandler('all')}>All
                </Button>
                <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                        onClick={() => onClickFilterHandler('active')}>Active
                </Button>
                <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                        onClick={() => onClickFilterHandler('completed')}>Completed
                </Button>

            </div>

        </div>
    )
})
