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
import loginFunc from "../logic/loginFunc"
import logOutFunc from "../logic/logOutFunc"
import registerFunc from "../logic/registerFunc"

import parameters from "../parameters/parameters"

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
            case "new-project-input": setNewProjectInput(value)
                break
            case "add-issue-title": setNewIssueTitleInput(value)
                break
            case "add-issue-text": setNewIssueTextInput(value)
                break
            case "add-issue-created": setNewIssueCreatedInput(value)
                break
            case "add-issue-assigned": setNewIssueAssignedInput(value)
                break
            case "add-issue-status-text": setNewIssueStatusInput(value)
                break
            case "search": setSearchInput(value)
                break
            case "idInput": setIdInput(value)
                break
            case "projectInput": setProjectInput(value)
                break
            case "open-close": setOpenOrClose(value)
                break
            case "login-username": setLoginUserInput(value)
                break
            case "login-password": setLoginPassInput(value)
                break
            case "register-username": setRegUserInput(value)
                break
            case "register-password": setRegPassInput(value)
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
                let moreDetailsFuncParams = parameters(variablesToExport, "moreDetailsFuncParams")
                !moreDetails && moreDetailsFunc(moreDetailsFuncParams, id)
                break
            case "close":
                let closeFuncparams = parameters(variablesToExport, "closeFuncparams")
                closeFunc(closeFuncparams)
                break
            case "add-project":
                let addProjectFuncparams = parameters(variablesToExport, "addProjectFuncparams")
                addProjectFunc(addProjectFuncparams)
                break
            case "submit-new-project":
                setIsLog(false)
                let submitNProjectFuncparams = parameters(variablesToExport, "submitNProjectFuncparams")
                submitNProjectFunc(submitNProjectFuncparams)
                break
            case "add-issue-button":
                let addIssueFuncparams = parameters(variablesToExport, "addIssueFuncparams")
                addIssueFunc(addIssueFuncparams)
                break
            case "submit-issue":
                let submitIssueFuncparams = parameters(variablesToExport, "submitIssueFuncparams")
                submitIssueFunc(submitIssueFuncparams)
                break
            case "issue-update-del":
                let issueUpdateDelFuncparams = parameters(variablesToExport, "issueUpdateDelFuncparams")
                issueUpdateDelFunc(issueUpdateDelFuncparams, id)
                break
            case "update":
                let updateFuncparams = parameters(variablesToExport, "updateFuncparams")
                updateFunc(updateFuncparams)
                break
            case "delete":
                setDeleteIssue(true)
                break
            case "surely-delete":
                let surelyDeleteFuncparams = parameters(variablesToExport, "surelyDeleteFuncparams")
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
                let simpleSearchFuncparams = parameters(variablesToExport, "simpleSearchFuncparams")
                simpleSearchFunc(simpleSearchFuncparams)
                break
            case "advanced-search":
                setAdvancedSearch(true)
                break
            case "avnaced-go":
                let advancedSearchFuncparams = parameters(variablesToExport, "advancedSearchFuncparams")
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

                let params = parameters(variablesToExport, "closeFuncparams")
                closeFunc(params)

                let myTicketsFuncParams = parameters(variablesToExport, "myTicketsFuncParams")
                myTicketsFunc(myTicketsFuncParams, id)
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
                let loginFuncParams = parameters(variablesToExport, "loginFuncParams")
                loginFunc(loginFuncParams)
                break
            case "logout":
                let logOutFuncParams = parameters(variablesToExport, "logOutFuncParams")
                logOutFunc(logOutFuncParams)
                break
            case "register":
                let registerFuncParams = parameters(variablesToExport, "registerFuncParams")
                registerFunc(registerFuncParams)
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

    const variablesToExport = {
        setIsRegMode,
        setRegPassInput,
        setRegUserInput,
        setLoginPassInput,
        setLoginUserInput,
        setDemoUser,
        setIsLoggedIn,
        setCount,
        setCopied,
        setIssueId,
        setOpenOrClose,
        setAdvancedSearch,
        setDeleteIssue,
        setUpdateIssue,
        setAddIssue,
        setAddProject,
        setMoreDetails,
        setIsLog,
        setIsSearchActive,
        setIsLoading,
        setProjectInput,
        setIdInput,
        setNewIssueStatusInput,
        setNewIssueAssignedInput,
        setNewIssueCreatedInput,
        setNewIssueTextInput,
        setNewIssueTitleInput,
        setSearchInput,
        setNewProjectInput,
        setSelectedIssue,
        setIssuesList,
        setSelectedProject,
        setProjects,
        projects,
        selectedProject,
        issuesList,
        selectedIssue,
        newProjectInput,
        searchInput,
        newIssueTitleInput,
        newIssueTextInput,
        newIssueCreatedInput,
        newIssueAssignedInput,
        newIssueStatusInput,
        idInput,
        projectInput,
        isLoading,
        isSearchActive,
        isLog,
        isRegMode,
        regPassInput,
        regUserInput,
        loginPassInput,
        loginUserInput,
        demoUser,
        isLoggedIn,
        count,
        copied,
        issueId,
        openOrClose,
        advancedSearch,
        deleteIssue,
        updateIssue,
        addIssue,
        addProject,
        moreDetails,
        BASE_URL,
        axios,
        swal,
        inputRemover,
        getList
    }

    return (
        <div>
            {
                !isLoading && isLoggedIn ? (


                    <div className="container">

                        <Navbar 
                            data={{
                                user: demoUser,
                                handleChange,
                                handleClick,
                                searchInput,
                                isSearchActive,
                                isLog
                            }}
                        />

                        <div className="main-part">

                            <Select
                                data={{
                                    handleClick,
                                    projects
                                }}
                            />

                            <div className="info-part">
                                {
                                    addProject && (

                                        <AddProject
                                            data={{
                                                handleClick,
                                                handleChange,
                                                newProjectInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    selectedProject && !isLog && (
                                        <AddIssBtn
                                            data={{
                                                handleClick,
                                                selectedProject
                                            }}
                                        />
                                    )
                                }
                                {
                                    addIssue && selectedProject && (
                                        <AddIssue
                                            data={{
                                                handleClick,
                                                handleChange,
                                                newIssueTitleInput,
                                                newIssueTextInput,
                                                newIssueCreatedInput,
                                                newIssueAssignedInput,
                                                newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    updateIssue && (
                                        <UpdateIssue
                                            data={{
                                                handleClick,
                                                handleChange,
                                                openOrClose,
                                                newIssueTitleInput,
                                                newIssueTextInput,
                                                newIssueCreatedInput,
                                                newIssueAssignedInput,
                                                newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    deleteIssue && (
                                        <DeleteIssue
                                            data={{
                                                handleClick
                                            }}
                                        />
                                    )
                                }
                                {
                                    advancedSearch && (
                                        <AdvancedSearch
                                            data={{
                                                handleChange,
                                                handleClick,
                                                openOrClose,
                                                projectInput,
                                                idInput,
                                                newIssueTitleInput,
                                                newIssueTextInput,
                                                newIssueCreatedInput,
                                                newIssueAssignedInput,
                                                newIssueStatusInput
                                            }}
                                        />
                                    )
                                }
                                {
                                    moreDetails && (
                                        <MoreDetails
                                            data={{
                                                handleClick,
                                                handleCopy,
                                                selectedIssue,
                                                copied,
                                                isLog
                                            }}
                                        />
                                    )
                                }

                                {
                                    isLog ? (

                                        <Log
                                            data={{
                                                issuesList,
                                                selectedProject,
                                                myProjects: projects,
                                                handleClick
                                            }}
                                        />

                                    ) : (

                                        <List
                                            data={{
                                                issuesList,
                                                selectedProject,
                                                handleClick
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
                            handleClick,
                            handleChange,
                            loginUserInput,
                            loginPassInput,
                            regUserInput,
                            regPassInput,
                            isRegMode
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