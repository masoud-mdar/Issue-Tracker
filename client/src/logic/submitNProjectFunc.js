const submitNProjectFunc = (setIsLoading, setSelectedProject, setIssuesList, setSelectedIssue, inputRemover, projects, newProjectInput, axios, BASE_URL, demoUser, swal, setCount, setNewProjectInput, setAddProject) => {

    setIsLoading(true)
    setSelectedProject("")
    setIssuesList([])
    setSelectedIssue({})
    inputRemover(false, false, true, true)

    let isIt = projects.indexOf(newProjectInput)

    if (isIt === -1) {

        axios.post(`${BASE_URL}/api/issues/addProject/${newProjectInput}?user=${demoUser}`, {}).then(response => {
            const {data} = response

            if (data.hasOwnProperty("error")) {
                swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: `${data.error}`
                })

            } else {
                swal.fire(`${data.project}`, "New project registered successfully", "success").then(
                    (result) => {
                      if (result.isConfirmed || result.isDismissed) {
                        setSelectedProject(newProjectInput)
                        setIssuesList([data])
                        setCount(prevCount => prevCount + 1)
                        //console.log(data)
                      }
                    }
                )
            }
            setNewProjectInput("")
            setAddProject(false)
            setIsLoading(false)
        })

    } else {
        swal.fire({
            icon: "error",
            title: "Error!",
            text: "Project already exists!"
        })
        setIsLoading(false)
    }
}

export default submitNProjectFunc