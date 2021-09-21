const closeFunc = (params) => {

    params.setSelectedIssue({})
    params.setAddProject(false)
    params.setNewProjectInput("")
    params.setAddIssue(false)
    params.setUpdateIssue(false)
    params.setDeleteIssue(false)
    params.setAdvancedSearch(false)
    params.setOpenOrClose("open")
    params.setSearchInput("")
    params.setProjectInput("")
    params.setIdInput("")
    params.inputRemover(true, false, true, true)
}

export default closeFunc