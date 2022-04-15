import React from "react"

import Loading from "components/Loading/Loading"
import MemoizedVideoCard from "./VideoCard/VideoCard"
import Navbar from "./Navbar/Navbar"
import VideoTV from "./VideoTV/VideoTV"

import { baseUrl } from "endpoints"
import useVideos from "./useVideos"

import "./Videos.scss"


const Videos = () => {

	const {
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
	} = useVideos()

	return (
		<div className="bg-secondary min-vh-100">
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
											onMouseEnter={() => setSelectedMovie(index)}
											onClick={() => handleEnter()}
										>
											<MemoizedVideoCard
												imageUrl={`${baseUrl}/${movie.logoSrc}`}
												selected={index === selectedMovie}
												title={movie.title}
												type={movie.type}
											/>
										</div>
									))
								}
							</div>
						</div>
						<VideoTV visible={videoTvVisible} setVisible={setVideoTvVisible} data={selectedVideoData}/>
					</>
			}
		</div>
	)
}

export default Videos