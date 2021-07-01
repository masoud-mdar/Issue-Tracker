import React from "react"

const LoginPage = (props) => {

    return (
        <div className="login-page">

            <div className="login-wrapper">
                <div className="default-part">
                    <button name="demo-login" onClick={props.data.handleClick}>Log in as demo user</button>
                    <button name="administrator-login" onClick={props.data.handleClick}>Log in as Administrator</button>
                </div>
                <div className="submit-part">
                    <div className="login-part">
                        <input name="login-username" onChange={props.data.handleChange} value={props.data.loginUserInput} placeholder="Enter your username"></input>
                        <input name="login-password" onChange={props.data.handleChange} value={props.data.loginPassInput} placeholder="Enter your password"></input>
                        <button name="login" onClick={props.data.handleClick}>login</button>
                    </div>
                    <div className="register-part">
                        <input name="register-username" onChange={props.data.handleChange} value={props.data.regUserInput} placeholder="Enter a username"></input>
                        <input name="register-password" onChange={props.data.handleChange} value={props.data.regPassInput} placeholder="Enter a password"></input>
                        <button name="register" onClick={props.data.handleClick}>Sign Up</button>
                    </div>
                </div>

            </div>



        </div>
    )
}


export default LoginPage