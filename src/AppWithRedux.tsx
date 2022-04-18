import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import AppItemForm from "./AppItemForm";
import ButtonAppBar from "./Compenents/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC} from "./state/tasks-reducer";
import {AddTodolistAC} from "./state/todolist-reducer";
import {ChangeFilterAC, EditableTodoTitleAC, RemoveTodolistAC} from "./state/tasks-todolist-reducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./state/store";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}


function AppWithRedux() {

    const dispatch = useDispatch()

    const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolist)
    const tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const removeTask = (todolistId: string, id: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatch(ChangeFilterAC(todolistId, value))
    }

    const onChangeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }
    const removeTodo = (todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }
    const AddTodolistTitle = (title: string) => {
        let action = AddTodolistAC(title);
        dispatch(action)
    }
    const editableTodoTitle = (todolistId: string, title: string) => {
        dispatch(EditableTodoTitleAC(todolistId, title))

    }
    const editableTaskTitle = (todolistId: string, TID: string, title: string) => {
        dispatch(changeTitleTaskAC(TID, title, todolistId))
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AppItemForm callback={AddTodolistTitle}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(m => {
                        let tasksForTodoList = tasks[m.id];
                        if (m.filter === 'active') {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                        } else if (m.filter === 'completed') {
                            tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                        }

                        return <Grid item>
                            <Paper style={{padding: '20px'}}>
                                <Todolist
                                    key={m.id}
                                    todolistId={m.id}
                                    title={m.title}
                                    tasks={tasksForTodoList}
                                    removeTask={removeTask}
                                    changeFilter={changeFilter}
                                    addTask={addTask}
                                    onChangeTaskStatus={onChangeTaskStatus}
                                    filter={m.filter}
                                    removeTodo={removeTodo}
                                    editableTodoTitle={editableTodoTitle}
                                    editableTaskTitle={editableTaskTitle}
                                />
                            </Paper>
                        </Grid>
                    })}
                </Grid>

            </Container>

        </div>
    );
}


export default AppWithRedux;
