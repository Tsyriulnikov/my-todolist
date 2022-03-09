import React, {useState} from 'react';
import {FilterValuesType} from "./App";

type TodoListPropsType = {
    title: string
    task: Array<TaskPropsType>
    removeTask: (id: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTasks:(title:string) => void
}
export type TaskPropsType = {
    id: string
    title: string
    isDone: boolean
}


export const TodoList = (props: TodoListPropsType) => {
   const [newTaskTitle,setNewTaskTitle] = useState("");



    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTaskTitle}
                       onChange={(e)=>{setNewTaskTitle(e.currentTarget.value)}}
                       onKeyPress={(e)=>{ if (e.charCode===13){
                           props.addTasks(newTaskTitle);
                           setNewTaskTitle("")
                }}}
                />
                <button onClick={()=>{
                    props.addTasks(newTaskTitle)
                    setNewTaskTitle("")
                }}>Add task</button>
            </div>
            <ul>
                {props.task.map((el: TaskPropsType) => {

                        return (
                            <li><input type="checkbox" checked={el.isDone}/> <span>{el.title}</span>
                                <button onClick={() => {
                                    props.removeTask(el.id)
                                }}> Delete task
                                </button>
                            </li>
                        )
                    }
                )
                }

            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter("all")
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter("active")
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter("completed")
                }}>Completed
                </button>
            </div>
        </div>
    );
}