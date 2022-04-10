import React, {ChangeEvent, KeyboardEvent, useState} from "react";
type AddItemFormPropsType = {
    callBack:(value:string)=>void
}

const AddItemForm:React.FC<AddItemFormPropsType>=(props)=>{
    const [newTaskTitle, setNewTaskTitle] = useState<string>("");
    const [error, setError] = useState<string | null>(null);

    const onChangeNewTaskTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    };
    const onKeyPressNewTaskTitle = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.charCode === 13) {
            props.callBack( newTaskTitle.trim());
            setNewTaskTitle("");
        }
    }

    const onClickAddTask = () => {
        if (newTaskTitle.trim() !== "") {
            props.callBack(newTaskTitle)
            setNewTaskTitle("")
        } else {
            setError("Name is required");
        }
    }

    return(
        <div>
            <input value={newTaskTitle}
                   onChange={onChangeNewTaskTitle}
                   onKeyPress={onKeyPressNewTaskTitle}
                   className={error ? "error" : ""}
            />
            <button onClick={onClickAddTask}>Add task</button>
            {error && <div className="error-message">{error}</div>}
        </div>
    )
}
export default AddItemForm