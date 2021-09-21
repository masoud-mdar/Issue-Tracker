const parameters = (params, whichOne) => {

    const allParamsObject = {
        closeFuncparams : {
            setSelectedIssue: params.setSelectedIssue,
            setAddProject: params.setAddProject,
            setNewProjectInput: params.setNewProjectInput,
            setAddIssue: params.setAddIssue,
            setUpdateIssue: params.setUpdateIssue,
            setDeleteIssue: params.setDeleteIssue,
            setAdvancedSearch: params.setAdvancedSearch,
            setOpenOrClose: params.setOpenOrClose,
            setSearchInput: params.setSearchInput,
            setProjectInput: params.setProjectInput,
            setIdInput: params.setIdInput,
            inputRemover: params.inputRemover,
            setIsLog: params.setIsLog
        },
        addProjectFuncparams : {
            setAddProject: params.setAddProject,
            setAddIssue: params.setAddIssue,
            setUpdateIssue: params.setUpdateIssue,
            inputRemover: params.inputRemover,
            setIsLog: params.setIsLog
        },
        submitNProjectFuncparams : {
            projects: params.projects,
            newProjectInput: params.newProjectInput,
            demoUser: params.demoUser,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            swal: params.swal,
            setIsLoading: params.setIsLoading,
            setSelectedProject: params.setSelectedProject,
            setIssuesList: params.setIssuesList,
            setSelectedIssue: params.setSelectedIssue,
            inputRemover: params.inputRemover,
            setCount: params.setCount,
            setNewProjectInput: params.setNewProjectInput,
            setAddProject: params.setAddProject
        },
        addIssueFuncparams : {
            setAddIssue: params.setAddIssue,
            setUpdateIssue: params.setUpdateIssue,
            setAddProject: params.setAddProject,
            inputRemover: params.inputRemover,
            setIsLog: params.setIsLog
        },
        submitIssueFuncparams : {
            newIssueTitleInput: params.newIssueTitleInput,
            newIssueTextInput: params.newIssueTextInput,
            newIssueCreatedInput: params.newIssueCreatedInput,
            newIssueAssignedInput: params.newIssueAssignedInput,
            newIssueStatusInput: params.newIssueStatusInput,
            selectedProject: params.selectedProject,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            swal: params.swal,
            setIsLoading: params.setIsLoading,
            getList: params.getList,
            inputRemover: params.inputRemover,
            setAddIssue: params.setAddIssue
        },
        issueUpdateDelFuncparams : {
            setIssueId: params.setIssueId,
            setUpdateIssue: params.setUpdateIssue,
            setAddProject: params.setAddProject,
            setAddIssue: params.setAddIssue,
            inputRemover: params.inputRemover
        },
        updateFuncparams : {
            issueId: params.issueId,
            newIssueTitleInput: params.newIssueTitleInput,
            newIssueTextInput: params.newIssueTextInput,
            newIssueCreatedInput: params.newIssueCreatedInput,
            newIssueAssignedInput: params.newIssueAssignedInput,
            newIssueStatusInput: params.newIssueStatusInput,
            openOrClose: params.openOrClose,
            selectedProject: params.selectedProject,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            swal: params.swal,
            setIsLoading: params.setIsLoading,
            getList: params.getList,
            setUpdateIssue: params.setUpdateIssue,
            setOpenOrClose: params.setOpenOrClose,
            inputRemover: params.inputRemover
        },
        surelyDeleteFuncparams : {
            issueId: params.issueId,
            selectedProject: params.selectedProject,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            swal: params.swal,
            setIsLoading: params.setIsLoading,
            getList: params.getList,
            setUpdateIssue: params.setUpdateIssue,
            setDeleteIssue: params.setDeleteIssue,
            inputRemover: params.inputRemover,
            setIsLog: params.setIsLog
        },
        simpleSearchFuncparams : {
            searchInput: params.searchInput,
            BASE_URL: params.BASE_URL,
            axios: params.axios,
            swal: params.swal,
            setIsLoading: params.setIsLoading,
            setIssuesList: params.setIssuesList,
            setSelectedProject: params.setSelectedProject,
            setSearchInput: params.setSearchInput,
            setMoreDetails: params.setMoreDetails,
            setIsLog: params.setIsLog
        },
        advancedSearchFuncparams : {
            projectInput: params.projectInput,
            newIssueTitleInput: params.newIssueTitleInput,
            newIssueTextInput: params.newIssueTextInput,
            newIssueCreatedInput: params.newIssueCreatedInput,
            newIssueAssignedInput: params.newIssueAssignedInput,
            newIssueStatusInput: params.newIssueStatusInput,
            openOrClose: params.openOrClose,
            BASE_URL: params.BASE_URL,
            idInput: params.idInput,
            axios: params.axios,
            swal: params.swal,
            setIsLoading: params.setIsLoading,
            setSearchInput: params.setSearchInput,
            setSelectedProject: params.setSelectedProject,
            setIssuesList: params.setIssuesList,
            setAdvancedSearch: params.setAdvancedSearch,
            setIdInput: params.setIdInput,
            setProjectInput: params.setProjectInput,
            setOpenOrClose: params.setOpenOrClose,
            inputRemover: params.inputRemover,
            setIsLog: params.setIsLog
        }
    }


    if (whichOne) {
        return allParamsObject[whichOne]
    }


}

export default parameters