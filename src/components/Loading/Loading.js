import React from "react"

import { CSpinner } from "@coreui/react"
import "./Loading.scss"

const Loading = () => (
    <div className="spinner-container">
        <div className="spinner-content text-light">
            <CSpinner className="d-block" color="light" />
            Loading...
        </div>
    </div>
)

export default Loading
