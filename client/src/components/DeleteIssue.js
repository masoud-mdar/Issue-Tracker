import React from "react"

const DeleteIssue = (props) => {

    return (
        <div className="delete-issue">
            <div className="question">
                <h2>Are you sure you  want to delete this Ticket?</h2>
            </div>
            <div className="btn-wrapper">
                <button name="surely-delete" className="surely-delete" onClick={props.data.handleClick}>Yes</button>
                <button name="no" className="no" onClick={props.data.handleClick}>No</button>
            </div>

        </div>
    )
}

export default DeleteIssue