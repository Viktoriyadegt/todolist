import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

export type EdiTableSpanType = {
    callback:(title:string)=>void

}
const AppItemForm = (props:EdiTableSpanType) => {
    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const OnChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError('')
        if (e.key === 'Enter') {
            if (title.trim() !== '') {
                props.callback( title.trim())
                setTitle('')
            } else {
                setError('Title is required!')
            }
        }
    }
    const addTaskNewTaskTitle = () => {
        if (title.trim() !== '') {
            props.callback( title.trim())
            setTitle('')
        } else {
            setError('Title is required!')
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={OnChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <button onClick={addTaskNewTaskTitle}>+</button>
            {error && <div className={'error-message'}>Title is required!</div>}
        </div>
    );
};

export default AppItemForm;