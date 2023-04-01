import { FormControl, List, TextField } from '@material-ui/core';
import React,{ useState, useEffect } from 'react';
import { db } from "./firebase";
import { AddToPhotos } from '@material-ui/icons';
import TaskItem from './TaskItem';
import styles from './App.module.css'


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

  const newTask = (event:React.MouseEvent<HTMLButtonElement>)=>{
    db.collection("task").add({title:input});
    setInput("");
  }

  return (
  <div className={styles.app__root}>
    <h1>ToDo List by React/Firebase</h1>
    <br />
    <FormControl>
      <TextField
       InputLabelProps ={{
          shrink: true,
       }}
        label="New Task ?"
        value={input}
        //React.DOMAttributes<HTMLButtonElement>.onClick?: React.MouseEventHandler<HTMLButtonElement>
        onChange={(event:React.ChangeEvent<HTMLInputElement>)=>
          setInput(event.target.value)
        }
       />
    </FormControl>
    <button className={styles.app__icon}
      disabled={!input}
      onClick={newTask}
    >
      <AddToPhotos />
    </button>
    <List>
      {tasks.map((task)=>(
      <TaskItem key={task.id} id={task.id} title={task.title} />
      ))}
    </List>
  </div>
  )
};

export default App;
