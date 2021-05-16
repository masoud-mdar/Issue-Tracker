const addIssueFunc = (setAddIssue, setUpdateIssue, setAddProject, inputRemover, setIsLog) => {

    setAddIssue(true)
    setUpdateIssue(false)
    setAddProject(false)
    setIsLog(false)
    inputRemover(false, false, true, false)
}

export default addIssueFunc