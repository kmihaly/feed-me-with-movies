import React from 'react'
import {
    CButton,
    CCard,
    CCardBody,
    CCardGroup,
    CCol,
    CContainer,
    CForm,
    CFormFeedback,
    CFormInput,
    CInputGroup,
    CInputGroupText,
    CRow,
    CSpinner
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'

const getLoginData = () => {
    const email = document.querySelector("#user-email").value
    const password = document.querySelector("#user-password").value
    return { email, password }
}

const Login = props => {

    const { errorMessage, loginLoading, loginUser, validated, setValidated } = props

    const handleLogin = () => {
        const { email, password } = getLoginData()
        loginUser(email, password)
    }

    const handleSubmit = () => {
        setValidated(true)
        handleLogin()
    }

    return (
        <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
            <CContainer>
                <CRow className="justify-content-center">
                    <CCol md={8}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm
                                        noValidate
                                        validated={validated}
                                    >
                                        <h1>Login</h1>
                                        <p className="text-medium-emphasis">Sign In to your account</p>
                                        <CInputGroup className="mb-3">
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                autoComplete="username"
                                                disabled={loginLoading}
                                                id="user-email"
                                                placeholder="Username"
                                                required
                                            />
                                            <CFormFeedback invalid>Please type a valid username</CFormFeedback>
                                        </CInputGroup>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                autoComplete="current-password"
                                                disabled={loginLoading}
                                                id="user-password"
                                                placeholder="Password"
                                                required
                                                type="password"
                                            />
                                            <CFormFeedback invalid>Please type a valid password</CFormFeedback>
                                        </CInputGroup>
                                        <CRow>
                                            <CCol xs={6}>
                                                <CButton color="primary" className="px-4" onClick={handleSubmit} >
                                                    {
                                                        loginLoading &&
                                                        <>
                                                            <CSpinner component="span" size="sm" variant="grow" aria-hidden="true" />{" "}
                                                        </>
                                                    }
                                                    Login
                                                </CButton>
                                            </CCol>
                                        </CRow>
                                        <CRow>
                                            <CCol>
                                                <div className={errorMessage ? "is-invalid" : ""}></div>
                                                <CFormFeedback className={errorMessage ? "invalid-feedback" : ""}>{errorMessage}</CFormFeedback>
                                            </CCol>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                            <CCard className="text-white bg-primary py-5" style={{ width: '44%' }}>
                                <CCardBody className="text-center">
                                    <div>
                                        <h2>Feed me with movies</h2>
                                        <p>
                                            This site offers you the opportunity to browse and find your favorite videos & movies, then watch them. In order to do any of these, please log in.
                                        </p>
                                    </div>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login
