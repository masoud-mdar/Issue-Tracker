const moreDetailsFunc = (id, setIsLoading, setMoreDetails, issuesList, setSelectedIssue, inputRemover) => {

    setIsLoading(true)
    setMoreDetails(true)

    let selected = issuesList.filter(item => {
        return item._id === id
    })

    setSelectedIssue(selected[0])
    inputRemover(false, true, true, false)
}

export default moreDetailsFunc