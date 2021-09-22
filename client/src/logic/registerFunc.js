const registerFunc = (params) => {
    const sendingData = {
        username: params.regUserInput,
        password: params.regPassInput
    }

    params.axios.post(`${params.BASE_URL}/register`, sendingData, {withCredentials: true}).then(response => {
        const {data} = response

        params.setIsLoggedIn(true)
        params.setDemoUser(data.user)
        params.setLoginUserInput("")
        params.setLoginPassInput("")
        params.setRegUserInput("")
        params.setRegPassInput("")

    })
}

export default registerFunc