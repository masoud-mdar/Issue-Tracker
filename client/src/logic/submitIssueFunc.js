const submitIssueFunc = (setIsLoading, newIssueTitleInput, newIssueTextInput, newIssueCreatedInput, newIssueAssignedInput, newIssueStatusInput, axios, BASE_URL, selectedProject, swal, getList, inputRemover, setAddIssue) => {

    setIsLoading(true)

    const sendingData = {

        issue_title: newIssueTitleInput, 
        issue_text: newIssueTextInput, 
        created_by: newIssueCreatedInput, 
        assigned_to: newIssueAssignedInput, 
        status_text: newIssueStatusInput
    }

    axios.post(`${BASE_URL}/api/issues/${selectedProject}`, sendingData).then(response => {
        const {data} = response
        
        if (data.hasOwnProperty("error")) {
            swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })

        } else {

            swal.fire(`${data.issue_title}`, `New issue for project "${data.project}" submitted successfully`, "success").then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    getList(selectedProject)
                  }
                }
            )
        }
        inputRemover(true, true, false, true)
        setAddIssue(false)
    })
}

export default submitIssueFunc