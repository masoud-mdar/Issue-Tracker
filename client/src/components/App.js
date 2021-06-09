import React, {useEffect, useState} from "react"
import axios from "axios"
import swal from "sweetalert2"

import closeFunc from "../logic/closeFunc"
import moreDetailsFunc from "../logic/moreDetailsFunc"
import addProjectFunc from "../logic/addProjectFunc"
import submitNProjectFunc from "../logic/submitNProjectFunc"
import addIssueFunc from "../logic/addIssueFunc"
import submitIssueFunc from "../logic/submitIssueFunc"
import issueUpdateDelFunc from "../logic/issueUpdateDelFunc"
import updateFunc from "../logic/updateFunc"
import surelyDeleteFunc from "../logic/surelyDeleteFunc"
import simpleSearchFunc from "../logic/simpleSearchFunc"
import advancedSearchFunc from "../logic/advancedSearchFunc"
import myTicketsFunc from "../logic/myTicketsFunc"

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

import {BASE_URL} from "../utils/constants"

const App = () => {
    const [projects, setProjects] = useState([])
    const [selectedProject, setSelectedProject] = useState("")
    const [issuesList, setIssuesList] = useState([])
    const [selectedIssue, setSelectedIssue] = useState({})

    const [newProjectInput, setNewProjectInput] = useState("")
    const [searchInput, setSearchInput] = useState("")

    const [newIssueTitleInput, setNewIssueTitleInput] = useState("")
    const [newIssueTextInput, setNewIssueTextInput] = useState("")
    const [newIssueCreatedInput, setNewIssueCreatedInput] = useState("")
    const [newIssueAssignedInput, setNewIssueAssignedInput] = useState("")
    const [newIssueStatusInput, setNewIssueStatusInput] = useState("")
    const [idInput, setIdInput] = useState("")
    const [projectInput, setProjectInput] = useState("")

    const [isLoading, setIsLoading] = useState(false)
    const [isSearchActive, setIsSearchActive] = useState(false)
    const [isLog, setIsLog] = useState(false)

    const [moreDetails, setMoreDetails] = useState(false)
    const [addProject, setAddProject] = useState(false)
    const [addIssue, setAddIssue] = useState(false)
    const [updateIssue, setUpdateIssue] = useState(false)
    const [deleteIssue, setDeleteIssue] = useState(false)
    const [advancedSearch, setAdvancedSearch] = useState(false)

    const [openOrClose, setOpenOrClose] = useState("open")
    const [issueId, setIssueId] = useState("")

    const [copied, setCopied] = useState("")
    const [count, setCount] = useState(0)

    //with log in / register functionality

    const [isLoggedIn, setIsLoggedIn] = useState(false)

    const [demoUser, setDemoUser] = useState("")

    const [loginUserInput, setLoginUserInput] = useState("")
    const [loginPassInput, setLoginPassInput] = useState("")

    let timerId

    useEffect(() => {

        setIsLoading(true)

        axios.get(`${BASE_URL}/api/issues/all`).then(response => {
            const {data} = response

            let tempArr = [] 
            data.forEach(element => {

                (tempArr.indexOf(element.project) === -1) && (tempArr.push(element.project))
            })

            setProjects(tempArr)
            setIsLoading(false)
        })
    }, [])

    useEffect(() => {

        setIsLoading(true)
    
        axios.get(`${BASE_URL}/api/issues/all`).then(response => {
            const {data} = response
    
            let tempArr = [] 
            data.forEach(element => {
    
                (tempArr.indexOf(element.project) === -1) && (tempArr.push(element.project))
            })
    
            setProjects(tempArr)
            setSelectedProject("")
            setIsLoading(false)
        })

    }, [count])

    const getList = (innerHTML) => {

        setMoreDetails(false)
        setAddProject(false)
        setAddIssue(false)
        setSelectedProject(innerHTML)
        setIsLoading(true)
        setIssueId("")

        axios.get(`${BASE_URL}/api/issues/${innerHTML}`).then(response => {
            const {data} = response
            setIssuesList(data)
            setIsLoading(false)
        })
    }

    const inputRemover = (isSetNewIssue, isSetIsLoading, isSetIssueId, isSetMoreDetails) => {

        if (isSetNewIssue) {
            setNewIssueTitleInput("")
            setNewIssueTextInput("")
            setNewIssueCreatedInput("")
            setNewIssueAssignedInput("")
            setNewIssueStatusInput("")
        }
        isSetIsLoading && setIsLoading(false)
        isSetIssueId && setIssueId("")
        isSetMoreDetails && setMoreDetails(false)
    }

    const handleChange = (Event) => {

        const {name, value} = Event.target

        switch (name) {
            case "new-project-input":
                setNewProjectInput(value)
                break
            case "add-issue-title":
                setNewIssueTitleInput(value)
                break
            case "add-issue-text":
                setNewIssueTextInput(value)
                break
            case "add-issue-created":
                setNewIssueCreatedInput(value)
                break
            case "add-issue-assigned":
                setNewIssueAssignedInput(value)
                break
            case "add-issue-status-text":
                setNewIssueStatusInput(value)
                break
            case "search":
                setSearchInput(value)
                break
            case "idInput":
                setIdInput(value)
                break
            case "projectInput":
                setProjectInput(value)
                break
            case "open-close":
                setOpenOrClose(value)
                break
            case "login-username":
                setLoginUserInput(value)
                break
            case "login-password":
                setLoginPassInput(value)
                break
            default:
                console.log(name)
                break
        }
    }

    const handleClick = (Event) => {

        const {name, innerHTML, id} = Event.target

        switch (name) {
            case "select-project-btn":
                setIsLog(false)
                getList(innerHTML)
                break
            case "details":
                !moreDetails && moreDetailsFunc(id, setIsLoading, setMoreDetails, issuesList, setSelectedIssue, inputRemover)
                break
            case "close":
                closeFunc(setSelectedIssue, setAddProject, setNewProjectInput, setAddIssue, setUpdateIssue, setDeleteIssue, setAdvancedSearch, setOpenOrClose, setSearchInput, setProjectInput, setIdInput, inputRemover, setIsLog)
                break
            case "add-project":
                addProjectFunc(setAddProject, setAddIssue, setUpdateIssue, inputRemover, setIsLog)
                break
            case "submit-new-project":
                setIsLog(false)
                submitNProjectFunc(setIsLoading, setSelectedProject, setIssuesList, setSelectedIssue, inputRemover, projects, newProjectInput, axios, BASE_URL, demoUser, swal, setCount, setNewProjectInput, setAddProject)
                break
            case "add-issue-button":
                addIssueFunc(setAddIssue, setUpdateIssue, setAddProject, inputRemover, setIsLog)
                break
            case "submit-issue":
                submitIssueFunc(setIsLoading, newIssueTitleInput, newIssueTextInput, newIssueCreatedInput, newIssueAssignedInput, newIssueStatusInput, axios, BASE_URL, selectedProject, swal, getList, inputRemover, setAddIssue)
                break
            case "issue-update-del":
                issueUpdateDelFunc(id, setIssueId, setUpdateIssue, setAddProject, setAddIssue, inputRemover)
                break
            case "update":
                updateFunc(setIsLoading, issueId, newIssueTitleInput, newIssueTextInput, newIssueCreatedInput, newIssueAssignedInput, newIssueStatusInput, openOrClose, axios, BASE_URL, selectedProject, swal, getList, setUpdateIssue, setOpenOrClose, inputRemover)
                break
            case "delete":
                setDeleteIssue(true)
                break
            case "surely-delete":
                surelyDeleteFunc(setIsLoading, issueId, axios, BASE_URL, selectedProject, swal, getList, setUpdateIssue, setDeleteIssue, inputRemover, setIsLog)
                break
            case "back-details":
                setMoreDetails(true)
                setUpdateIssue(false)
                setDeleteIssue(false)
                break
            case "no":
                setDeleteIssue(false)
                break
            case "go":
                simpleSearchFunc(setIsLoading, searchInput, axios, BASE_URL, setIssuesList, setSelectedProject, swal, setSearchInput, setMoreDetails, setIsLog)
                break
            case "advanced-search":
                setAdvancedSearch(true)
                break
            case "avnaced-go":
                advancedSearchFunc(setIsLoading, setSearchInput, projectInput, newIssueTitleInput, newIssueTextInput, newIssueCreatedInput, newIssueAssignedInput, newIssueStatusInput, openOrClose, BASE_URL, idInput, axios, swal, setSelectedProject, setIssuesList, setAdvancedSearch, setIdInput, setProjectInput, setOpenOrClose, inputRemover, setIsLog)
                break
            case "search":
                setIsSearchActive(true)
                timerId = setTimeout(() => {
                    setIsSearchActive(false)
                }, 100)
                break
            case "my-tickets":
                setIsLog(prevIsLog => !prevIsLog)
                closeFunc(setSelectedIssue, setAddProject, setNewProjectInput, setAddIssue, setUpdateIssue, setDeleteIssue, setAdvancedSearch, setOpenOrClose, setSearchInput, setProjectInput, setIdInput, inputRemover, setIsLog, "no")
                myTicketsFunc(axios, BASE_URL, setIssuesList, id, setIsLoading)
                break
            case "demo-login":
                setDemoUser("demoUser")
                setIsLoggedIn(true)
                console.log("hihi")
                break
            case "administrator-login":
                setDemoUser("administrator")
                setIsLoggedIn(true)
                break
            case "login":
                // connect to server to log in
                const sendingData = {
                    username: loginUserInput,
                    password: loginPassInput
                }
                axios.post(`${BASE_URL}/login`, sendingData, {withCredentials: true}).then(response => {
                    const {data} = response
                    console.log(data)
                })
                break
            default:
                console.log(name)
                break
        }
    }


    const handleCopy = (Event) => {
        setCopied(Event)
    }

    clearTimeout(timerId)

    return (
        <div>
            {
                !isLoading && isLoggedIn ? (


                    <div className="container">

                        <Navbar 
                            data={{
                                user: demoUser,
                                handleChange: handleChange,
                                handleClick: handleClick,
                                searchInput: searchInput,
                                isSearchActive: isSearchActive,
                                isLog: isLog
                            }}
                        />

                        <div className="main-part">

                            <Select
                                data={{
                                    handleClick: handleClick,
                                    projects: projects
                                }}
                            />

                            <div className="info-part">
                                {
                                    addProject && (

                                        <AddProject
                                            data={{
                                                handleClick: handleClick,
                                                handleChange: handleChange,
                                                newProjectInput: newProjectInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    selectedProject && !isLog && (
                                        <AddIssBtn
                                            data={{
                                                handleClick: handleClick,
                                                selectedProject: selectedProject
                                            }}
                                        />
                                    )
                                }
                                {
                                    addIssue && selectedProject && (
                                        <AddIssue
                                            data={{
                                                handleClick: handleClick,
                                                handleChange: handleChange,
                                                newIssueTitleInput: newIssueTitleInput,
                                                newIssueTextInput: newIssueTextInput,
                                                newIssueCreatedInput: newIssueCreatedInput,
                                                newIssueAssignedInput: newIssueAssignedInput,
                                                newIssueStatusInput: newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    updateIssue && (
                                        <UpdateIssue
                                            data={{
                                                handleClick: handleClick,
                                                handleChange: handleChange,
                                                openOrClose: openOrClose,
                                                newIssueTitleInput: newIssueTitleInput,
                                                newIssueTextInput: newIssueTextInput,
                                                newIssueCreatedInput: newIssueCreatedInput,
                                                newIssueAssignedInput: newIssueAssignedInput,
                                                newIssueStatusInput: newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    deleteIssue && (
                                        <DeleteIssue
                                            data={{
                                                handleClick: handleClick
                                            }}
                                        />
                                    )
                                }
                                {
                                    advancedSearch && (
                                        <AdvancedSearch
                                            data={{
                                                handleChange: handleChange,
                                                handleClick: handleClick,
                                                openOrClose: openOrClose,
                                                projectInput: projectInput,
                                                idInput: idInput,
                                                newIssueTitleInput: newIssueTitleInput,
                                                newIssueTextInput: newIssueTextInput,
                                                newIssueCreatedInput: newIssueCreatedInput,
                                                newIssueAssignedInput: newIssueAssignedInput,
                                                newIssueStatusInput: newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    moreDetails && (
                                        <MoreDetails
                                            data={{
                                                handleClick: handleClick,
                                                handleCopy: handleCopy,
                                                selectedIssue: selectedIssue,
                                                copied: copied,
                                                isLog: isLog
                                            }}
                                        />
                                    )
                                }

                                {
                                    isLog ? (

                                        <Log
                                            data={{
                                                issuesList: issuesList,
                                                selectedProject: selectedProject,
                                                myProjects: projects,
                                                handleClick: handleClick
                                            }}
                                        />

                                    ) : (

                                        <List
                                            data={{
                                                issuesList: issuesList,
                                                selectedProject: selectedProject,
                                                handleClick: handleClick
                                            }}
                                        />
                                    )
                                }
            
                            </div>
                        </div>
                    </div>

                ) : !isLoading && !isLoggedIn ? (
                    <div className="login-page">

                        <div className="default-part">
                            <button name="demo-login" onClick={handleClick}>Log in as demo user</button>
                            <button name="administrator-login" onClick={handleClick}>Log in as Administrator</button>
                        </div>
                        <div className="login-part">
                            <input name="login-username" onChange={handleChange} value={loginUserInput} placeholder="Enter your username"></input>
                            <input name="login-password" onChange={handleChange} value={loginPassInput} placeholder="Enter your password"></input>
                            <button name="login" onClick={handleClick}>login</button>
                        </div>
                        <div className="register-part"></div>

                    </div>
                ) : (
                    <Loading />
                )
            }
            
        </div>
    )
}

export default App