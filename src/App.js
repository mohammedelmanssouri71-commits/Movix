import {Routes, Route} from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MovieDetails from './components/MovieDetails';
import { useEffect, useRef, useState } from 'react';
import FavoriteList from './components/FavoritesList';
import TvShowsList from './components/TvShowsList';
import Dashboard from './components/Dashboard';
import TvShowDetails from './components/TvShowDetails';
import SearchResults from './components/SearchResults';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
      <main>
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/movies' element={<MoviesList/>}/>
          <Route path='/movies-details/:id' element={<MovieDetails/>}/>
          <Route path='/favorites' element={<FavoriteList/>}/>
          <Route path='/tv-shows' element={<TvShowsList/>}/>
          <Route path='/tv-details/:id' element={<TvShowDetails/>}/>
          <Route path='search/:query' element={<SearchResults/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;
