import React from "react"

const List = (props) => {

    const project = props.data.selectedProject
    const length = props.data.issuesList.length
    const closedStyle = {"backgroundColor": "#00ff93"}
    const openStyle = {"backgroundColor": "orange"}
    const activeStyle = {"backgroundColor": "#002433"}
    const deactiveStyle = {"backgroundColor": ""}

    return (
        <div className="issues-list" style={project && length ? activeStyle : deactiveStyle}>
            <ul style={project && length ? activeStyle : deactiveStyle}>
                {
                    project && length && (
                        <li className="row"><div><p>#</p></div><div><p>Id</p></div><div><p>Title</p></div><div><p>Last Update</p></div><div><p>Status</p></div><button>More...</button></li>
                    )
                }
                
                {
                    project && length  ? (
                        props.data.issuesList.map((issue, n) => {
                            return (
                                <li key={Math.random() * Math.random()} style={issue.open ? openStyle : closedStyle}>
                                    <div><p>{n+1}</p></div>
                                    <div><p>{issue._id}</p></div>
                                    <div><p>{issue.issue_title}</p></div>
                                    <div>{issue.updated_on ? <p>{issue.updated_on} </p> : <p>---</p>}</div>
                                    <div><p style={{"color": issue.open ? "crimson" : "#002433" }}>  {issue.open ? "open" : issue.issue_title === "First commit" ? "---" : "close"}</p></div>
                                    <button name="details" id={issue._id} onClick={props.data.handleClick}>More details</button>
                                </li>
                            )
                        })
                    ) : (
                        project && !length && <li><h2>No Ticket found for this project...</h2></li>
                    )

                }
            </ul>
        </div>
    )
}

export default List