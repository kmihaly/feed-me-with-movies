import React from "react"
import PropTypes from "prop-types"
import {
    CCard,
    CCardBody,
    CCardImage,
    CCardTitle,
} from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilMovie, cilTv } from '@coreui/icons'

import "./VideoCard.scss"

const VideoCard = props => {

    const { imageUrl, selected, title, type } = props

    return (
        <div className="movie-card">
            <CCard className={`movie-card__content ${selected ? "selected" : ""}`}>
                <CCardImage orientation="top" src={imageUrl} className="movie-card__content--image" />
                <CCardBody>
                    <CCardTitle className="movie-card__content--title" title={title}>
                        {
                            type === "serie" &&
                            <>
                                <CIcon icon={cilTv} title={type} />
                                {" "}
                            </>
                        }
                        {
                            type === "movie" &&
                            <>
                                <CIcon icon={cilMovie} title={type} />
                                {" "}
                            </>
                        }
                        {title}
                    </CCardTitle>
                </CCardBody>
            </CCard>
        </div>
    )
}

VideoCard.propTypes = {}

const MemoizedVideoCard = React.memo(VideoCard)
export default MemoizedVideoCard
