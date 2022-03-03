import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'active' | 'completed'

function App() {

    let [tasks, setTask] = useState<Array<TasksType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'React', isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (id:number) => {
        let resultTasks = tasks.filter(t => t.id !== id)
        setTask(resultTasks)
    }

    const changeFilter = (value: FilterValuesType) => {
        setFilter(value)
    }

    let tasksForTodoList = tasks;
    if (filter === 'active') {
        tasksForTodoList = tasks.filter(t => t.isDone === false)
    } else if ( filter === 'completed') {
        tasksForTodoList = tasks.filter(t => t.isDone === true)
    }

    return (
        <div className="App">
            <Todolist title='What to learn'
                      tasks={tasksForTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
            />
        </div>
    );
}


export default App;
