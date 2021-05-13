import React from "react"

const AddIssue = (props) => {

    return (
        <div className="add-issue">
            <button name="close" className="close" onClick={props.data.handleClick}>X</button>
            <input name="add-issue-title" onChange={props.data.handleChange} value={props.data.newIssueTitleInput} placeholder="*Title"></input>
            <input name="add-issue-text" onChange={props.data.handleChange} value={props.data.newIssueTextInput} placeholder="*Text"></input>
            <input name="add-issue-created" onChange={props.data.handleChange} value={props.data.newIssueCreatedInput} placeholder="*Created by"></input>
            <input name="add-issue-assigned" onChange={props.data.handleChange} value={props.data.newIssueAssignedInput} placeholder="Assigned to"></input>
            <input name="add-issue-status-text" onChange={props.data.handleChange} value={props.data.newIssueStatusInput} placeholder="Status Text"></input>
            <button name="submit-issue" className="submit-issue" onClick={props.data.handleClick}>Submit Ticket</button>
        </div>
    )
}

export default AddIssue