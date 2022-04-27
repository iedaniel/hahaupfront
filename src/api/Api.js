import axios from 'axios'

const Api = (authorize) => {
    var headers = {}
    if (authorize === true) {
        headers = {
            'authorization': localStorage.getItem("auth_token")
        }
    }
    return axios.create({
        baseURL: "http://192.168.1.4:8080",
        headers: headers
    })
}

export default Api