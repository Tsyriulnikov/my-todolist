import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    task: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
    changeTaskStatus:(taskId:string, isDone:boolean)=>void
    filter:FilterValuesType
}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string|null>(null);

    const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyPressNewTaskTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.addTasks(newTaskTitle.trim());
            setNewTaskTitle("");
        }
    }

    const onClickAddTask = () => {
       if(newTaskTitle.trim() !==""){
           props.addTasks(newTaskTitle)
           setNewTaskTitle("")
       }else {
           setError("Name is required");
       }
    }

    const changeFilter = (stringFilter:FilterValuesType) => {props.changeFilter(stringFilter)}


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeNewTaskTitle}
                       onKeyPress={onKeyPressNewTaskTitle}
                       className={error ? "error": ""}
                />
                <button onClick={onClickAddTask}>Add task</button>
                {error && <div className="error-message">{error}</div>}
            </div>

            <ul>
                {props.task.map((el: TaskPropsType) => {
                    const onClickRemoveTask = () => props.removeTask(el.id);
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>
                    {props.changeTaskStatus(el.id, e.currentTarget.checked)}
                    return (
                            <li key={el.id} className={el.isDone ? "is-done":""}><input type="checkbox"
                                 onChange={onChangeHandler} checked={el.isDone}/> <span>{el.title}</span>
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
                <button  className={props.filter === "all" ? "active-filter":""} onClick={()=>changeFilter("all")
                }>All
                </button>
                <button className={props.filter === "active" ? "active-filter":""} onClick={()=>changeFilter("active")
                }>Active
                </button>
                <button className={props.filter === "completed" ? "active-filter":""} onClick={()=>changeFilter("completed")
                }>Completed
                </button>
            </div>
        </div>
    );
}