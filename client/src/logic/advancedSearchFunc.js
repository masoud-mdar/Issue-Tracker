const advancedSearchFunc = (params) => {

    params.setIsLoading(true)
    params.setSearchInput("")
    params.setIsLog(false)

    const searchedProject = params.projectInput || "empty"
    const title = params.newIssueTitleInput || ""
    const text = params.newIssueTextInput || ""
    const created = params.newIssueCreatedInput || ""
    const assigned = params.newIssueAssignedInput || ""
    const status = params.newIssueStatusInput || ""
    const open = params.openOrClose === "open" ? "true" : "false"

    let URL = `${params.BASE_URL}/api/issues/${searchedProject}?open=${open}`

    if (params.idInput) {
        URL += `&_id=${params.idInput}`
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

    params.axios.get(URL).then(response => {

        const {data} = response

        if (data.hasOwnProperty("error")) {
            params.swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })

        } else {
            if (data.length) {
                params.setSelectedProject(params.projectInput)
                params.setIssuesList(data)

            } else {
                params.swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: `Item not found!`
                })
            }
        }
        params.setAdvancedSearch(false)
        params.setIdInput("")
        params.setProjectInput("")
        params.setOpenOrClose("open") 
        params.inputRemover(true, true, false, false)
    })
}

export default advancedSearchFunc