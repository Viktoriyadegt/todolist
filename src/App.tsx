import React, {useState} from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";
import {v1} from "uuid";
import AppItemForm from "./AppItemForm";

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

    const removeTask = (todolistId:string, id: string) => {
        setTasks({...tasks,[todolistId]: tasks[todolistId].filter(f=>f.id!==id)})
    }

    const addTask = (todolistId:string, title: string) => {
        const newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks,[todolistId]: [newTask, ...tasks[todolistId]]})
    }

    const changeFilter = (todolistId:string, value: FilterValuesType) => {
        setTodolists(todolists.map(m=>m.id===todolistId ? {...m,filter:value} : m))
    }

    const onChangeTaskStatus = (todolistId:string, id: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(m=>m.id===id ? {...m, isDone: isDone} : m)

    })}
    const removeTodo = (todolistId: string) => {
        setTodolists(todolists.filter(f=>f.id!==todolistId))

    }
    const AddTodolistTitle = (title:string) => {
        const newTodo:TodolistType = {id:v1(), title:title, filter:'all'}
        setTodolists([newTodo,...todolists]);
        setTasks({...tasks, [newTodo.id]:[]})
    }
    const editableTodoTitle = (todolistId:string, title:string) => {
        setTodolists(todolists.map(m=>m.id===todolistId ? {...m,title:title} : m))


    }
    const editableTaskTitle = (todolistId:string, TID:string, title:string) => {
        setTasks({...tasks,[todolistId]: tasks[todolistId].map(m=>m.id===TID ? {...m,title:title} : m)})
    }


    return (
        <div className="App">
           <AppItemForm callback={AddTodolistTitle}/>
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
                            editableTodoTitle={editableTodoTitle}
                            editableTaskTitle={editableTaskTitle}
                        />
                    )
                }
            )}


        </div>
    );
}


export default App;
