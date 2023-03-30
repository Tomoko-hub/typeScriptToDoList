import { FormControl, TextField } from '@material-ui/core';
import React,{ useState, useEffect } from 'react';
import './App.css';
import { db } from "./firebase";
import { AddToPhotos } from '@material-ui/icons';

const App:React.FC=()=> {

  const [tasks, setTasks] = useState([{id:"",title:""}]);
  const [input, setInput] = useState("");

  useEffect(()=>{
    const unSub = db.collection("tasks").onSnapshot((snapshot)=>{
      setTasks(
        snapshot.docs.map((doc)=>({id:doc.id,title:doc.data().title}))
      );
    });
    return ()=>unSub();
  },[]);

  const newTask = (event:React.MouseEventHandler<HTMLButtonElement>)=>{
    db.collection("task").add({title:input});
    setInput("");
  }

  return (
  <div className="App">
    <h1>ToDo List by React/Firebase</h1>
    <FormControl>
      <TextField
        label="New Task ?"
        value={input}
        onChange={(event:React.ChangeEvent<HTMLInputElement>)=>setInput(event.target.value)}
      ></TextField>
    </FormControl>
    <button 
      disabled={!input}
      onClick={newTask}
    >
      <AddToPhotos />
    </button>
    {tasks.map((task)=>(
    <h3 key={task.id}>{task.title}</h3>
    ))}
  </div>
  )
};

export default App;
