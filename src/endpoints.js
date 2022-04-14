const baseUrl = "https://react-rent.herokuapp.com"

const endpoints = {
    login: `${baseUrl}/api/login`,
    movies: `${baseUrl}/api/movie`,
    series: `${baseUrl}/api/serie`,
    videos: `${baseUrl}/api/data`
}

export { baseUrl, endpoints }