import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Home from '../src/pages/Home.jsx';
import Quiz from '../src/pages/Quiz.jsx';
import Leaderboard from '../src/pages/Leaderboard.jsx';
import Signup from '../src/pages/signup';
import Login from '../src/pages/login';
import Categories from './pages/Category'
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
        <Route path="/highscores" element={<Leaderboard />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/categories" element={<Categories />} />
      </Routes>
    </div>
    </ApolloProvider>
  );
}

export default App;