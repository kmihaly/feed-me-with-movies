import React from "react"
import {
    CCard,
    CCardBody,
    CCardImage,
    CCardTitle,
} from "@coreui/react"
import CIcon from '@coreui/icons-react'
import { cilMovie, cilTv } from '@coreui/icons'
import PropTypes from "prop-types"

import "./VideoCard.scss"

const VideoCard = props => {

    const { imageUrl, selected, title, type } = props

    const id = type + title.substring(0,8).replace(/ /g, "")

    return (
        <div className="movie-card" id={id}>
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

VideoCard.propTypes = {
    imageUrl: PropTypes.string.isRequired,
    selected: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
}

const MemoizedVideoCard = React.memo(VideoCard)
export default MemoizedVideoCard
