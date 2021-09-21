const updateFunc = (params) => {

    params.setIsLoading(true)

    const sendingData = {
        _id: params.issueId,
        issue_title: params.newIssueTitleInput, 
        issue_text: params.newIssueTextInput, 
        created_by: params.newIssueCreatedInput, 
        assigned_to: params.newIssueAssignedInput, 
        status_text: params.newIssueStatusInput,
        open: params.openOrClose==="open" ? "true" : "false"
    }

    params.axios.put(`${params.BASE_URL}/api/issues/${params.selectedProject}`, sendingData).then(response => {
        const {data} = response

        if (data.hasOwnProperty("error")) {
            params.swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })

        } else {

            params.swal.fire(`${data.result}`, `issue with id ${params.issueId} for project "${params.selectedProject}" updated successfully`, "success").then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    params.getList(params.selectedProject)
                  }
                }
            )
        }
        params.setUpdateIssue(false)
        params.setOpenOrClose("open")
        params.inputRemover(true, true, true, true)
    })
}

export default updateFunc