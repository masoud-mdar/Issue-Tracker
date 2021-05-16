const myTicketsFunc = (axios, BASE_URL, setIssuesList, id) => {
    let tempArr = []
    axios.get(`${BASE_URL}/api/issues/mytickets?assigned_to=${id}`).then(response => {
        const assignedData = response.data
        assignedData.forEach(item => {
            tempArr.push(item)
        })
        
        axios.get(`${BASE_URL}/api/issues/mytickets?created_by=${id}`).then(response => {
            const {data} = response
            data.forEach(item => {
                tempArr.push(item)
            })
            setIssuesList(tempArr)
        })
        
    })
}

export default myTicketsFunc
