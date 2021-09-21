const submitNProjectFunc = (params) => {

    params.setIsLoading(true)
    params.setSelectedProject("")
    params.setIssuesList([])
    params.setSelectedIssue({})
    params.inputRemover(false, false, true, true)

    let isIt = params.projects.indexOf(params.newProjectInput)

    if (isIt === -1) {

        params.axios.post(`${params.BASE_URL}/api/issues/addProject/${params.newProjectInput}?user=${params.demoUser}`, {}).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                params.swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: `${data.error}`
                })

            } else {
                params.swal.fire(`${data.project}`, "New project registered successfully", "success").then(
                    (result) => {
                      if (result.isConfirmed || result.isDismissed) {
                        params.setSelectedProject(params.newProjectInput)
                        params.setIssuesList([data])
                        params.setCount(prevCount => prevCount + 1)
                      }
                    }
                )
            }
            params.setNewProjectInput("")
            params.setAddProject(false)
            params.setIsLoading(false)
        })

    } else {
        params.swal.fire({
            icon: "error",
            title: "Error!",
            text: "Project already exists!"
        })
        params.setIsLoading(false)
    }
}

export default submitNProjectFunc