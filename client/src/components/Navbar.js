import React from "react"

const Navbar = (props) => {

    const {searchInput, isSearchActive} = props.data
    const activeMode = {"display": "block"}

    return (
        <div className="nav-bar">
            <div className="left-part">

                <div className="nav-title">
                    <h2>Issue Tracker</h2>
                </div>
                <div className="nav-buttons">
                    <button name="my-tickets" id={props.data.user} onClick={props.data.handleClick}>{props.data.isLog ? "All Projects" : "My Tickets"}</button>
                    <button name="username" onClick={props.data.handleClick}>{props.data.user}</button>
                </div>

            </div>

            <div className="search-part">

                <input name="search" onChange={props.data.handleChange} onClick={props.data.handleClick} value={searchInput} placeholder="search a project..." autoComplete="false"></input>
                <button name="go" onClick={props.data.handleClick} style={searchInput || isSearchActive ? activeMode : {}}>Go</button>
                <button name="advanced-search" onClick={props.data.handleClick} style={searchInput || isSearchActive ? activeMode : {}}>Advanced Search</button>
            
            </div>
        </div>
    )
}

export default Navbar