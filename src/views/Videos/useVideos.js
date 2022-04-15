import { useEffect, useRef, useState } from 'react'
import axios from "axios"

import { errorHandler, getToken } from "functions"
import { endpoints } from "endpoints"
import useNavigation from './useNavigation'
import useVideoCardTable from './useVideoCardTable'

const CARD_WIDTH = 18 //rem
const CARD_HEIGHT = 12 //rem

const useVideos = () => {

    const [loading, setLoading] = useState(false)
    const videosFetchedRef = useRef(false)

    const [videos, _setVideos] = useState([])
    const videosRef = useRef(videos)

    const [videosPerPage, _setVideosPerPage] = useState([])
    const videosPerPageRef = useRef(videosPerPage)

    const {
        cardContainerDimensions,
        handleResize,
        numberOfCardsPerRowRef,
        numberOfVideosPerPage
    } = useVideoCardTable({ CARD_HEIGHT, CARD_WIDTH })

    const {
        handleEnter,
        handleKeyDown,
        selectedMovie,
        selectedPage,
        selectedPageRef,
        selectedVideoData,
        setSelectedMovie,
        setSelectedPage,
        setVideoTvVisible,
        videoTvVisible
    } = useNavigation({
        numberOfCardsPerRowRef,
        videosPerPageRef
    })



    const splitVideosPerPage = (videosLength, numberOfVideosPerPage) => {
        const numberOfPages = Math.ceil(videosLength / numberOfVideosPerPage)
        const videoArrayOfArrays = []
        for (let page = 0; page < numberOfPages; page++) {
            const videoArray = videos.slice(page * numberOfVideosPerPage, (page * numberOfVideosPerPage) + numberOfVideosPerPage);
            videoArrayOfArrays.push(videoArray)
        }
        return videoArrayOfArrays
    }

    const setVideos = videos => {
        videosRef.current = videos
        _setVideos(videos)
    }

    const setVideosPerPage = videoArrayOfArrays => {
        videosPerPageRef.current = videoArrayOfArrays
        _setVideosPerPage(videoArrayOfArrays)
    }

    const fetchVideos = async (token, url) => {
        const resp = await axios.get(url, { headers: { "X-SimpleOvpApi": token } })

        if (resp.status === 200 && resp?.data?.items) {
            return resp.data.items
        }
    }

    const saveVideos = async () => {

        const token = getToken()

        try {
            setLoading(true)
            const [movies, series] = await Promise.all([fetchVideos(token, endpoints.movies), fetchVideos(token, endpoints.series)])
            setLoading(false)

            const videos = [...movies, ...series]
            videos.sort((a, b) => (a.title > b.title) ? 1 : -1)

            setVideos(videos)

        } catch (error) {
            errorHandler(error)
        }
    }

    const initializeComponent = () => {
        window.addEventListener("resize", handleResize)
        window.addEventListener("keydown", handleKeyDown)
        handleResize()
    }

    const destroyEventListeners = () => {
        window.removeEventListener("resize", handleResize)
        window.removeEventListener("keydown", handleKeyDown)
    }

    useEffect(() => {
        initializeComponent()
        return destroyEventListeners
        //eslint-disable-next-line
    }, [])

    useEffect(() => {
        if (!videosFetchedRef.current) {
            videosFetchedRef.current = true
            saveVideos()
        }
        //eslint-disable-next-line
    }, [cardContainerDimensions])

    useEffect(() => {
        const videoGroups = splitVideosPerPage(videos.length, numberOfVideosPerPage)
        setVideosPerPage(videoGroups)
        //eslint-disable-next-line
    }, [videos, numberOfVideosPerPage])

    useEffect(() => {
        if (videosPerPage.length <= selectedPageRef.current && videosPerPage.length > 0) {
            setSelectedPage(videosPerPage.length - 1)
        }
        //eslint-disable-next-line
    }, [videosPerPage])

    return ({
        CARD_HEIGHT,
        CARD_WIDTH,
        cardContainerDimensions,
        handleEnter,
        loading,
        selectedMovie,
        selectedPage,
        selectedVideoData,
        setSelectedMovie,
        setSelectedPage,
        setVideoTvVisible,
        videoTvVisible,
        videosPerPage
    })
}

export default useVideos
