import {TasksObjectType, TodoListsType} from "../App";
import {v1} from "uuid";

export const tasksReducer = (state: TasksObjectType, action: TasksActionType): TasksObjectType => {
    switch (action.type) {
        case "REMOVE-TASK": {
            return {
                ...state,
                [action.payload.todoListsId]: state[action.payload.todoListsId].filter(el => el.id !== action.payload.id)
            }
        }
        case "ADD-TASK": {
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todoListsId]: [newTask, ...state[action.payload.todoListsId]]}
        }
        case "CHANGE-STATUS-TASK": {
            return {
                ...state,
                [action.payload.todoListsId]: state[action.payload.todoListsId].map(el => el.id === action.payload.taskId ?
                    {...el, isDone: action.payload.isDone} : el)
            }
        }

        case "EDIT-TASK": {
            return {
                ...state, [action.payload.todoListsId]: state[action.payload.todoListsId].map(el => el.id === action.payload.idTask ?
                    {...el, title: action.payload.value} : ({...el}))
            }
        }
        case "ADD-EMPTY-TASK": {
            return {...state, [action.payload.newTodolistId]: []}
        }
        case "DELETE-TODOLIST-TASK-TASK": {
            delete state[action.payload.todoListId];
            return {...state}

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
export const AddTasksAC = (todoListsId: string, title: string) => {
    return {
        type: "ADD-TASK",
        payload: {
            todoListsId,
            title
        }
    } as const
}

type ChangeStatusTasksActionType = ReturnType<typeof ChangeStatusTasksAC>
export const ChangeStatusTasksAC = (todoListsId: string, taskId: string, isDone: boolean) => {
    return {
        type: "CHANGE-STATUS-TASK",
        payload: {
            todoListsId,
            taskId,
            isDone
        }
    } as const
}

type EditTasksActionType = ReturnType<typeof EditTasksAC>
export const EditTasksAC = (todoListsId: string, idTask: string, value: string) => {
    return {
        type: "EDIT-TASK",
        payload: {
            todoListsId,
            idTask,
            value
        }
    } as const
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