const simpleSearchFunc = (params) => {

    params.setIsLoading(true)
    params.setMoreDetails(false)
    
    if (params.searchInput) {

        params.axios.get(`${params.BASE_URL}/api/issues/${params.searchInput}`).then(response => {

            const {data} = response

            if (!data.hasOwnProperty("error")) {

                if (data.length) {
                    params.setIssuesList(data)
                    params.setSelectedProject(params.searchInput)

                } else {
                    params.swal.fire({
                        icon: "error",
                        title: "Error!",
                        text: `Project "${params.searchInput}" not found!`
                    })
                }
            } else {
                params.swal.fire({
                    icon: "error",
                    title: "Error!",
                    text: `${data.error}`
                })
            }
            params.setSearchInput("")
            params.setIsLog(false)
            params.setIsLoading(false)
        })
    } else {
        params.setIsLoading(false)
    }
}

export default simpleSearchFunc