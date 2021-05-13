const advancedSearchFunc = (setIsLoading, setSearchInput, projectInput, newIssueTitleInput, newIssueTextInput, newIssueCreatedInput, newIssueAssignedInput, newIssueStatusInput, openOrClose, BASE_URL, idInput, axios, swal, setSelectedProject, setIssuesList, setAdvancedSearch, setIdInput, setProjectInput, setOpenOrClose, inputRemover, setIsLog) => {

    setIsLoading(true)
    setSearchInput("")
    setIsLog(false)

    const searchedProject = projectInput || "empty"
    const title = newIssueTitleInput || ""
    const text = newIssueTextInput || ""
    const created = newIssueCreatedInput || ""
    const assigned = newIssueAssignedInput || ""
    const status = newIssueStatusInput || ""
    const open = openOrClose === "open" ? "true" : "false"

    let URL = `${BASE_URL}/api/issues/${searchedProject}?open=${open}`

    if (idInput) {
        URL += `&_id=${idInput}`
    } else if (title) {
        URL += `&issue_title=${title}`
    } else if (text) {
        URL += `&issue_text=${text}`
    } else if (created) {
        URL += `&created_by=${created}`
    } else if (assigned) {
        URL += `&assigned_to=${assigned}`
    } else if (status) {
        URL += `&status_text=${status}`
    }

    axios.get(URL).then(response => {

        const {data} = response

        if (data.hasOwnProperty("error")) {
            swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })

        } else {
            if (data.length) {
                setSelectedProject(projectInput)
                setIssuesList(data)

            } else {
                swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: `Item not found!`
                })
            }
        }
        setAdvancedSearch(false)
        setIdInput("")
        setProjectInput("")
        setOpenOrClose("open") 
        inputRemover(true, true, false, false)
    })
}

export default advancedSearchFunc