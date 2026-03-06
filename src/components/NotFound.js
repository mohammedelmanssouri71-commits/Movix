import notfound from '../assets/space.png';

export default function NotFound() {
  return (
    <div className="notfound-container">
      <img src={notfound} alt="not-found" />
      <p>This page doesn't exist!</p>
    </div>
  );
}
