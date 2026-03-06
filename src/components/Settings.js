import { useEffect, useRef, useState } from "react";
import axios from "axios";
import "./settings.css";
import { UserContext } from "../contexts/UserContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";
import { useDispatch } from "react-redux";
import { show, hide } from "../slices/alertSlice";

export default function Settings() {
  const API_KEY = process.env.REACT_APP_API_KEY;
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const JSON_API_URL = process.env.REACT_APP_JSON_API_URL;

  const [tvGenres, setTvGenres] = useState([]);
  const [mvGenres, setMvGenres] = useState([]);
  const {user, setUser} = useContext(UserContext);

  const navigate = useNavigate();
  const [mvPreferences, setMvPreferences] = useState([]);
  const [tvPreferences, setTvPreferences] = useState([]);

  const nameRef = useRef();
  const userRef = useRef();
  const imageRef = useRef();

  const dispatch = useDispatch();

  useEffect(() => {
    if (user === null) {
      navigate("/movies");
    }
  },[user, navigate])

  useEffect(() => {
    if(user){
      setMvPreferences(user.preferences.movie);
      setTvPreferences(user.preferences.tv);
    }
  },[user])

  useEffect(() => {
    axios
      .get(`${BASE_URL}/genre/movie/list`, { params: { api_key: API_KEY } })
      .then((res) => setMvGenres(res.data.genres));
  }, []);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/genre/tv/list`, { params: { api_key: API_KEY } })
      .then((res) => setTvGenres(res.data.genres));
  }, []);

  if (!user) return <Loader/>;

  function handleChangeMv(e){
    const value = Number( e.target.value);
    if(mvPreferences.includes(value)){
      setMvPreferences(mvPreferences.filter(p => p !== value));
    }else{
      setMvPreferences([...mvPreferences, value]);
    }
  }

  function handleChangeTv(e){
    const value = Number( e.target.value);
    if(tvPreferences.includes(value)){
      setTvPreferences(tvPreferences.filter(p => p !== value));
    }else{
      setTvPreferences([...tvPreferences, value]);
    }
  }

  function handleSaveInfos(e){
    e.preventDefault();
    axios.patch(`${JSON_API_URL}/users/${user.id}`, {
      image: imageRef.current.value === "" ? "https://i.pinimg.com/736x/3c/ae/07/3cae079ca0b9e55ec6bfc1b358c9b1e2.jpg" : imageRef.current.value,
      fullName: nameRef.current.value
    })
    .then(res => setUser(res.data));
    dispatch(show({type: "success", message: "Your changes are saved!"}))
    setTimeout(() => {
      dispatch(hide());
    },2500)
  }

  function handleSave(e){
    e.preventDefault();
    axios.patch(`${JSON_API_URL}/users/${user.id}`, {
      preferences: {
        "tv" : tvPreferences,
        "movie" : mvPreferences
      }
    })
    .then(res => setUser(res.data));
    dispatch(show({type: "success", message: "Your changes are saved!"}))
    setTimeout(() => {
      dispatch(hide());
    },2500)
  }
  return (
    <div className="settings-container">
      {/* Personal Infos */}
      <div className="settings-card">
        <h2>Personal Infos</h2>

        <div className="user-info">
          <img src={user.image} alt="User" />

          <form onSubmit={handleSaveInfos}>
            <div>
              <div className="form-group">
                <label>Full Name</label>
                <input type="text" defaultValue={user.fullName} ref={nameRef} required/>
              </div>

              <div className="form-group">
                <label>Username</label>
                <input
                  type="text"
                  defaultValue={user.username}
                  ref={userRef}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label>Photo</label>
                <input type="url" defaultValue={user.image} ref={imageRef} />
              </div>
            </div>

            <button>Save Changes</button>
          </form>
        </div>
      </div>


      {/* Preferences */}
      <div className="settings-card">
        <h2>Preferences</h2>

        <form onSubmit={handleSave} className="preferences-form">
          {/* Movies */}
          <div className="preferences-section">
            <h3>🎬 Movies</h3>
            <div className="genres-grid">
              {mvGenres.map((g) => (
                <label key={g.id} className="genre-item">
                  <input
                    type="checkbox"
                    value={g.id}
                    checked={mvPreferences.includes(g.id)}
                    onChange={handleChangeMv}
                  />
                  <span>{g.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* TV */}
          <div className="preferences-section">
            <h3>📺 TV Shows</h3>
            <div className="genres-grid">
              {tvGenres.map((g) => (
                <label key={g.id} className="genre-item">
                  <input
                    type="checkbox"
                    value={g.id}
                    checked={tvPreferences.includes(g.id)}
                    onChange={handleChangeTv}
                  />
                  <span>{g.name}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="save-btn">Save Preferences</button>
        </form>
      </div>

    </div>
  );
}
