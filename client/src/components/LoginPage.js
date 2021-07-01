import React from "react"

const LoginPage = (props) => {

    return (
        <div className="login-page">

            <div className="login-wrapper">
                <div className="default-part">

                    <div className="demo-login">
                        <button name="demo-login" onClick={props.data.handleClick}></button>
                        <div className="hover-div">Login as demo user</div>
                    </div>
                    <div className="administrator-login">
                        <button name="administrator-login" onClick={props.data.handleClick}></button>
                        <div className="hover-div">Login as administrator</div>
                    </div>
                    
                    
                </div>
                <div className="submit-part">
                    <div className="login-part" style={{display: !props.data.isRegMode ? "block" : "none"}}>
                        <input name="login-username" onChange={props.data.handleChange} value={props.data.loginUserInput} placeholder="Enter your username"></input>
                        <input name="login-password" onChange={props.data.handleChange} value={props.data.loginPassInput} placeholder="Enter your password"></input>
                        <button name="login" onClick={props.data.handleClick}>login</button>
                        <div>
                            <p>Don't have an account yet? <button>Click here</button></p>
                        </div>
                    </div>
                    <div className="register-part" style={{display: props.data.isRegMode ? "block" : "none"}} >
                        <input name="register-username" onChange={props.data.handleChange} value={props.data.regUserInput} placeholder="Enter a username"></input>
                        <input name="register-password" onChange={props.data.handleChange} value={props.data.regPassInput} placeholder="Enter a password"></input>
                        <button name="register" onClick={props.data.handleClick}>Sign Up</button>
                        <button>Back to login</button>
                    </div>
                </div>

            </div>



        </div>
    )
}


export default LoginPage