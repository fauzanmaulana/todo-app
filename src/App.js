import React, { useState } from 'react';
import { TextField, Button, List, ListItem, ListItemIcon, Checkbox, ListItemText, Container } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

function App() {

  const useStyles = makeStyles((item) => ({
    btnmargin: {
      margin: item.spacing(1)
    }
  }));

  const classes = useStyles()

  const [lists, setList] = useState([])
  const [input, setInput] = useState('')
  const [checked, setChecked] = useState([0])

  const addList = e => {
    e.preventDefault()
    setList([...lists, input])
    setInput('')
  }

  const handleToggle = (value) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(newChecked);
  };

  return (
    <div className="App">
      <Container maxWidth="sm">

      <h1>Write the things that you have todo bellow!</h1>
      <form>
        <TextField value={input} onChange={e => setInput(e.target.value)} id="list-input" label="write here.." variant="outlined" />

        <Button onClick={addList} className={classes.btnmargin} variant="outlined" color="primary" size="large" type="submit">Add</Button>

        <List>
          {lists.map((value, index) => (
            <ListItem key={index} role={undefined} dense onClick={handleToggle(value)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': `checkbox-list-label-${value}` }}
              />
            </ListItemIcon>
            <ListItemText id={`checkbox-list-label-${value}`} primary={value} />
            <DeleteOutlinedIcon/>
          </ListItem>
          ))}
        </List>
        
      </form>
      </Container>
    </div>
  );
}

export default App;