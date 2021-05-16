const simpleSearchFunc = (setIsLoading, searchInput, axios, BASE_URL, setIssuesList, setSelectedProject, swal, setSearchInput, setMoreDetails, setIsLog) => {

    setIsLoading(true)
    setMoreDetails(false)
    
    if (searchInput) {

        axios.get(`${BASE_URL}/api/issues/${searchInput}`).then(response => {

            const {data} = response

            if (!data.hasOwnProperty("error")) {

                if (data.length) {
                    setIssuesList(data)
                    setSelectedProject(searchInput)

                } else {
                    swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: `Project "${searchInput}" not found!`
                    })
                }
            } else {
                swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: `${data.error}`
                })
            }
            setSearchInput("")
            setIsLog(false)
            setIsLoading(false)
        })
    } else {
        setIsLoading(false)
    }
}

export default simpleSearchFunc