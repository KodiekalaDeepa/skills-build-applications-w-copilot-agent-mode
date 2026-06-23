import { useEffect, useState } from 'react';
import { API_HOST, normalizeResponseArray } from '../api';

interface Workout {
  _id: string;
  title: string;
  description: string;
  durationMin: number;
  intensity: string;
  createdBy?: { name?: string };
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState<Workout[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API_HOST}/api/workouts/`);
        const data = await response.json();
        setWorkouts(normalizeResponseArray<Workout>(data, 'workouts'));
      } catch (err) {
        setError('Unable to load workouts.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section>
      <h2>Workouts</h2>
      {loading && <p>Loading workouts…</p>}
      {error && <p className="error">{error}</p>}
      {workouts.length === 0 && !loading && <p>No workouts found.</p>}
      <div className="grid">
        {workouts.map((workout) => (
          <article key={workout._id} className="card">
            <h3>{workout.title}</h3>
            <p>{workout.description}</p>
            <p>Duration: {workout.durationMin} min</p>
            <p>Intensity: {workout.intensity}</p>
            <p>Coach: {workout.createdBy?.name ?? 'Unknown'}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
