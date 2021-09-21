const surelyDeleteFunc = (params) => {

    params.setIsLoading(true)

    const sendingData = {
        _id: params.issueId
    }

    params.axios.delete(`${params.BASE_URL}/api/issues/${params.selectedProject}`, {data: sendingData}).then(response => {

        const {data} = response

        if (data.hasOwnProperty("error")) {
            params.swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })

        } else {

            params.swal.fire(`${data.result}`, `issue with id ${params.issueId} for project "${params.selectedProject}" deleted successfully`, "success").then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    params.getList(params.selectedProject)
                  }
                }
            )
        }
        params.setUpdateIssue(false)
        params.setDeleteIssue(false)
        params.setIsLog(false)
        params.inputRemover(true, true, true, true)
    })
}

export default surelyDeleteFunc