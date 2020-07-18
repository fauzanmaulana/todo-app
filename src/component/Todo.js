import React, {useState} from 'react'
import { ListItem, ListItemIcon, Checkbox, ListItemText, Grid, Button, Dialog, DialogContent, DialogContentText, DialogActions } from '@material-ui/core';
import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';
import db from '../firebase.js';

function Todo(props) {
    
    const [checked, setChecked] = useState([0])
    const [changeList, setChangeList] = useState(true)

    const handleToggle = (item) => () => {
        const currentIndex = checked.indexOf(item);
        const newChecked = [...checked];

        if (currentIndex === -1) {
        newChecked.push(item);
        } else {
        newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    }

    const listChange = e => {
        console.log(e.target)
    }

    // * modal
    const [open, setOpen] = useState(false)

    return (
        <div>
            <Grid container spacing={0}>
                <Grid xs={10}>
                    <ListItem key={props.index} role={undefined}>
                        <ListItemIcon>
                        <Checkbox
                            edge="start"
                            checked={checked.indexOf(props.item) !== -1}
                            tabIndex={-1}
                            disableRipple
                            inputProps={{ 'aria-labelledby': `checkbox-list-label-${props.item}` }}
                            onClick={handleToggle(props.item)}
                        />
                        </ListItemIcon>
                        <ListItemText id={`checkbox-list-label-${props.item}`} primary={props.item} 
                        secondary={ "it is an deadline" } onClick={listChange}/>
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
                    <Button onClick={() => setOpen(false)} color="secondary" size='small'>no</Button>
                    <Button onClick={() => {(db.collection('todos').doc(props.id).delete()); (setOpen(false))}} color="primary" size='small'>yes</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Todo
