import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, List, Grid } from '@material-ui/core';
import Todo from './component/Todo.js';
import db from './firebase.js';
import firebase from 'firebase'
import './App.css';

function App() {

  const [lists, setList] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    db.collection('todos').orderBy('writed', 'desc').onSnapshot(snapshot => {
      setList(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, finish: doc.data().finish})))
    })
  }, []);
  

  const addList = e => {
    e.preventDefault()
    db.collection('todos').add({
      todo: input,
      deadline: null,
      finish: -1,
      writed: firebase.firestore.FieldValue.serverTimestamp()
    })
    setList([...lists, input])
    setInput('')
  }

  return (
    <div className="App">
      <Container maxWidth="sm">

      <h2>Write the things that you have todo bellow!</h2>

      <form>
        <Grid container spacing={0}>

          <Grid xs={10}>
            <TextField value={input} onChange={e => setInput(e.target.value)} id="list-input" label="write here.." variant="outlined" fullWidth={true} />
          </Grid>

          <Grid xs={2}>
            <Button onClick={addList} disabled={!input} style={{margin: 7}} variant="outlined" color="primary" size="large" type="submit">Add</Button>
          </Grid>

        </Grid>

        <List>
          {lists.map((value, index) => ( <Todo item={value.todo} finish={value.finish} index={index} id={value.id}/> ))}
        </List>
        
      </form>

      </Container>
    </div>
  );
}

export default App;