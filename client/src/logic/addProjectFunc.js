const addProjectFunc = (setAddProject, setAddIssue, setUpdateIssue, inputRemover, setIsLog) => {

    setAddProject(true)
    setAddIssue(false)
    setUpdateIssue(false)
    setIsLog(false)
    inputRemover(false, false, true, false)
}

export default addProjectFunc