import './App.css';
import { Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <main>
      <header>
        <h1>OctoFit Tracker</h1>
        <nav>
          <Link to="/users">Users</Link>
          <Link to="/teams">Teams</Link>
          <Link to="/activities">Activities</Link>
          <Link to="/leaderboard">Leaderboard</Link>
          <Link to="/workouts">Workouts</Link>
        </nav>
      </header>
      <section className="hero">
        <p>Use the links above to explore the OctoFit Tracker data from the Node.js API.</p>
        <p className="note">
          Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces API hosting.
        </p>
      </section>
      <Outlet />
    </main>
  );
}

export default App;
