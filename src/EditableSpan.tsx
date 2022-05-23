import React, {ChangeEvent, useState} from 'react';
import {TextField} from "@mui/material";



export type EditableSpanType = {
    title: string
    callback:(title:string)=>void
}
const EditableSpan = React.memo((props: EditableSpanType) => {
    console.log('EditableSpan')

    const [editMode, setEditMode] = useState(false)
    const [title, setTitle] = useState(props.title)
    const onDoubleClickHandler = () => {
        setEditMode(true)
        setTitle(props.title)

    }
    const onBlurHandler = () => {
        setEditMode(false)
        props.callback(title)

    }
    const onChangeHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    return (
        editMode
             ? <TextField
                id="outlined-basic"
                variant="outlined"
                value={title}
                autoFocus onBlur={onBlurHandler}
                onChange={onChangeHandler}
            />
            : <span onDoubleClick={onDoubleClickHandler}>{props.title}</span>
    );
})
;

export default EditableSpan;