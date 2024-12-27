import React from "react"
import {CopyToClipboard} from 'react-copy-to-clipboard'

const MoreDetails = (props) => {

    const {copied} = props.data
    const style = {"animation": "copied 1.5s ease-out", "color": "#00ff93"}


    return (
        <div className="more-details">

            <div className="content">
                {props.data.selectedIssue._id && 
                    <div className="div">
                        <p>id: {props.data.selectedIssue._id}</p>
                        <CopyToClipboard  name="copy" text={props.data.selectedIssue._id} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue._id === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                }
                {props.data.selectedIssue.issue_title && 
                    <div className="div">
                        <p>title: {props.data.selectedIssue.issue_title}</p>
                        <CopyToClipboard name="copy" text={props.data.selectedIssue.issue_title} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue.issue_title === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                }
                {props.data.selectedIssue.project && 
                    <div className="div">
                        <p>project: {props.data.selectedIssue.project}</p>
                        <CopyToClipboard name="copy" text={props.data.selectedIssue.project} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue.project === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                } 
                {props.data.selectedIssue.issue_text && 
                    <div className="div">
                        <p>text: {props.data.selectedIssue.issue_text}</p>
                        <CopyToClipboard name="copy" text={props.data.selectedIssue.issue_text} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue.issue_text === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                } 
                {props.data.selectedIssue.created_by && 
                    <div className="div">
                        <p>created by: {props.data.selectedIssue.created_by}</p>
                        <CopyToClipboard name="copy" text={props.data.selectedIssue.created_by} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue.created_by === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                } 
                {props.data.selectedIssue.created_on && 
                    <div className="div">
                        <p>created on: {props.data.selectedIssue.created_on}</p>
                        <CopyToClipboard name="copy" text={props.data.selectedIssue.created_on} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue.created_on === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                } 
                {props.data.selectedIssue.assigned_to && 
                    <div className="div">
                        <p>assigned to: {props.data.selectedIssue.assigned_to}</p>
                        <CopyToClipboard name="copy" text={props.data.selectedIssue.assigned_to} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue.assigned_to === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                } 
                {props.data.selectedIssue.updated_on && 
                    <div className="div">
                        <p>updated_on: {props.data.selectedIssue.updated_on}</p>
                        <CopyToClipboard name="copy" text={props.data.selectedIssue.updated_on} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue.updated_on === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                } 
                {props.data.selectedIssue.status_text && 
                    <div className="div">
                        <p>status text: {props.data.selectedIssue.status_text}</p>
                        <CopyToClipboard id="9" name="copy" text={props.data.selectedIssue.status_text} onCopy={props.data.handleCopy}>
                            <span style={props.data.selectedIssue.status_text === copied ? style : {}}>copy</span>
                        </CopyToClipboard>
                    </div>
                } 
                {props.data.selectedIssue.issue_title !== "First commit" && 
                    <div className="div">
                        <p>open: {props.data.selectedIssue.open ? "open" : "closed"}</p>
                    </div>
                }
            </div>
            
            <div className="details-btn-wrapper">
                {
                    !props.data.isLog ? (
                        <button name="issue-update-del" className="issue-update-del" id={props.data.selectedIssue._id} onClick={props.data.handleClick}>Update or Delete Ticket</button>
                    ) : (
                        <div></div>
                    )
                }
                
                <button name="close" className="close" onClick={props.data.handleClick}>X</button>
            </div>
            
        </div>
    )
}

export default MoreDetails