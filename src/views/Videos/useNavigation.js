import { useRef, useState } from "react"

const useNavigation = props => {

    const {
        numberOfCardsPerRowRef,
        videosPerPageRef
    } = props

    const [selectedVideoData, setSelectedVideoData] = useState(null)
    const [videoTvVisible, setVideoTvVisible] = useState(false)

    const [selectedPage, _setSelectedPage] = useState(0)
    const selectedPageRef = useRef(selectedPage)

    const [selectedMovie, _setSelectedMovie] = useState(0)
    const selectedMovieRef = useRef(selectedMovie)

    const setSelectedMovie = selectedMovie => {
        selectedMovieRef.current = selectedMovie
        _setSelectedMovie(selectedMovie)
    }

    const setSelectedPage = selectedPage => {
        selectedPageRef.current = selectedPage
        _setSelectedPage(selectedPage)
    }

    const findVideoData = () => videosPerPageRef.current[selectedPageRef.current][selectedMovieRef.current]

    const handleEnter = () => {
        const videoData = findVideoData()
        setSelectedVideoData(videoData)
        setVideoTvVisible(true)
    }

    const handleArrowRight = () => {
        if (selectedMovieRef.current < videosPerPageRef.current[selectedPageRef.current]?.length - 1) {
            setSelectedMovie(selectedMovieRef.current + 1)
        } else if (selectedPageRef.current < videosPerPageRef.current.length - 1) {
            setSelectedPage(selectedPageRef.current + 1)
            setSelectedMovie(0)
        } else {
            return
        }
    }

    const handleArrowLeft = () => {
        if (selectedMovieRef.current > 0) {
            setSelectedMovie(selectedMovieRef.current - 1)
        } else if (selectedPageRef.current > 0) {
            setSelectedPage(selectedPageRef.current - 1)
            setSelectedMovie(videosPerPageRef.current[selectedPageRef.current].length - 1)
        } else {
            return
        }
    }

    const handleArrowUp = () => {
        if (selectedMovieRef.current - numberOfCardsPerRowRef.current >= 0) {
            setSelectedMovie(selectedMovieRef.current - numberOfCardsPerRowRef.current)
        }
    }

    const handleArrowDown = () => {
        if (selectedMovieRef.current + numberOfCardsPerRowRef.current < videosPerPageRef.current[selectedPageRef.current]?.length) {
            setSelectedMovie(selectedMovieRef.current + numberOfCardsPerRowRef.current)
        }
    }

    const handleKeyDown = keyboardEvent => {
        switch (keyboardEvent.key) {
            case "ArrowRight":
                handleArrowRight()
                break
            case "ArrowLeft":
                handleArrowLeft()
                break
            case "ArrowUp":
                handleArrowUp()
                break
            case "ArrowDown":
                handleArrowDown()
                break
            case "Enter":
                handleEnter()
                break
            default:
                break
        }
    }

    return ({
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
    })
}

export default useNavigation
