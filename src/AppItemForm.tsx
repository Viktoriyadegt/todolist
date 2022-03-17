import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from "@mui/material";

export type EdiTableSpanType = {
    callback: (title: string) => void

}
const AppItemForm = (props: EdiTableSpanType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            if (title.trim() !== '') {
                props.callback(title.trim())
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }
    const addTaskNewTaskTitle = () => {
        if (title.trim() !== '') {
            props.callback(title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    return (
        <div>

            <TextField
                error={!!error}
                id="outlined-basic"
                label={title}
                variant="outlined"
                value={title}
                onChange={OnChangeHandler}
                onKeyPress={onKeyPressHandler}
                helperText={error}
                size={'small'}
            />
            {/*    <button onClick={addTaskNewTaskTitle}>+</button>*/}
            <Button variant="contained" onClick={addTaskNewTaskTitle}
                    style={{maxWidth: '40px', maxHeight: '40px', minWidth: '40px', minHeight: '40px'}}>+</Button>
        </div>
    );
};

export default AppItemForm;