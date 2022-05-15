import React, {useReducer, useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AddItemForm from "./AddItemForm";
import ButtonAppBar from "./Compenents/ButtonAppBar";
import {Container, Grid, Paper} from "@mui/material";
import {addTaskAC, changeTaskStatusAC, changeTitleTaskAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";
import {AddTodolistAC, todolistReducer} from "./state/todolist-reducer";
import {ChangeFilterAC, EditableTodoTitleAC, RemoveTodolistAC} from "./state/tasks-todolist-reducer";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksStateType = {
    [key: string]: Array<TasksType>
}


function AppWithReducer() {
    let todolistId1 = v1();
    let todolistId2 = v1();

    let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
            [todolistId1]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false}
            ],
            [todolistId2]: [
                {id: v1(), title: 'HTML&CSS', isDone: true},
                {id: v1(), title: 'JS', isDone: true},
                {id: v1(), title: 'React', isDone: false}
            ],

        }
    )

    const [todolists, dispatchToTodolists] = useReducer(todolistReducer, [
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'}
    ])

    const removeTask = (todolistId: string, id: string) => {
        dispatchToTasks(removeTaskAC(id, todolistId))
    }

    const addTask = (todolistId: string, title: string) => {
        dispatchToTasks(addTaskAC(title, todolistId))
    }

    const changeFilter = (todolistId: string, value: FilterValuesType) => {
        dispatchToTodolists(ChangeFilterAC(todolistId, value))
    }

    const onChangeTaskStatus = (todolistId: string, id: string, isDone: boolean) => {
        dispatchToTasks(changeTaskStatusAC(id, isDone, todolistId))
    }
    const removeTodo = (todolistId: string) => {
        dispatchToTodolists(RemoveTodolistAC(todolistId))
    }
    const AddTodolistTitle = (title: string) => {
        let action = AddTodolistAC(title);
        dispatchToTodolists(action)
        dispatchToTasks(action)
    }
    const editableTodoTitle = (todolistId: string, title: string) => {
        dispatchToTodolists(EditableTodoTitleAC(todolistId, title))

    }
    const editableTaskTitle = (todolistId: string, TID: string, title: string) => {
        dispatchToTasks(changeTitleTaskAC(TID, title, todolistId))
    }


    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={AddTodolistTitle}/>
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


export default AppWithReducer;
