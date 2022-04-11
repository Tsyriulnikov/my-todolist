import React, {ChangeEvent, useState} from "react";
import {TextField} from "@mui/material";

type EditableSpanPropsType = {
    title: string
    callBack: (value: string) => void
}
const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
    const [editMode, setEditMode] = useState<boolean>(false)
    const [value, setValue] = useState(props.title)
    const doubleClickSpanHandler = () => {
        setEditMode(true)
    }
    const onBlurInputHandler = () => {
        setEditMode(false)
        props.callBack(value)
    }
    const onchangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.currentTarget.value)
    }
    return (
        <>{editMode
            ? <TextField
                variant="outlined"
                label="Type value"
                value={value}
                autoFocus
                onBlur={onBlurInputHandler}
                onChange={onchangeInputHandler}

            />
            : <span onDoubleClick={doubleClickSpanHandler}>{props.title}</span>

        }
        </>
    )
}
export default EditableSpan
