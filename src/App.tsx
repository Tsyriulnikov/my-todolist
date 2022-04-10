import React, {useState} from "react";
import "./App.css";
import {TodoList, TaskPropsType} from "./TodoList";
import {v1} from "uuid";
import AddItemForm from "./components/AddItemForm";


export type FilterValuesType = "all" | "active" | "completed"
type  TodoListsType = {
    id: string
    title: string
    filter: FilterValuesType
}
export type TasksObjectType = {
    [key: string]: Array<TaskPropsType>
}

function App() {

    const todoListId1 = v1()
    const todoListId2 = v1()


    let [todoLists, setTodoLists] = useState<Array<TodoListsType>>([
        {id: todoListId1, title: "What lern", filter: 'all'},
        {id: todoListId2, title: "What buy", filter: 'all'}
    ])

    let [tasks, setTasks] = useState<TasksObjectType>({
        [todoListId1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "ReactJS", isDone: false}],
        [todoListId2]: [
            {id: v1(), title: "Milk", isDone: false},
            {id: v1(), title: "Water", isDone: true},
            {id: v1(), title: "Kolbasa", isDone: true},
            {id: v1(), title: "Vodka", isDone: false}]
    })


    const removeTask = (todoListsId: string, id: string) => {
        setTasks({...tasks, [todoListsId]: tasks[todoListsId].filter(el => el.id !== id)})
    }

    const addTask = (todoListsId: string, title: string) => {
        let newTask = {id: v1(), title: title, isDone: false}
        // let newTasks = [newTask, ...tasks]
        setTasks({...tasks, [todoListsId]: [newTask, ...tasks[todoListsId]]})
    }

    const changeStatus = (todoListsId: string, taskId: string, isDone: boolean) => {
        setTasks({
            ...tasks,
            [todoListsId]: tasks[todoListsId].map(el => el.id === taskId ? {...el, isDone: isDone} : el)
        })
    }

    function changeFilter(todoListsId: string, value: FilterValuesType) {
        setTodoLists(todoLists.map(el => el.id === todoListsId ? {...el, filter: value} : el))
    }


    const deleteTodoList = (todoListsId: string) => {
        setTodoLists(todoLists.filter(el => el.id !== todoListsId))
        let newTasks = {...tasks}
        delete newTasks[todoListsId]
        setTasks(newTasks)
    }

    const addTodoList = (value: string) => {
        const newId: string = v1()
        const newTodoList: TodoListsType = {id: newId, title: value, filter: 'all'}
        setTodoLists([...todoLists, newTodoList])
        setTasks({...tasks, [newId]: []})
    }
    const editTask = (todoListsId: string, idTask: string, value: string) => {
        setTasks({
            ...tasks, [todoListsId]: tasks[todoListsId].map(el => el.id === idTask ?
                {...el, title: value} : ({...el}))
        })
    }

    const changeNameTodoList = (todoListsId: string,value: string) =>{
setTodoLists(todoLists.map(el=> el.id ===todoListsId ? {...el, title:value}:({...el})))
    }
    return (
        <div className="App">
            <AddItemForm callBack={addTodoList}/>
            {todoLists.map(tl => {

                    let tasksForTodoList = tasks[tl.id]

                    if (tl.filter === "completed") {
                        tasksForTodoList = tasks[tl.id].filter(t => t.isDone);
                    }
                    if (tl.filter === "active") {
                        tasksForTodoList = tasks[tl.id].filter(t => !t.isDone);
                    }

                    return (
                        <TodoList
                            key={tl.id}
                            todoListsId={tl.id}
                            title={tl.title}
                            task={tasksForTodoList}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTasks={addTask}
                            changeTaskStatus={changeStatus}
                            filter={tl.filter}
                            callBackDeleteTodoList={deleteTodoList}
                            editeTask={editTask}
                            callBackChangeNameTodoList={changeNameTodoList}

                        />)

                }
            )}
        </div>
    );
}

export default App;
