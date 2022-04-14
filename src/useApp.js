import { useState } from "react"
import { useNavigate } from "react-router-dom";
import axios from 'axios';

import { errorHandler, getToken, saveToken } from "functions"
import { endpoints } from "endpoints"


export const useApp = () => {

    const [errorMessage, setErrorMessage] = useState("")
    const [validated, setValidated] = useState(false)
    const [loginLoading, setLoginLoading] = useState(false)

    let navigate = useNavigate()

    const letUserIn = () => navigate("/movies")

    const clearLoginFields = () => {
        document.querySelector("#user-email").value = ""
        document.querySelector("#user-password").value = ""
        setValidated(false)
    }

    const refuseLoggingIn = (error) => {
        clearLoginFields()
        setErrorMessage("Your username and/or password were invalid")
        errorHandler(error)
    }

    const isTokenSaved = () => Boolean(getToken())

    const loginUser = async (email, password) => {
        if (email && password) {

            if (isTokenSaved()) {
                setErrorMessage("You are already logged in")
                clearLoginFields()
                return
            }

            try {
                setLoginLoading(true)
                const resp = await axios.post(endpoints.login, { email, password })
                setLoginLoading(false)
                if (resp.status === 200 && resp?.headers?.["x-simpleovpapi"]) {
                    const token = resp.headers["x-simpleovpapi"]
                    saveToken(token)
                    letUserIn()
                    return
                }
            } catch (error) {
                setLoginLoading(false)
                refuseLoggingIn(error)
                return
            }
        }
    }

    return {
        errorMessage,
        isTokenSaved,
        loginLoading,
        loginUser,
        setValidated,
        validated
    }
}

export default useApp
