const addProjectFunc = (params) => {

    params.setAddProject(true)
    params.setAddIssue(false)
    params.setUpdateIssue(false)
    params.setIsLog(false)
    params.inputRemover(false, false, true, false)
}

export default addProjectFunc