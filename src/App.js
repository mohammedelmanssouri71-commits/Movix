import {Routes, Route} from 'react-router-dom';
import './App.css';
import { useSelector } from 'react-redux';
import MoviesList from './components/MoviesList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MovieDetails from './components/MovieDetails';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FavoriteList from './components/FavoritesList';
import TvShowsList from './components/TvShowsList';
import Dashboard from './components/Dashboard';
import TvShowDetails from './components/TvShowDetails';
import SearchResults from './components/SearchResults';
import PersonDetails from './components/PersonDetails';
import PopularPersons from './components/PopularPersons';
import Photos from './components/Photos';
import Settings from './components/Settings';
import { UserContext } from './contexts/UserContext';
import { authFetch, clearAuthSession, USER_ID_KEY } from './utils/auth';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import NotFound from './components/NotFound';
import Alert from './components/Alert';


function App() {
  const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;
  const [user, setUser] = useState(null);
  const alert = useSelector(state => state.alert);

  const navigate = useNavigate();
  useEffect(() => {
    const userId = localStorage.getItem(USER_ID_KEY);
    if (userId){
      authFetch(`${JSON_API_URL}/users/${userId}`)
      .then(res => res.json())
      .then(data => {
        if (data?.id) {
          setUser(data);
          return;
        }

        clearAuthSession();
        navigate("/login");
      })
      .catch(() => {
        clearAuthSession();
        navigate("/login");
      })
    }else{
      navigate("/movies");
    }
  },[])



  return (
    <UserContext.Provider value={{user, setUser}}>
      <div className="App">
      <Navbar/>
      <Sidebar/>
      <main>
        {alert.visible && <Alert alert={alert}/>}
        <Routes>
          <Route path='/' element={<Dashboard/>}/>
          <Route path='/movies' element={<MoviesList/>}/>
          <Route path='/movie-details/:id' element={<MovieDetails/>}/>
          <Route path='/favorites' element={<FavoriteList/>}/>
          <Route path='/tv-shows' element={<TvShowsList/>}/>
          <Route path='/tv-details/:id' element={<TvShowDetails/>}/>
          <Route path='/search/:query' element={<SearchResults/>}/>
          <Route path='/persons' element={<PopularPersons/>}/>
          <Route path='/person-details/:personId' element={<PersonDetails/>}/>
          <Route path='/media-photos/:mediaType/:mediaId' element={<Photos/>}/>
          <Route path='/settings' element={<Settings user={user}/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path='/login' element={<Login/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
      </main>
    </div>
    </UserContext.Provider>
  );
}

export default App;
