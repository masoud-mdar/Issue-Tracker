const logOutFunc = (params) => {

    params.axios.get(`${params.BASE_URL}/logout`).then(response => {
        const {data} = response

        console.log(data)
        //TODO show a msg maybe
        
        params.setIsLoggedIn(false)
        params.setDemoUser("")
        params.setLoginUserInput("")
        params.setLoginPassInput("")
        params.setRegUserInput("")
        params.setRegPassInput("")
        params.setIsRegMode(false)

    })
}

export default logOutFunc