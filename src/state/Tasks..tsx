import React, {useCallback} from 'react';
import {Checkbox, IconButton} from "@mui/material";
import EditableSpan from "../EditableSpan";
import {Delete} from "@mui/icons-material";
import {TasksType} from "../Todolist";

export type TasksPropsType = {
    todolistId: string
    tasks: TasksType
    onChangeTaskStatus: (todolistId: string, id: string, isDone: boolean) => void
    editableTaskTitle: (todolistId: string, TID: string, title: string) => void
    removeTask: (todolistId: string, id: string) => void
}

const Tasks = React.memo((props: TasksPropsType) => {
    const onChangeStatusHandler = useCallback((id: string, isDone: boolean) => {
        props.onChangeTaskStatus(props.todolistId, id, isDone)
    },[props.onChangeTaskStatus, props.todolistId])
    const editableTaskTitleHandler = useCallback((TID: string, title: string) => {
        props.editableTaskTitle(props.todolistId, TID, title)
    },[props.editableTaskTitle, props.todolistId])

    const onClickRemoveTaskHandler = useCallback((id: string) => {
        props.removeTask(props.todolistId, id)
    },[props.removeTask, props.todolistId])

    return (
        <div>
            <li key={props.tasks.id} className={props.tasks.isDone === true ? 'is-done' : ''}>

                <Checkbox checked={props.tasks.isDone}
                          onChange={(e) => onChangeStatusHandler(props.tasks.id, e.currentTarget.checked)}/>
                <EditableSpan title={props.tasks.title} callback={(title) => editableTaskTitleHandler(props.tasks.id, title)}/>
                <IconButton aria-label="delete" onClick={() => onClickRemoveTaskHandler(props.tasks.id)}>
                    <Delete/>
                </IconButton>

            </li>
        </div>
    );
});

export default Tasks;