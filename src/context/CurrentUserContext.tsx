import React, { createContext, ReactNode, useContext, useState } from 'react'

type Props = {
    children: ReactNode
}

type UserContextType = {
    userName: string
    userPassword: string
    logIn: (userName: string, userPassword: string) => void
    setUserNameLocal: (username: string) => void
    logOut: () => void
    token: string
    setUserToken: (token: string) => void
    isEdit: boolean
    setEditOpen: () => void
    setEditClose: () => void
}
const currentUserContext = createContext({} as UserContextType)

export const useCurrentUser = () => {
    return useContext(currentUserContext)
}

const CurrentUserContextProvider = ({ children }: Props) => {
    const [token, setToken] = useState('')
    const [userName, setUserName] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const setUserToken = (token: string) => {
        setToken(token)
    }

    const logIn = (userName: string, userPassword: string) => {
        setUserName(userName)
        setUserPassword(userPassword)
    }

    const logOut = () => {
        setUserName('')
        setUserPassword('')
        setToken('')
        window.localStorage.clear()
    }
    const setUserNameLocal = (username: string) => [
        setUserName(username)
    ]
    const setEditOpen = () => {
        setIsEdit(true)
    }
    const setEditClose = () => {
        setIsEdit(false)
    }

    return (
        <currentUserContext.Provider value={{
            userName,
            userPassword,
            token,
            logIn,
            logOut,
            setUserToken,
            setUserNameLocal,
            isEdit,
            setEditOpen,
            setEditClose
        }}>
            {children}
        </currentUserContext.Provider>
    )
}

export default CurrentUserContextProvider