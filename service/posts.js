import axios from 'axios'

// const baseURL = 'https://salty-waters-71699.herokuapp.com/api/posts?populate=*'
const baseURL = 'http://localhost:1337/api/posts?populate=*'

const getAll = async() => {
    try{
        const request = await axios(baseURL).then(res=>res)
        return request.data
    } catch(err){
        console.log(err);
    }
}

export default getAll