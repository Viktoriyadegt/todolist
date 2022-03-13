import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'active' | 'completed'
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {
    const todolistId1 = v1();
    const todolistId2 = v1();

    let [tasks, setTasks] = useState({
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

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: todolistId1, title: 'What to learn', filter: 'all'},
        {id: todolistId2, title: 'What to learn', filter: 'all'}
    ])
    // let [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (todolistId:string, id: string) => {
        setTasks({...tasks,[todolistId]: tasks[todolistId].filter(f=>f.id!==id)})

        // let resultTasks = tasks.filter(t => t.id !== id)
        // setTask(resultTasks)
    }

    const addTask = (todolistId:string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistId]: [newTask, ...tasks[todolistId]]})
        // setTask([newTask, ...tasks])
    }

    const changeFilter = (todolistId:string, value: FilterValuesType) => {
        setTodolists(todolists.map(m=>m.id===todolistId ? {...m,filter:value} : m))
        // setFilter(value)
    }

    const onChangeTaskStatus = (todolistId:string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m=>m.id===id ? {...m, isDone: isDone} : m)
        // const task = tasks.find(t => t.id === id)
        // if (task) {
        //     task.isDone = isDone
        // }
        // setTasks([...tasks])
    })}
    const removeTodo = (todolistId: string) => {
        setTodolists(todolists.filter(f=>f.id!==todolistId))

    }


    return (
        <div className="App">
            {todolists.map(m => {
                    let tasksForTodoList = tasks[m.id];
                    if (m.filter === 'active') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === false)
                    } else if (m.filter === 'completed') {
                        tasksForTodoList = tasksForTodoList.filter(t => t.isDone === true)
                    }

                    return (
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
                        />
                    )
                }
            )}


        </div>
    );
}


export default App;
