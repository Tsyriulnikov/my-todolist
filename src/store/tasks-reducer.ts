import {TasksObjectType, TodoListsType} from "../App";

export const tasksReducer = (state: TasksObjectType, action: TasksActionType):TasksObjectType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return state
        }
        case "ADD-TASK":{
            return state
        }
        case "CHANGE-STATUS-TASK":{
            return state
        }
        case "EDIT-TASK": {
            return state
        }

        default:
            throw new Error("error...")
    }
}


type TasksActionType = RemoveTasksActionType | AddTasksActionType
    | ChangeStatusTasksActionType | EditTasksActionType | AddEmptyTasksActionType | DeleteTodoListTasksActionType

// Action creators
type RemoveTasksActionType = ReturnType<typeof RemoveTasksAC>
export const RemoveTasksAC = (todoListsId: string, id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            todoListsId,
            id
        }
    } as const
}
type AddTasksActionType = ReturnType<typeof AddTasksAC>
export const AddTasksAC =(todoListsId: string, title: string)=>{
    return{
        type:"ADD-TASK",
        payload :{
            todoListsId,
            title
        }
    } as const
}

type ChangeStatusTasksActionType = ReturnType<typeof ChangeStatusTasksAC>
export const ChangeStatusTasksAC=(todoListsId: string, taskId: string, isDone: boolean)=>{
    return {
        type:"CHANGE-STATUS-TASK",
        payload:{
            todoListsId,
            taskId,
            isDone
        }
    }as const
}

type EditTasksActionType = ReturnType<typeof EditTasksAC>
export const EditTasksAC = (todoListsId: string, idTask: string, value: string)=>{
    return{
        type:"EDIT-TASK",
        payload:{
            todoListsId,
            idTask,
            value
        }
    }as const
}

type AddEmptyTasksActionType = ReturnType<typeof AddEmptyTasksAC>
export const AddEmptyTasksAC = (newTodolistId: string) => {
    return {
        type: "ADD-EMPTY-TASK",
        payload: {newTodolistId}
    } as const
}

type DeleteTodoListTasksActionType = ReturnType<typeof DeleteTodoListTasksAC>
export const DeleteTodoListTasksAC = (todoListId: string) => {
    return {
        type: "DELETE-TODOLIST-TASK-TASK",
        payload: {todoListId}
    } as const
}