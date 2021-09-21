const issueUpdateDelFunc = (params) => {

    params.setIssueId(params.id)
    params.setUpdateIssue(true)
    params.setAddProject(false)
    params.setAddIssue(false)
    params.inputRemover(false, false, false, true)
}

export default issueUpdateDelFunc