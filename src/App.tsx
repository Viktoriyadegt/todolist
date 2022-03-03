import React from 'react';
import './App.css';
import {TasksType, Todolist} from "./Todolist";

function App() {

    const tasks1: Array<TasksType>= [
        {id:1, title: 'Naruto', isDone: true},
        {id:2, title: 'Jeanie and Georgia', isDone: true},
        {id:3, title: 'jungle cruise', isDone: true}
    ]
    const tasks2:Array<TasksType>= [
        {id:1, title: 'HTML&CSS', isDone: true},
        {id:2, title: 'JS', isDone: true},
        {id:3, title: 'React', isDone: false}
    ]

  return (
    <div className="App">
     <Todolist title='Movies' tasks={tasks1}/>
     <Todolist title='What to learn' tasks={tasks2}/>
    </div>
  );
}


export default App;
