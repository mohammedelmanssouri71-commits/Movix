import {Routes, Route} from 'react-router-dom';
import './App.css';
import MoviesList from './components/MoviesList';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import MovieDetails from './components/MovieDetails';
import { useEffect, useRef, useState } from 'react';

function App() {
  const userRef = useRef();
  const roleRef = useRef();
  const btnEdit = useRef();
  const btnDelete = useRef();
  const [users, setUsers] = useState([]);
  const [action, setAction] = useState("Add");
  useEffect(() => {
    fetch("http://localhost:3001/users")
      .then(res => res.json())             
      .then(data => {
        setUsers(data);
      })
  },[])

  const usersList = users.map(u => {
    return (
      <tr>
        <td>{u.username}</td>
        <td>{u.role}</td>
        <td>
        <button onClick={() =>{
          userRef.current.focus();
          setAction("Edit");
        } 
          
        } ref={btnEdit}>Edit</button>
          <button onClick={() => handleDelete(u.id)} ref={btnDelete}>Delete</button>
        </td>
      </tr>
    )
  })

  function handleDelete(id){
    fetch(`http://localhost:3001/users/${id}`, { 
      method: "DELETE"
    })
      .then(() => {
        console.log("Delete a user");
        setUsers(prev => prev.filter(u => u.id !== id));
      })
      .catch(err => console.error(err));
  }

  function handleAdd(e){
    e.preventDefault();
    const user = {
      username: userRef.current.value,
      role: roleRef.current.value
    };

    fetch("http://localhost:3001/users", {
      method: "POST",              
      headers: {
        "Content-Type": "application/json"  
      },
      body: JSON.stringify(user)    
    })
      .then(res => res.json())             
      .then(data => {
        console.log("User added :", data);
        setUsers([...users, user]);
        userRef.current.value = '';
        roleRef.current.value = 'Admin';
      })
      .catch(err => console.error(err));
  }
  return (
    <div className="App">
      <Navbar/>
      <Sidebar/>
      <Routes>
        <Route path='/movies' element={<MoviesList/>}/>
        <Route path='/movies-details/:id' element={<MovieDetails/>}/>
      </Routes>
      <form onSubmit={handleAdd}>
        <input type='text' placeholder='username' ref={userRef}/>
        <select ref={roleRef}>
          <option value={'Admin'}>Admin</option>
          <option value={'Super Admin'}>Super Admin</option>
          <option value={'User'}>User</option>
        </select>
        <button>Add user</button>
      </form>
      <table>
        <tr>
          <th>Username</th>
          <th>Role</th>
          <th>Actions</th>
        </tr>
        {usersList}
      </table>
    </div>
  );
}

export default App;
