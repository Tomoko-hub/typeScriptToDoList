import React,{useState} from 'react'
import firebase from 'firebase'
import { ListItem, TextField, Grid } from '@material-ui/core'
import { DeleteOutlineOutlined } from '@material-ui/icons'
import { EditOutlined } from '@material-ui/icons'
import { db } from './firebase'

interface PROPS {
    id: string;
    title: string;
}

const TaskItem:React.FC<PROPS> = (props) => {

    const [title, setTitle] = useState(props.title);

    const editTask=()=>{
      db.collection("tasks").doc(props.id).set({title:title}, {merge:true});
    }

    const deleteTask=()=>{
      db.collection("tasks").doc(props.id).delete();
    }

  return (
      <ListItem>
        <h2>{props.title}</h2>
        <Grid container justifyContent='flex-end'>
          <TextField
            InputLabelProps={{
              shrink:true
            }}
            label="Edit task"
            value={title}
            onChange={(event:React.ChangeEvent<HTMLInputElement>)=>
              setTitle(event.target.value)
            }
          ></TextField>
        </Grid>
        <button onClick={editTask}>
          <EditOutlined />
        </button>
        <button onClick={deleteTask}>
          <DeleteOutlineOutlined />
        </button>
      </ListItem>
  )
}

export default TaskItem