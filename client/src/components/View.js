import React from "react"

import List from "./List"
import Select from "./Select"
import AddProject from "./AddProject"
import AddIssBtn from "./AddIssBtn"
import AddIssue from "./AddIssue"
import UpdateIssue from "./UpdateIssue"
import DeleteIssue from "./DeleteIssue"
import MoreDetails from "./MoreDetails"
import Loading from "./Loading"
import Navbar from "./Navbar"
import AdvancedSearch from "./AdvancedSearch"
import Log from "./Log"
import LoginPage from "./LoginPage"

const View = (props) => {

    return (
        <div>
            {
                !props.data.isLoading && props.data.isLoggedIn ? (

                    <div className="container">

                        <Navbar 
                            data={{
                                user: props.data.demoUser,
                                handleChange: props.data.handleChange,
                                handleClick: props.data.handleClick,
                                searchInput: props.data.searchInput,
                                isSearchActive: props.data.isSearchActive,
                                isLog: props.data.isLog
                            }}
                        />

                        <div className="main-part">

                            <Select
                                data={{
                                    handleClick: props.data.handleClick,
                                    projects: props.data.projects
                                }}
                            />

                            <div className="info-part">
                                {
                                    props.data.addProject && (

                                        <AddProject
                                            data={{
                                                handleClick: props.data.handleClick,
                                                handleChange: props.data.handleChange,
                                                newProjectInput: props.data.newProjectInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    props.data.selectedProject && !props.data.isLog && (
                                        <AddIssBtn
                                            data={{
                                                handleClick: props.data.handleClick,
                                                selectedProject: props.data.selectedProject
                                            }}
                                        />
                                    )
                                }
                                {
                                    props.data.addIssue && props.data.selectedProject && (
                                        <AddIssue
                                            data={{
                                                handleClick: props.data.handleClick,
                                                handleChange: props.data.handleChange,
                                                newIssueTitleInput: props.data.newIssueTitleInput,
                                                newIssueTextInput: props.data.newIssueTextInput,
                                                newIssueCreatedInput: props.data.newIssueCreatedInput,
                                                newIssueAssignedInput: props.data.newIssueAssignedInput,
                                                newIssueStatusInput: props.data.newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    props.data.updateIssue && (
                                        <UpdateIssue
                                            data={{
                                                handleClick: props.data.handleClick,
                                                handleChange: props.data.handleChange,
                                                openOrClose: props.data.openOrClose,
                                                newIssueTitleInput: props.data.newIssueTitleInput,
                                                newIssueTextInput: props.data.newIssueTextInput,
                                                newIssueCreatedInput: props.data.newIssueCreatedInput,
                                                newIssueAssignedInput: props.data.newIssueAssignedInput,
                                                newIssueStatusInput: props.data.newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    props.data.deleteIssue && (
                                        <DeleteIssue
                                            data={{
                                                handleClick: props.data.handleClick
                                            }}
                                        />
                                    )
                                }
                                {
                                    props.data.advancedSearch && (
                                        <AdvancedSearch
                                            data={{
                                                handleChange: props.data.handleChange,
                                                handleClick: props.data.handleClick,
                                                openOrClose: props.data.openOrClose,
                                                projectInput: props.data.projectInput,
                                                idInput: props.data.idInput,
                                                newIssueTitleInput: props.data.newIssueTitleInput,
                                                newIssueTextInput: props.data.newIssueTextInput,
                                                newIssueCreatedInput: props.data.newIssueCreatedInput,
                                                newIssueAssignedInput: props.data.newIssueAssignedInput,
                                                newIssueStatusInput: props.data.newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    props.data.moreDetails && (
                                        <MoreDetails
                                            data={{
                                                handleClick: props.data.handleClick,
                                                handleCopy: props.data.handleCopy,
                                                selectedIssue: props.data.selectedIssue,
                                                copied: props.data.copied,
                                                isLog: props.data.isLog
                                            }}
                                        />
                                    )
                                }

                                {
                                    props.data.isLog ? (

                                        <Log
                                            data={{
                                                issuesList: props.data.issuesList,
                                                selectedProject: props.data.selectedProject,
                                                myProjects: props.data.projects,
                                                handleClick: props.data.handleClick
                                            }}
                                        />

                                    ) : (

                                        <List
                                            data={{
                                                issuesList: props.data.issuesList,
                                                selectedProject: props.data.selectedProject,
                                                handleClick: props.data.handleClick
                                            }}
                                        />
                                    )
                                }
            
                            </div>
                        </div>
                    </div>

                ) : !props.data.isLoading && !props.data.isLoggedIn ? (
                    <LoginPage
                        data={{
                            handleClick: props.data.handleClick,
                            handleChange: props.data.handleChange,
                            loginUserInput: props.data.loginUserInput,
                            loginPassInput: props.data.loginPassInput,
                            regUserInput: props.data.regUserInput,
                            regPassInput: props.data.regPassInput,
                            isRegMode: props.data.isRegMode
                        }}
                    />
                ) : (
                    <Loading />
                )
            }
            
        </div>
    )
}

export default View