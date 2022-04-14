import React, { useEffect, useRef, useState } from "react"
import axios from "axios"

import PropTypes from "prop-types"

import MemoizedVideoCard from "./VideoCard/VideoCard"
import Loading from "components/Loading/Loading"

import { errorHandler, getToken } from "functions"
import { baseUrl, endpoints } from "endpoints"

import "./Videos.scss"
import Navbar from "./Navbar/Navbar"

/*
	320px — 480px: Mobile devices
	481px — 768px: iPads, Tablets
	769px — 1024px: Small screens, laptops
	1025px — 1200px: Desktops, large screens
	1201px and more —  Extra large screens, TV
*/

const CARD_WIDTH = 18 //rem
const CARD_HEIGHT = 12 //rem

const Videos = () => {

	const [loading, setLoading] = useState(false)
	const [cardContainerDimensions, setCardContainerDimensions] = useState({ width: 0, height: 0 })
	const videosFetchedRef = useRef(false)

	const [videos, setVideos] = useState([])
	const videosRef = useRef(videos)

	const [videosPerPage, setVideosPerPage] = useState([])
	const videosPerPageRef = useRef(videosPerPage)

	const [selectedPage, setSelectedPage] = useState(0)
	const selectedPageRef = useRef(selectedPage)

	const [selectedMovie, _setSelectedMovie] = useState(0)
	const selectedMovieRef = useRef(selectedMovie)

	const numberOfCardsPerRowRef = useRef(1)
	const numberOfCardRowsRef = useRef(1)

	const [numberOfVideosPerPage, setNumberOfVideosPerPage] = useState(1)
	const numberOfVideosPerPageRef = useRef(numberOfVideosPerPage)

	const splitVideosPerPage = (videosLength, numberOfVideosPerPage) => {
		const numberOfPages = Math.ceil(videosLength / numberOfVideosPerPage)
		const videoArrayOfArrays = []
		for (let page = 0; page < numberOfPages; page++) {
			const videoArray = videos.slice(page * numberOfVideosPerPage, (page * numberOfVideosPerPage) + numberOfVideosPerPage);
			videoArrayOfArrays.push(videoArray)
		}
		return videoArrayOfArrays
	}

	const setSelectedMovie = selectedMovie => {
		selectedMovieRef.current = selectedMovie
		_setSelectedMovie(selectedMovie)
	}

	const handleArrowRight = () => {
		if (selectedMovieRef.current < videosPerPageRef.current[selectedPageRef.current]?.length - 1) {
			setSelectedMovie(selectedMovieRef.current + 1)
		} else if (selectedPageRef.current < videosPerPageRef.current.length - 1) {
			setSelectedPage(page => page + 1)
			selectedPageRef.current = selectedPageRef.current + 1
			setSelectedMovie(0)
		} else {
			return
		}
	}

	const handleArrowLeft = () => {
		if (selectedMovieRef.current > 0) {
			setSelectedMovie(selectedMovieRef.current - 1)
		} else if (selectedPageRef.current > 0){
			setSelectedPage(page => page - 1)
			selectedPageRef.current = selectedPageRef.current -1
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

	const calculateVideoTableDimensions = (windowWidth, windowHeight) => {
		const numberOfCardsPerRow = selectNumberOfCardsPerRow(windowWidth)
		const numberOfCardRows = selectNumberOfCardRows(windowHeight)
		return [numberOfCardsPerRow, numberOfCardRows]
	}

	const calculateContainerDimensions = (numberOfCardsPerRow, numberOfCardRows) => {
		const containerWidth = CARD_WIDTH * numberOfCardsPerRow
		const containerHeight = CARD_HEIGHT * numberOfCardRows
		return [containerWidth, containerHeight]
	}

	const handleResize = () => {
		const windowWidth = window.innerWidth
		const windowHeight = window.innerHeight

		const [numberOfCardsPerRow, numberOfCardRows] = calculateVideoTableDimensions(windowWidth, windowHeight)
		const [containerWidth, containerHeight] = calculateContainerDimensions(numberOfCardsPerRow, numberOfCardRows)

		numberOfVideosPerPageRef.current = numberOfCardRows * numberOfCardsPerRow
		setNumberOfVideosPerPage(numberOfCardRows * numberOfCardsPerRow)

		if (numberOfCardsPerRow !== numberOfCardsPerRowRef.current || numberOfCardRows !== numberOfCardRowsRef.current) {
			numberOfCardsPerRowRef.current = numberOfCardsPerRow
			numberOfCardRowsRef.current = numberOfCardRows
			setCardContainerDimensions({ width: containerWidth, height: containerHeight })
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
			default:
				break
		}
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

			videosRef.current = videos
			setVideos(videos)

		} catch (error) {
			errorHandler(error)
		}
	}

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


	const initiateResizeObservation = () => {
		window.addEventListener("resize", handleResize)
		window.addEventListener("keydown", handleKeyDown)
		handleResize()
	}

	const destroyEventListeners = () => {
		window.removeEventListener("resize", handleResize)
		window.removeEventListener("keydown", handleKeyDown)
	}

	useEffect(() => {
		initiateResizeObservation()
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
		videosPerPageRef.current = videoGroups
		//eslint-disable-next-line
	}, [videos, numberOfVideosPerPage])

	useEffect(() => {
		if(videosPerPage.length <= selectedPage && videosPerPage.length > 0) {
			setSelectedPage(videosPerPage.length - 1)
		}
	//eslint-disable-next-line
	}, [videosPerPage])
	
	return (
		<div className="bg-primary min-vh-100">
			{
				loading
					?
					<Loading />
					:
					<>
						<Navbar selectedPage={selectedPage} setSelectedPage={setSelectedPage} pagesNumber={videosPerPage.length}/>
						<div className="d-flex justify-content-center">
							<div
								className="movies-container"
								style={{
									width: `calc(${cardContainerDimensions.width}rem  + 2px)`,
									height: `calc(${cardContainerDimensions.height}rem  + 2px)`
								}}
							>
								{
									videosPerPage[selectedPage]?.map((movie, index) => (
										<div
											key={`movie-card-${index}`}
											style={{ width: `${CARD_WIDTH}rem`, height: `${CARD_HEIGHT}rem` }}
											className="movie-card-container"
										>
											<MemoizedVideoCard
												//index={index}
												imageUrl={`${baseUrl}/${movie.logoSrc}`}
												selected={index === selectedMovie}
												setSelectedMovie={setSelectedMovie}
												//setSelectedPage={setSelectedPage}
												title={movie.title}
												type={movie.type}
											/>
										</div>
									))
								}
							</div>
						</div>
					</>

			}
		</div>
	)
}

Videos.propTypes = {}

export default Videos