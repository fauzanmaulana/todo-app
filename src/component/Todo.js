import React, {useState} from 'react'
import { ListItem, ListItemIcon, Checkbox, ListItemText, Grid, Button, Dialog, DialogContent, DialogContentText, DialogActions, TextField } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import db from '../firebase.js';

function Todo(props) {

    const date = new Date(props.writed * 1000);
    const clock = ` | ${date.getHours()}:${date.getMinutes()}`
    
    // * handle toggle checkbox
    const [finish, setFinish] = useState(-1)

    const handleToggle = id => () => {
        db.collection('todos').doc(id).get()
        .then((docRef) => { setFinish(docRef.data().finish) })

        if(finish === -1){
            db.collection('todos').doc(id).set({
                finish: 1
            }, { merge: true })
        }else{
            db.collection('todos').doc(id).set({
                finish: -1
            }, { merge: true })
        }
    }

    // * modal
    const [open, setOpen] = useState(false)

    // * change list component
    const [input, setInput] = useState('')
    const [editInput, setEditInput] = useState(false)

    const listChange = e => {
        if(e.keyCode === 13){
            db.collection('todos').doc(props.id).set({
                todo: input
            }, { merge: true })

            setEditInput(false)
        }else if(e.keyCode === 27){
            setEditInput(false)
        }
    }

    return (
        <div>
            <Grid container spacing={0}>
                <Grid xs={10}>
                    <ListItem key={props.id} role={undefined}>
                        <ListItemIcon>
                        <Checkbox
                            checked={ props.finish !== -1}
                            color='primary'
                            onClick={handleToggle(props.id)}
                        />
                        </ListItemIcon>
                        { editInput 

                        ? <TextField id="edit-input" placeholder={`${props.item}.. (press any to cancel)`} label="edit here.." autoFocus variant="outlined" onChange={e => setInput(e.target.value)} fullWidth={true} onKeyDown={listChange} onBlur={() => setEditInput(false)}/> 

                        : <ListItemText id={`checkbox-list-label-${props.item}`} primary={props.item} 
                        secondary={ String(date).substr(0, 10) + clock } onClick={() => setEditInput(true)} style={{cursor: 'pointer'}} /> }

                    </ListItem>
                </Grid>
                <Grid xs={2} style={{cursor: 'pointer'}}>
                    <Button onClick={() => setOpen(true)}>
                        <DeleteOutlinedIcon color='secondary' style={{margin: 15}}/>
                    </Button>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                keepMounted
                aria-labelledby="alert-dialog-slide-title"
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description" style={{textAlign: 'center'}}>
                        you sure ?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary" size='small'>no</Button>
                    <Button onClick={() => {(db.collection('todos').doc(props.id).delete()); (setOpen(false))}} color="secondary" size='small'>yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Todo
