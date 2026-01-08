import {Routes, Route} from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
      <MoviesList/>
      <Routes>
        <Route path='/movies' element={<MoviesList/>}/>
      </Routes>
    </div>
  );
}

export default App;
