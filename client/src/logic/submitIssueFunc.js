const submitIssueFunc = (params) => {

    params.setIsLoading(true)

    const sendingData = {

        issue_title: params.newIssueTitleInput, 
        issue_text: params.newIssueTextInput, 
        created_by: params.newIssueCreatedInput, 
        assigned_to: params.newIssueAssignedInput, 
        status_text: params.newIssueStatusInput
    }

    params.axios.post(`${params.BASE_URL}/api/issues/${params.selectedProject}`, sendingData).then(response => {
        const {data} = response
        
        if (data.hasOwnProperty("error")) {
            params.swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })

        } else {

            params.swal.fire(`${data.issue_title}`, `New issue for project "${data.project}" submitted successfully`, "success").then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    params.getList(params.selectedProject)
                  }
                }
            )
        }
        params.inputRemover(true, true, false, true)
        params.setAddIssue(false)
    })
}

export default submitIssueFunc