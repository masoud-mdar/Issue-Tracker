const closeFunc = (setSelectedIssue, setAddProject, setNewProjectInput, setAddIssue, setUpdateIssue, setDeleteIssue, setAdvancedSearch, setOpenOrClose, setSearchInput, setProjectInput, setIdInput, inputRemover, setIsLog, no) => {

    setSelectedIssue({})
    setAddProject(false)
    setNewProjectInput("")
    setAddIssue(false)
    setUpdateIssue(false)
    setDeleteIssue(false)
    setAdvancedSearch(false)
    setOpenOrClose("open")
    setSearchInput("")
    setProjectInput("")
    setIdInput("")
    //setIsLog(false)
    inputRemover(true, false, true, true)
}

export default closeFunc