import { useRef, useState } from "react"


const selectNumberOfCardsPerRow = windowWidth => {
    if (windowWidth <= 480) { return 1 }
    if (windowWidth <= 768) { return 1 }
    if (windowWidth <= 1024) { return 2 }
    if (windowWidth <= 1200) { return 3 }
    if (windowWidth <= 1600) { return 4 }
    return 5
}

const selectNumberOfCardRows = windowHeight => {
    if (windowHeight <= 500) { return 1 }
    if (windowHeight <= 700) { return 2 }
    if (windowHeight <= 900) { return 3 }
    return 4
}

const calculateVideoTableDimensions = (windowWidth, windowHeight) => {
    const numberOfCardsPerRow = selectNumberOfCardsPerRow(windowWidth)
    const numberOfCardRows = selectNumberOfCardRows(windowHeight)
    return [numberOfCardsPerRow, numberOfCardRows]
}

const calculateContainerDimensions = (CARD_WIDTH, CARD_HEIGHT, numberOfCardsPerRow, numberOfCardRows) => {
    const containerWidth = CARD_WIDTH * numberOfCardsPerRow
    const containerHeight = CARD_HEIGHT * numberOfCardRows
    return [containerWidth, containerHeight]
}

const useVideoCardTable = props => {

    const {
        CARD_WIDTH,
        CARD_HEIGHT,
    } = props

    const [cardContainerDimensions, setCardContainerDimensions] = useState({ width: 0, height: 0 })

    const [numberOfVideosPerPage, _setNumberOfVideosPerPage] = useState(1)
    const numberOfVideosPerPageRef = useRef(numberOfVideosPerPage)

    const numberOfCardsPerRowRef = useRef(1)
    const numberOfCardRowsRef = useRef(1)

    const setNumberOfVideosPerPage = numberOfVideosPerPage => {
        numberOfVideosPerPageRef.current = numberOfVideosPerPage
        _setNumberOfVideosPerPage(numberOfVideosPerPage)
    }

    const handleResize = () => {
        const windowWidth = window.innerWidth
        const windowHeight = window.innerHeight

        const [numberOfCardsPerRow, numberOfCardRows] = calculateVideoTableDimensions(windowWidth, windowHeight)
        const [containerWidth, containerHeight] = calculateContainerDimensions(CARD_WIDTH, CARD_HEIGHT, numberOfCardsPerRow, numberOfCardRows)

        setNumberOfVideosPerPage(numberOfCardRows * numberOfCardsPerRow)

        if (numberOfCardsPerRow !== numberOfCardsPerRowRef.current || numberOfCardRows !== numberOfCardRowsRef.current) {
            numberOfCardsPerRowRef.current = numberOfCardsPerRow
            numberOfCardRowsRef.current = numberOfCardRows
            setCardContainerDimensions({ width: containerWidth, height: containerHeight })
        }
    }

    return ({
        cardContainerDimensions,
        handleResize,
        numberOfCardsPerRowRef,
        numberOfVideosPerPage
    })
}

export default useVideoCardTable