import { useEffect, useState } from 'react';
import { API_HOST, normalizeResponseArray } from '../api';

interface Activity {
  _id: string;
  type: string;
  distanceKm: number;
  durationMin: number;
  caloriesBurned: number;
  date: string;
  user?: { name?: string };
}

export default function Activities() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API_HOST}/api/activities/`);
        const data = await response.json();
        setActivities(normalizeResponseArray<Activity>(data, 'activities'));
      } catch (err) {
        setError('Unable to load activities.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section>
      <h2>Activities</h2>
      {loading && <p>Loading activities…</p>}
      {error && <p className="error">{error}</p>}
      {activities.length === 0 && !loading && <p>No activities found.</p>}
      <div className="grid">
        {activities.map((activity) => (
          <article key={activity._id} className="card">
            <h3>{activity.type}</h3>
            <p>{activity.user?.name ?? 'Unknown athlete'}</p>
            <p>Distance: {activity.distanceKm} km</p>
            <p>Duration: {activity.durationMin} min</p>
            <p>Calories: {activity.caloriesBurned}</p>
            <p>{new Date(activity.date).toLocaleDateString()}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
