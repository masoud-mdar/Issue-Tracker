const surelyDeleteFunc = (setIsLoading, issueId, axios, BASE_URL, selectedProject, swal, getList, setUpdateIssue, setDeleteIssue, inputRemover, setIsLog) => {

    setIsLoading(true)

    const sendingData = {
        _id: issueId
    }

    axios.delete(`${BASE_URL}/api/issues/${selectedProject}`, {data: sendingData}).then(response => {

        const {data} = response

        if (data.hasOwnProperty("error")) {
            swal.fire({
                icon: "error",
                title: "Error!",
                text: `${data.error}`
            })

        } else {

            swal.fire(`${data.result}`, `issue with id ${issueId} for project "${selectedProject}" deleted successfully`, "success").then(
                (result) => {
                  if (result.isConfirmed || result.isDismissed) {
                    getList(selectedProject)
                  }
                }
            )
        }
        setUpdateIssue(false)
        setDeleteIssue(false)
        setIsLog(false)
        inputRemover(true, true, true, true)
    })
}

export default surelyDeleteFunc