import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, List } from '@material-ui/core';
import Todo from './component/Todo.js';
import db from './firebase.js';
import firebase from 'firebase'
import './App.css';

function App() {

  const [lists, setList] = useState([])
  const [input, setInput] = useState('')

  useEffect(() => {
    db.collection('todos').orderBy('writed', 'desc').onSnapshot(snapshot => {
      setList(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo})))
    })
  }, []);
  

  const addList = e => {
    e.preventDefault()
    db.collection('todos').add({
      todo: input,
      deadline: null,
      finish: false,
      writed: firebase.firestore.FieldValue.serverTimestamp()
    })
    setList([...lists, input])
    setInput('')
  }

  return (
    <div className="App">
      <Container maxWidth="sm">

      <h1>Write the things that you have todo bellow!</h1>
      <form>
        <TextField value={input} onChange={e => setInput(e.target.value)} id="list-input" label="write here.." variant="outlined" />

        <Button onClick={addList} disabled={!input} style={{margin: 7}} variant="outlined" color="primary" size="large" type="submit">Add</Button>

        <List>
          {lists.map((value, index) => ( <Todo item={value.todo} index={index} id={value.id}/> ))}
        </List>
        
      </form>

      </Container>
    </div>
  );
}

export default App;