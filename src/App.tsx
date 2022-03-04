import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTask] = useState<Array<TasksType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'React', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id: string) => {
        let resultTasks = tasks.filter(t => t.id !== id)
        setTask(resultTasks)
    }

    const addTask = (title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        setTask([newTask, ...tasks])
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    const onChangeTaskStatus = (id: string, isDone: boolean) => {
        const task = tasks.find(t => t.id === id)
        if (task) {
            task.isDone = isDone
        }
            setTask([...tasks])
        }


        let tasksForTodoList = tasks;
        if (filter === 'active') {
            tasksForTodoList = tasks.filter(t => t.isDone === false)
        } else if (filter === 'completed') {
            tasksForTodoList = tasks.filter(t => t.isDone === true)
        }

        return (
            <div className="App">
                <Todolist title='What to learn'
                          tasks={tasksForTodoList}
                          removeTask={removeTask}
                          changeFilter={changeFilter}
                          addTask={addTask}
                          onChangeTaskStatus={onChangeTaskStatus}
                          filter={filter}
                />
            </div>
        );
    }


export default App;
