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
import LoginPage from "./LoginPage"

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
    const [regUserInput, setRegUserInput] = useState("")
    const [regPassInput, setRegPassInput] = useState("")

    const [isRegMode, setIsRegMode] = useState(false)

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
            case "register-username":
                setRegUserInput(value)
                break
            case "register-password":
                setRegPassInput(value)
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
                let closeFuncparams = {
                    setSelectedIssue,
                    setAddProject,
                    setNewProjectInput,
                    setAddIssue,
                    setUpdateIssue,
                    setDeleteIssue,
                    setAdvancedSearch,
                    setOpenOrClose,
                    setSearchInput,
                    setProjectInput,
                    setIdInput,
                    inputRemover,
                    setIsLog
                }
                closeFunc(closeFuncparams)
                break
            case "add-project":
                let addProjectFuncparams = {
                    setAddProject,
                    setAddIssue,
                    setUpdateIssue,
                    inputRemover,
                    setIsLog
                }
                addProjectFunc(addProjectFuncparams)
                break
            case "submit-new-project":
                setIsLog(false)
                let submitNProjectFuncparams = {
                    projects,
                    newProjectInput,
                    demoUser,
                    BASE_URL,
                    axios,
                    swal,
                    setIsLoading,
                    setSelectedProject,
                    setIssuesList,
                    setSelectedIssue,
                    inputRemover,
                    setCount,
                    setNewProjectInput,
                    setAddProject
                }
                submitNProjectFunc(submitNProjectFuncparams)
                break
            case "add-issue-button":
                let addIssueFuncparams = {
                    setAddIssue,
                    setUpdateIssue,
                    setAddProject,
                    inputRemover,
                    setIsLog
                }
                addIssueFunc(addIssueFuncparams)
                break
            case "submit-issue":
                let submitIssueFuncparams = {
                    newIssueTitleInput,
                    newIssueTextInput,
                    newIssueCreatedInput,
                    newIssueAssignedInput,
                    newIssueStatusInput,
                    selectedProject,
                    BASE_URL,
                    axios,
                    swal,
                    setIsLoading,
                    getList,
                    inputRemover,
                    setAddIssue
                }
                submitIssueFunc(submitIssueFuncparams)
                break
            case "issue-update-del":
                let issueUpdateDelFuncparams = {
                    id,
                    setIssueId,
                    setUpdateIssue,
                    setAddProject,
                    setAddIssue,
                    inputRemover
                }
                issueUpdateDelFunc(issueUpdateDelFuncparams)
                break
            case "update":
                let updateFuncparams = {
                    issueId,
                    newIssueTitleInput,
                    newIssueTextInput,
                    newIssueCreatedInput,
                    newIssueAssignedInput,
                    newIssueStatusInput,
                    openOrClose,
                    selectedProject,
                    BASE_URL,
                    axios,
                    swal,
                    setIsLoading,
                    getList,
                    setUpdateIssue,
                    setOpenOrClose,
                    inputRemover
                }
                updateFunc(updateFuncparams)
                break
            case "delete":
                setDeleteIssue(true)
                break
            case "surely-delete":
                let surelyDeleteFuncparams = {
                    issueId,
                    selectedProject,
                    BASE_URL,
                    axios,
                    swal,
                    setIsLoading,
                    getList,
                    setUpdateIssue,
                    setDeleteIssue,
                    inputRemover,
                    setIsLog
                }
                surelyDeleteFunc(surelyDeleteFuncparams)
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
                let simpleSearchFuncparams = {
                    searchInput,
                    BASE_URL,
                    axios,
                    swal,
                    setIsLoading,
                    setIssuesList,
                    setSelectedProject,
                    setSearchInput,
                    setMoreDetails,
                    setIsLog
                }

                simpleSearchFunc(simpleSearchFuncparams)
                break
            case "advanced-search":
                setAdvancedSearch(true)
                break
            case "avnaced-go":
                let advancedSearchFuncparams = {
                    projectInput,
                    newIssueTitleInput,
                    newIssueTextInput,
                    newIssueCreatedInput,
                    newIssueAssignedInput,
                    newIssueStatusInput,
                    openOrClose,
                    BASE_URL,
                    idInput,
                    axios,
                    swal,
                    setIsLoading,
                    setSearchInput,
                    setSelectedProject,
                    setIssuesList,
                    setAdvancedSearch,
                    setIdInput,
                    setProjectInput,
                    setOpenOrClose,
                    inputRemover,
                    setIsLog
                }
                advancedSearchFunc(advancedSearchFuncparams)
                break
            case "search":
                setIsSearchActive(true)
                timerId = setTimeout(() => {
                    setIsSearchActive(false)
                }, 100)
                break
            case "my-tickets":
                setIsLog(prevIsLog => !prevIsLog)

                let params = {
                    setSelectedIssue,
                    setAddProject,
                    setNewProjectInput,
                    setAddIssue,
                    setUpdateIssue,
                    setDeleteIssue,
                    setAdvancedSearch,
                    setOpenOrClose,
                    setSearchInput,
                    setProjectInput,
                    setIdInput,
                    inputRemover,
                    setIsLog
                }

                closeFunc(params)
                myTicketsFunc(axios, BASE_URL, setIssuesList, id, setIsLoading)
                break
            case "demo-login":
                setDemoUser("demoUser")
                setIsLoggedIn(true)
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

                    if (data.hasOwnProperty("success")) {
                        setIsLoggedIn(true)
                        setDemoUser(data.user)
                        setLoginUserInput("")
                        setLoginPassInput("")
                        setRegUserInput("")
                        setRegPassInput("")
                    } else if (data.hasOwnProperty("error")) {
                        // show the error msg
                    }

                })
                break

            case "logout":

                axios.get(`${BASE_URL}/logout`).then(response => {
                    const {data} = response

                    console.log(data)
                    //show a msg maybe
                    setIsLoggedIn(false)
                    setDemoUser("")
                    setLoginUserInput("")
                    setLoginPassInput("")
                    setRegUserInput("")
                    setRegPassInput("")
                    setIsRegMode(false)

                })
                break

            case "register":

                const sendingData2 = {
                    username: regUserInput,
                    password: regPassInput
                }

                axios.post(`${BASE_URL}/register`, sendingData2, {withCredentials: true}).then(response => {
                    const {data} = response

                    setIsLoggedIn(true)
                    setDemoUser(data.user)
                    setLoginUserInput("")
                    setLoginPassInput("")
                    setRegUserInput("")
                    setRegPassInput("")

                })

                break

            case "regMode-btn":
                setIsRegMode(true)
                break
            case "back-login":
                setIsRegMode(false)
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
                    <LoginPage
                        data={{
                            handleClick: handleClick,
                            handleChange: handleChange,
                            loginUserInput: loginUserInput,
                            loginPassInput: loginPassInput,
                            regUserInput: regUserInput,
                            regPassInput: regPassInput,
                            isRegMode: isRegMode
                        }}
                    />
                ) : (
                    <Loading />
                )
            }
            
        </div>
    )
}

export default App