import { ApolloClient,InMemoryCache } from "@apollo/client"

const client = new ApolloClient({
    uri: "https://api-us-west-2.hygraph.com/v2/clhk29rgq3fl601ungewp9b8b/master",
    cache: new InMemoryCache(),
})

export default client;