const moreDetailsFunc = (params, id) => {

    params.setIsLoading(true)
    params.setMoreDetails(true)

    let selected = params.issuesList.filter(item => {
        return item._id === id
    })

    params.setSelectedIssue(selected[0])
    params.inputRemover(false, true, true, false)
}

export default moreDetailsFunc