const loginFunc = (params) => {

    const sendingData = {
        username: params.loginUserInput,
        password: params.loginPassInput
    }
    params.axios.post(`${params.BASE_URL}/login`, sendingData, {withCredentials: true}).then(response => {
        const {data} = response

        if (data.hasOwnProperty("success")) {
            params.setIsLoggedIn(true)
            params.setDemoUser(data.user)
            params.setLoginUserInput("")
            params.setLoginPassInput("")
            params.setRegUserInput("")
            params.setRegPassInput("")
        } else if (data.hasOwnProperty("error")) {
            // show the error msg
        }

    })
}

export default loginFunc