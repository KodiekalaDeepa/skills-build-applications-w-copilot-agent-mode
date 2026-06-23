import { useEffect, useState } from 'react';
import { API_HOST, normalizeResponseArray } from '../api';

interface Team {
  _id: string;
  name: string;
  description: string;
  members?: { name?: string }[];
}

export default function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API_HOST}/api/teams/`);
        const data = await response.json();
        setTeams(normalizeResponseArray<Team>(data, 'teams'));
      } catch (err) {
        setError('Unable to load teams.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section>
      <h2>Teams</h2>
      {loading && <p>Loading teams…</p>}
      {error && <p className="error">{error}</p>}
      {teams.length === 0 && !loading && <p>No teams found.</p>}
      <div className="grid">
        {teams.map((team) => (
          <article key={team._id} className="card">
            <h3>{team.name}</h3>
            <p>{team.description}</p>
            {team.members?.length ? (
              <p>Members: {team.members.map((member) => member.name).join(', ')}</p>
            ) : (
              <p>No members yet.</p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
