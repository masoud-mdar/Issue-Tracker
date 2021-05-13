import React from "react"

const AddIssBtn = (props) => {
    return (
        <div className="add-issue-btn">
            <button name="add-issue-button" className="add-btn" onClick={props.data.handleClick}>Add a Ticket for "{props.data.selectedProject}"</button>
            
        </div>
    )
}

export default AddIssBtn