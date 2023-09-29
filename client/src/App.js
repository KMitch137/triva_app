

import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from '../src/pages/homepage';
import Quiz from '../src/pages/quizpage';
import Highscores from '../src/pages/highscores';
import Signup from '../src/pages/signup';
import Login from '../src/pages/login';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'

const httpLink = createHttpLink({
  uri: '/graphql'
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');

  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ``,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/highscores" element={<Highscores />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </div>
    </ApolloProvider>
  );
}

export default App;