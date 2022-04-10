import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType, TasksObjectType} from "./App";
import AddItemForm from "./components/AddItemForm";
import EditableSpan from "./components/EditableSpan";

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
                <button onClick={deleteTodoListHandler}>X</button>
            </h3>
            <AddItemForm callBack={AddItemFormCallBackHandler}/>
            <ul>
                {props.task.map((el: TaskPropsType) => {
                        const onClickRemoveTask = () => props.removeTask(props.todoListsId, el.id);
                        const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                            props.changeTaskStatus(props.todoListsId, el.id, e.currentTarget.checked)
                        }
                        return (
                            <li key={el.id} className={el.isDone ? "is-done" : ""}><input type="checkbox"
                                                                                          onChange={onChangeHandler}
                                                                                          checked={el.isDone}/>
                                {/*<span>{el.title}</span>*/}
                                <EditableSpan title={el.title} callBack={(value)=>
                                    callBackEditableSpanHandler(value,el.id)}/>
                                <button onClick={onClickRemoveTask
                                }> Delete task
                                </button>
                            </li>
                        )
                    }
                )
                }

            </ul>

            <div>
                <button className={props.filter === "all" ? "active-filter" : ""} onClick={() => changeFilter("all")
                }>All
                </button>
                <button className={props.filter === "active" ? "active-filter" : ""}
                        onClick={() => changeFilter("active")
                        }>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter" : ""}
                        onClick={() => changeFilter("completed")
                        }>Completed
                </button>
            </div>
        </div>
    );
}