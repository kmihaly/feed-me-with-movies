import React from 'react'
import {
    CModal,
    CModalBody,
    CModalFooter,
    CModalHeader,
    CModalTitle
} from "@coreui/react"
import PropTypes from 'prop-types'

import Loading from 'components/Loading/Loading'
import { baseUrl } from 'endpoints'

import "./VideoTV.scss"

const VideoTV = props => {

    const { data, setVisible, visible } = props

    return (
        <CModal size="xl" visible={visible} onClose={() => setVisible(false)}>
            {
                data
                    ?
                    <>
                        <CModalHeader onClose={() => setVisible(false)}>
                            <CModalTitle>{data.title}</CModalTitle>
                        </CModalHeader>
                        <CModalBody>
                            <div className='media-container'>
                                <img width="320" src={`${baseUrl}/${data.logoSrc}`} alt={data.title}></img>
                                <video width="320" controls>
                                    {/* height="240" */}
                                    <source src={data.videoSrc} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            </div>
                            <p>{data.description}</p>
                        </CModalBody>
                        <CModalFooter>
                            <div className="video-data">
                                <p>IMDb: {data.rating}</p>
                                <p>{data.genre}</p>
                                <p>{data.length}</p>
                            </div>
                        </CModalFooter>
                    </>
                    :
                    <Loading color="primary" />
            }
        </CModal>
    )
}

VideoTV.propTypes = {
    data: PropTypes.shape({
        title: PropTypes.string,
        logoSrc: PropTypes.string,
        videoSrc: PropTypes.string,
        description: PropTypes.string,
        rating: PropTypes.number,
        genre: PropTypes.string,
        length: PropTypes.string
    }),
    setVisible: PropTypes.func.isRequired,
    visible: PropTypes.bool
}

export default VideoTV