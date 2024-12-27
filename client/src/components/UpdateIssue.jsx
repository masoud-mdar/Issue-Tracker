import React from "react"

const UpdateIssue = (props) => {

    const arrow = "<<<<<"

    return (
        <div className="update-issue">
            <div>
                <button name="back-details" className="back" onClick={props.data.handleClick}>{arrow}</button>
                <button name="close" className="close" onClick={props.data.handleClick}>X</button>
            </div>


            <input name="add-issue-title" onChange={props.data.handleChange} value={props.data.newIssueTitleInput} placeholder="*Title"></input>
            <input name="add-issue-text" onChange={props.data.handleChange} value={props.data.newIssueTextInput} placeholder="*Text"></input>
            <input name="add-issue-created" onChange={props.data.handleChange} value={props.data.newIssueCreatedInput} placeholder="*Created by"></input>
            <input name="add-issue-assigned" onChange={props.data.handleChange} value={props.data.newIssueAssignedInput} placeholder="Assigned to"></input>
            <input name="add-issue-status-text" onChange={props.data.handleChange} value={props.data.newIssueStatusInput} placeholder="Status Text"></input>
            
            <div className="radio-wrapper">

                <input type="radio" name="open-close" id="option-1" value="open"  checked={props.data.openOrClose === "open" ? true : false} onChange={props.data.handleChange} ></input>
                <input type="radio" name="open-close" id="option-2" value="close" checked={props.data.openOrClose === "close" ? true : false} onChange={props.data.handleChange} ></input>
                
                <label htmlFor="option-1" className="option option-1">
                    <div className="dot"></div>
                    <span>open</span>
                </label>

                <label htmlFor="option-2" className="option option-2">
                    <div className="dot"></div>
                    <span>close</span>
                </label>
            </div>

            <button name="update" className="update" onClick={props.data.handleClick}>Update</button>
            <button name= "delete" className="delete" onClick={props.data.handleClick}>Delete</button>
                                
        </div>
    )
}

export default UpdateIssue