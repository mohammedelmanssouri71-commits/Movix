import {Routes, Route} from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MovieDetails from './components/MovieDetails';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path='/movies' element={<MoviesList/>}/>
        <Route path='/movies-details/:id' element={<MovieDetails/>}/>
      </Routes>
    </div>
  );
}

export default App;
