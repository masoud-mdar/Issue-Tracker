import React from "react"

const AddProject = (props) => {

    return (
        <div className="add-project">
            <button name="close" onClick={props.data.handleClick} className="close">X</button>
            <input name="new-project-input" onChange={props.data.handleChange} value={props.data.newProjectInput} placeholder="enter the project's name..."></input>
            <button name="submit-new-project" onClick={props.data.handleClick} className="add-btn">Add</button>
            
        </div>
    )
}

export default AddProject