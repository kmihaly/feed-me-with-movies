import React from "react"
import { CSpinner } from "@coreui/react"
import PropTypes from "prop-types"

import "./Loading.scss"

const Loading = props => {

    const { color = "light" } = props

    return (
        <div className="spinner-container" >
            <div className="spinner-content text-light">
                <CSpinner className="d-block" color={color} />
                Loading...
            </div>
        </div >
    )
}

Loading.propTypes = {
    color: PropTypes.string
}

export default Loading
