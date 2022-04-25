import {FilterValuesType, TodoListsType} from "../App";

export const todoListsReducer = (state: Array<TodoListsType>, action: ActionType): Array<TodoListsType> => {
    switch (action.type) {
        case "DELETE-TODOLIST": {
            return state.filter(el => el.id !== action.payload.todoListsId)
        }
        case "ADD-TODOLIST":{
            const newTodoList: TodoListsType = {id: action.payload.newId, title: action.payload.value, filter: 'all'}
            return ([...state, newTodoList])
        }
        case "CHANGE-FILTER":{
            return state.map(el => el.id === action.payload.todoListsId ? {...el, filter: action.payload.value} : el)
        }
        case "CHANGE-NAME-TODOLIST":{
             return state.map(el => el.id === action.payload.todoListsId ? {...el, title: action.payload.value} : ({...el}))

        }
        default:
            throw new Error("error...")
    }
}


//Action creators
type ActionType = DeleteTodoListActionType | AddTodoListAction | ChangeFilterAction | ChangeNameTodoListAction

type DeleteTodoListActionType = ReturnType<typeof DeleteTodoListAC>
export const DeleteTodoListAC = (todoListsId: string) => {
    return {
        type: "DELETE-TODOLIST",
        payload: {
            todoListsId
        }
    } as const
}

type AddTodoListAction = ReturnType<typeof AddTodoListAC>
export const AddTodoListAC = (value: string,newId:string) => {
    return {
        type: "ADD-TODOLIST",
        payload: {
            value,
            newId
        }
    } as const
}

type ChangeFilterAction = ReturnType<typeof ChangeFilterAC>
export const ChangeFilterAC = (todoListsId: string, value: FilterValuesType)=>{
    return {
        type:"CHANGE-FILTER",
        payload:{
            todoListsId,
            value
        }
    }as const
}

type ChangeNameTodoListAction = ReturnType<typeof ChangeNameTodoListAC>
export const ChangeNameTodoListAC = (todoListsId: string, value: string)=>{
    return{
        type:"CHANGE-NAME-TODOLIST",
        payload:{
          todoListsId,
          value
        }
    }as const
}