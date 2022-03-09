import React, {useState} from "react";
import "./App.css";
import {TodoList, TaskPropsType} from "./TodoList";
import {v1} from "uuid";


export type FilterValuesType = "all" | "active" | "completed"

function App() {
    let [tasks, setTasks] = useState<Array<TaskPropsType>>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "ReactJS", isDone: false}
    ])
    let [filter, setFilter] = useState<FilterValuesType>("all")

    const removeTask = (id: string) => {
        let filteredTasks = tasks.filter(t => t.id !== id)
        setTasks(filteredTasks)
    }

    const addTask = (title:string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
        }


    function changeFilter(value: FilterValuesType) {
        setFilter(value)
    }

    let tasksForTodoList = tasks

    if (filter === "completed") {
        tasksForTodoList = tasks.filter(t => t.isDone);
    }
    if (filter === "active") {
        tasksForTodoList = tasks.filter(t => !t.isDone);
    }

    return (
        <div className="App">
            <TodoList title={'Список'} task={tasksForTodoList} removeTask={removeTask}
                      changeFilter={changeFilter} addTasks={addTask} />
        </div>
    );
}

export default App;
