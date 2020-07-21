import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, List, Grid } from '@material-ui/core';
import Cookies from 'js-cookie'
import Todo from './component/Todo.js';
import db from './firebase.js';
import firebase from 'firebase'
import './App.css';

function App() {

  const [lists, setList] = useState([])
  const [input, setInput] = useState('')
  let isSession = false

  useEffect(() => {

    if(!Cookies.get('username')){
      const username = prompt('Masukan Username')
      Cookies.set('username', username)
      db.collection('user').add({
        username: username,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      })
    }

    db.collection('user').where('username', '==', Cookies.get('username')).onSnapshot(snapshot => {
      snapshot.docs.map(doc => (getTodoById(doc.id)))
    })

    const getTodoById = (todoId) => {
      Cookies.set('id', todoId)
      mountedGetTodoById(Cookies.get('id'))
    }
    
    const mountedGetTodoById = (idTodo) => {
      db.collection('todos').where('userId', '==', idTodo).onSnapshot(snapshot => {
        setList(snapshot.docs.map(doc => ({id: doc.id, todo: doc.data().todo, finish: doc.data().finish})))
      })
      isSession = true
    }

    if(isSession){
      mountedGetTodoById(Cookies.get('id'))
    }

  }, []);

  const addList = e => {
    e.preventDefault()
    db.collection('todos').add({
      userId: Cookies.get('id'),
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

      <h2 className="title">Write the things that you have todo bellow!</h2>

      <Container maxWidth="sm" className="container">

      <div className={lists.length > 7 ? "todolistscroll" : "todolist"}>
        <List>
          {lists.map((value, index) => ( <Todo item={value.todo} finish={value.finish} index={index} id={value.id}/> ))}
        </List>
      </div>

      <form>
        <Grid container spacing={0}>

          <Grid xs={10}>
            <TextField value={input} onChange={e => setInput(e.target.value)} id="list-input" label="write here.." variant="outlined" fullWidth={true} />
          </Grid>

          <Grid xs={2}>
            <Button onClick={addList} disabled={!input} style={{margin: 7}} variant="outlined" color="primary" size="large" type="submit">Add</Button>
          </Grid>

        </Grid>
      </form>

      </Container>
    </div>
  );
}

export default App;