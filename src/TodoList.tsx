import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksObjectType} from "./App";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";
import {Button, Checkbox, IconButton} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import {CheckBox} from "@mui/icons-material";

type TodoListPropsType = {
    title: string
    task: Array<TaskPropsType>
    removeTask: (todoListsId: string, id: string) => void
    changeFilter: (todoListsId: string, value: FilterValuesType) => void
    addTasks: (todoListsId: string, title: string) => void
    changeTaskStatus: (todoListsIs: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    todoListsId: string
    callBackDeleteTodoList: (todoListsId: string) => void
    editeTask:(todoListsId:string,idTask:string,value:string )=>void
    callBackChangeNameTodoList:(todoListsId:string,value:string)=>void
}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = (props: TodoListPropsType) => {


    const changeFilter = (stringFilter: FilterValuesType) => {
        props.changeFilter(props.todoListsId, stringFilter)
    }
    const deleteTodoListHandler = () => {
        props.callBackDeleteTodoList(props.todoListsId)
    }

    const AddItemFormCallBackHandler = (value: string) => {
        props.addTasks(props.todoListsId, value)
    }

    const callBackEditableSpanHandler = (value:string,idTitle:string) => {
     props.editeTask(props.todoListsId, idTitle, value)
    }
    const changeNameTodoListEditableSpanHandler = (value:string) => {
      props.callBackChangeNameTodoList(props.todoListsId,value)
    }
    return (
        <div>
            <h3>
            {/*{props.title}*/}
               <EditableSpan title={props.title} callBack={changeNameTodoListEditableSpanHandler}/>
                {/*<button onClick={deleteTodoListHandler}>X</button>*/}
                <IconButton aria-label={"delete"} onClick={deleteTodoListHandler} color={"info"} >
                    <DeleteIcon />
                </IconButton>
            </h3>
            <AddItemForm callBack={AddItemFormCallBackHandler}/>
            <div>
                {props.task.map((el: TaskPropsType) => {
                        const onClickRemoveTask = () => props.removeTask(props.todoListsId, el.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todoListsId, el.id, e.currentTarget.checked)
                        }
                        return (
                            <div key={el.id} className={el.isDone ? "is-done" : ""}>
                                <Checkbox onChange={onChangeHandler}  checked={el.isDone}/>
                                {/*<span>{el.title}</span>*/}
                                <EditableSpan title={el.title} callBack={(value)=>
                                    callBackEditableSpanHandler(value,el.id)}/>
                                <IconButton aria-label={"delete"} onClick={onClickRemoveTask} color={"warning"} >
                                    <DeleteIcon />
                                </IconButton>

                                {/*<button onClick={onClickRemoveTask*/}
                                {/*}> Delete task*/}
                                {/*</button>*/}
                            </div>
                        )
                    }
                )
                }

            </div>

            <div>
                <Button variant={props.filter === "all" ? "contained" : "text"}
                        onClick={() => changeFilter("all")
                }>All
                </Button>
                <Button variant={props.filter === "active" ? "contained" : "text"}
                        onClick={() => changeFilter("active")
                        }>Active
                </Button>
                <Button variant={props.filter === "completed" ? "contained" : "text"}
                        onClick={() => changeFilter("completed")
                        }>Completed
                </Button>
            </div>
        </div>
    );
}