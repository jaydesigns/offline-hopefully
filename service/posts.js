import axios from 'axios'

const baseURL = 'https://salty-waters-71699.herokuapp.com/api/posts?populate=*'
// const baseURL = 'http://localhost:1337/api/posts?populate=*'

const getAll = async () => {
    const request = await axios.get(baseURL)
    console.log(request);
    return request.data
}

export default getAll