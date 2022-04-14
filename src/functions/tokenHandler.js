
const TOKEN_PROPERTY_NAME = "loggedInUser"

const getToken = () => sessionStorage.getItem(TOKEN_PROPERTY_NAME)
const saveToken = token => sessionStorage.setItem(TOKEN_PROPERTY_NAME, token)

export { getToken, saveToken }