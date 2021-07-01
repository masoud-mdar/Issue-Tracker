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
                        
                        <div className="input-fields">
                            <input name="login-username" onChange={props.data.handleChange} value={props.data.loginUserInput} placeholder="Username"></input>
                            <input name="login-password" onChange={props.data.handleChange} value={props.data.loginPassInput} placeholder="Password"></input>
                        </div>

                        <div className="button-part">
                            <button name="login" className="login-btn" onClick={props.data.handleClick}>login</button>
                            <div>
                                <p>Don't have an account yet? <button name="regMode-btn" onClick={props.data.handleClick}>Click here</button></p>
                            </div>
                        </div>

                    </div>
                    <div className="register-part" style={{display: props.data.isRegMode ? "block" : "none"}} >
                        
                        <div className="input-fields">
                            <input name="register-username" onChange={props.data.handleChange} value={props.data.regUserInput} placeholder="Enter a username"></input>
                            <input name="register-password" onChange={props.data.handleChange} value={props.data.regPassInput} placeholder="Enter a password"></input>
                        </div>

                        <div className="button-part">
                            <button name="register" className="login-btn" onClick={props.data.handleClick}>Sign Up</button>
                            <button name="back-login" onClick={props.data.handleClick}>Back to login</button>                          
                        </div>

                    </div>
                </div>

            </div>



        </div>
    )
}


export default LoginPage