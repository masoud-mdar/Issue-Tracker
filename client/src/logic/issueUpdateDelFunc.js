const issueUpdateDelFunc = (id, setIssueId, setUpdateIssue, setAddProject, setAddIssue, inputRemover) => {

    setIssueId(id)
    setUpdateIssue(true)
    setAddProject(false)
    setAddIssue(false)
    inputRemover(false, false, false, true)
}

export default issueUpdateDelFunc