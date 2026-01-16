'use client'

import { ApolloClient, InMemoryCache, ApolloProvider as Provider, createHttpLink } from '@apollo/client'
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql', // URL do seu backend
})

const authLink = setContext((_, { headers }) => {
  // Obter token do localStorage apenas no cliente
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : ''
  
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
})

export function ApolloProvider({ children }: { children: React.ReactNode }) {
  return <Provider client={client}>{children}</Provider>
}