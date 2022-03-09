import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    task: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks: (title: string) => void
}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = (props: TodoListPropsType) => {

    const [newTaskTitle, setNewTaskTitle] = useState("");

    const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyPressNewTaskTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.charCode === 13) {
            props.addTasks(newTaskTitle);
            setNewTaskTitle("")
        }
    }
    const onClickAddTask = () => {
        props.addTasks(newTaskTitle)
        setNewTaskTitle("")
    }
    const changeFilterAll = () => {props.changeFilter("all")}
    const changeFilterActive = () => {props.changeFilter("active")}
    const changeFilterComplete = () => {props.changeFilter("completed")}


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={onChangeNewTaskTitle}
                       onKeyPress={onKeyPressNewTaskTitle}
                />
                <button onClick={onClickAddTask}>Add task</button>
            </div>
            <ul>
                {props.task.map((el: TaskPropsType) => {
                    const onClickRemoveTask = () => props.removeTask(el.id);

                    return (
                            <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
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
                <button onClick={changeFilterAll
                }>All
                </button>
                <button onClick={changeFilterActive
                }>Active
                </button>
                <button onClick={changeFilterComplete
                }>Completed
                </button>
            </div>
        </div>
    );
}