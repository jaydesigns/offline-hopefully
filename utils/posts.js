import { gql } from "@apollo/client"
import client from "../apolloClient"

export const getPostBySlug = (arg) => {
    const response = client.query({
        query: gql`
        {
            posts (where: {slug:"${arg}"}) {
            id
            body {
                text
            }
            categories {
                categoryName
                posts {
                    title
                    id
                }
            }
            coverImage
            slide {
                sliderImages
            }
            title
            }
        }`
    })
    return response
}

export const getPostList = () => {
    const list = client.query({
        query: gql`
        {
            posts {
            id
            slug
            body {
                text
            }
            categories {
                categoryName
                posts {
                    title
                    id
                }
            }
            coverImage
            slide {
                sliderImages
            }
            title
            }
        }`
    })
    return list
} 