const myTicketsFunc = (params, id) => {
    params.setIsLoading(true)
    let tempArr = []
    params.axios.get(`${params.BASE_URL}/api/issues/mytickets?assigned_to=${id}`).then(response => {
        const assignedData = response.data
        assignedData.forEach(item => {
            tempArr.push(item)
        })
        
        params.axios.get(`${params.BASE_URL}/api/issues/mytickets?created_by=${id}`).then(response => {
            const {data} = response
            data.forEach(item => {
                tempArr.push(item)
            })
            params.setIssuesList(tempArr)
            params.setIsLoading(false)
        }) 
    })
}

export default myTicketsFunc
