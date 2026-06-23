import { useEffect, useState } from 'react';
import { API_HOST, normalizeResponseArray } from '../api';

interface LeaderboardEntry {
  _id: string;
  rank: number;
  score: number;
  user?: { name?: string };
}

export default function Leaderboard() {
  const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API_HOST}/api/leaderboard/`);
        const data = await response.json();
        setEntries(normalizeResponseArray<LeaderboardEntry>(data, 'leaderboard'));
      } catch (err) {
        setError('Unable to load leaderboard.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section>
      <h2>Leaderboard</h2>
      {loading && <p>Loading leaderboard…</p>}
      {error && <p className="error">{error}</p>}
      {entries.length === 0 && !loading && <p>No leaderboard data found.</p>}
      <ol className="leaderboard-list">
        {entries.map((entry) => (
          <li key={entry._id}>
            <strong>#{entry.rank}</strong> {entry.user?.name ?? 'Unknown'} — {entry.score} pts
          </li>
        ))}
      </ol>
    </section>
  );
}
