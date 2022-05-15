import React, {useCallback} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import AddItemForm from "./AddItemForm";
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

    const removeTask = useCallback((todolistId: string, id: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])

    const addTask = useCallback((todolistId: string, title: string) => {
        dispatch(addTaskAC(title, todolistId))
    },[dispatch])

    const changeFilter = useCallback((todolistId: string, value: FilterValuesType) => {
        dispatch(ChangeFilterAC(todolistId, value))
    }, [dispatch])

    const onChangeTaskStatus = useCallback((todolistId: string, id: string, isDone: boolean) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }, [dispatch])

    const removeTodo = useCallback((todolistId: string) => {
        dispatch(RemoveTodolistAC(todolistId))
    }, [dispatch])

    const AddTodolistTitle = useCallback((title: string) => {
        let action = AddTodolistAC(title);
        dispatch(action)
    },[dispatch])

    const editableTodoTitle = useCallback((todolistId: string, title: string) => {
        dispatch(EditableTodoTitleAC(todolistId, title))

    }, [dispatch])
    const editableTaskTitle = useCallback((todolistId: string, TID: string, title: string) => {
        dispatch(changeTitleTaskAC(TID, title, todolistId))
    }, [dispatch])


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={AddTodolistTitle}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(m => {
                        return (<div key={m.id}>
                                <Grid item>
                            <Paper style={{padding: '20px'}}>
                                <Todolist
                                    key={m.id}
                                    todolistId={m.id}
                                    title={m.title}
                                    tasks={tasks[m.id]}
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
                        </div>)})}
                </Grid>

            </Container>

        </div>
    );
}


export default AppWithRedux;
