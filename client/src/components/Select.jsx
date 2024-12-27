import React from "react"

const Select = (props) => {

    return (
        <div className="select-project">
            <div className="button-part">
            <button name="add-project" onClick={props.data.handleClick} className="add-p-btn">Add a new project</button>
            </div>
            
            <div className="list-part">
                <ul className="u-list">
                    {
                        props.data.projects.map((project) => {
                            return (
                                <li key={Math.random() * Math.random()}><button name="select-project-btn" className="select-p-btn" onClick={props.data.handleClick}>{project}</button></li>
                            )
                        })
                    }
                </ul>
            </div>
        </div>
    )

}

export default Select