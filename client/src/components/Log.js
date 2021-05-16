import React from "react"

const Log = (props) => {
    //const project = props.data.selectedProject
    const length = props.data.issuesList.length
    console.log("in Log")
    console.log(props.data.issuesList)
    //console.log(length)


    const closedStyle = {"backgroundColor": "#00ff93"}
    const openStyle = {"backgroundColor": "orange"}

    const activeStyle = {"backgroundColor": "#002433"}
    const deactiveStyle = {"backgroundColor": ""}

    return (
        <div style={{"overflow": "auto"}}>
            <div className="my-tickets-info">
                <h2>There {length > 1 ? "are" : "is"}  {length} Ticket{length > 1 ? "s" : ""} either assigned to or created by you</h2>
                    
            </div>

            <div className="issues-list" style={length ? activeStyle : deactiveStyle}>

                <ul style={length ? activeStyle : deactiveStyle}>
                    {
                        length && (
                            <li className="row"><div><p>#</p></div><div><p>Id</p></div><div><p>Title</p></div><div><p>Last Update</p></div><div><p>Status</p></div><button>More...</button></li>
                        )
                    }
                    
                    {
                        length  ? (
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
                            
                            !length && <li><h2>No Ticket found for this user...</h2></li>
                            
                        )

                    }
                </ul>
            </div>
        </div>


    )
}

export default Log