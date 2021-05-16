const updateFunc = (setIsLoading, issueId, newIssueTitleInput, newIssueTextInput, newIssueCreatedInput, newIssueAssignedInput, newIssueStatusInput, openOrClose, axios, BASE_URL, selectedProject, swal, getList, setUpdateIssue, setOpenOrClose, inputRemover) => {

    setIsLoading(true)

    const sendingData = {
        _id: issueId,
        issue_title: newIssueTitleInput, 
        issue_text: newIssueTextInput, 
        created_by: newIssueCreatedInput, 
        assigned_to: newIssueAssignedInput, 
        status_text: newIssueStatusInput,
        open: openOrClose==="open" ? "true" : "false"
    }

    axios.put(`${BASE_URL}/api/issues/${selectedProject}`, sendingData).then(response => {
        const {data} = response

        if (data.hasOwnProperty("error")) {
            swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })

        } else {

            swal.fire(`${data.result}`, `issue with id ${issueId} for project "${selectedProject}" updated successfully`, "success").then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    getList(selectedProject)
                  }
                }
            )
        }
        setUpdateIssue(false)
        setOpenOrClose("open")
        inputRemover(true, true, true, true)
    })
}

export default updateFunc