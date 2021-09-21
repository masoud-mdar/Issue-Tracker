const addIssueFunc = (params) => {

    params.setAddIssue(true)
    params.setUpdateIssue(false)
    params.setAddProject(false)
    params.setIsLog(false)
    params.inputRemover(false, false, true, false)
}

export default addIssueFunc