import App from './App'
import React from 'react'
import ReactDOM from 'react-dom'
import { ApolloClient } from 'apollo-client'
import { ApolloProvider } from 'react-apollo'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'

const client = new ApolloClient({
  link: new HttpLink({ uri: 'https://metaphysics-staging.artsy.net' }),
  cache: new InMemoryCache()
})

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
