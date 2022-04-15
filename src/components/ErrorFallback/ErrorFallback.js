import React from 'react'
import { CAlert, CButton } from '@coreui/react'
import PropTypes from 'prop-types'

const ErrorFallback = ({ error, resetErrorBoundary }) => {
    return (
        <CAlert color="danger">
            <p>Something went wrong:</p>
            <pre>{error.message}</pre>
            <CButton color="primary" onClick={resetErrorBoundary}>Try again</CButton>
        </CAlert>
    )
}

ErrorFallback.propTypes = {
    error: PropTypes.shape({
        message: PropTypes.string.isRequired
    }),
    resetErrorBoundary: PropTypes.func.isRequired
}

export default ErrorFallback