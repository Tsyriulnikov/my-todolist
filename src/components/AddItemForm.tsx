import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {Button, IconButton, TextField} from "@mui/material";
import {AddToPhotos, ControlPoint, ElectricScooter} from "@mui/icons-material";
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
            <TextField value={newTaskTitle}
                       variant="outlined"
                   onChange={onChangeNewTaskTitle}
                   onKeyPress={onKeyPressNewTaskTitle}
                   // className={error ? "error" : ""}
                       label="Type value"
                       helperText={error}
                       error={!!error}
            />
             <IconButton onClick={onClickAddTask}
             color={"primary"}
            >
                 <AddToPhotos/>
             </IconButton>
            {/*{error && <div className="error-message">{error}</div>}*/}
        </div>
    )
}
export default AddItemForm