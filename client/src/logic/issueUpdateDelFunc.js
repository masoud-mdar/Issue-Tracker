const issueUpdateDelFunc = (params, id) => {

    params.setIssueId(id)
    params.setUpdateIssue(true)
    params.setAddProject(false)
    params.setAddIssue(false)
    params.inputRemover(false, false, false, true)
}

export default issueUpdateDelFunc