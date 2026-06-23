import { useEffect, useState } from 'react';
import { API_HOST, normalizeResponseArray } from '../api';

interface User {
  _id: string;
  name: string;
  email: string;
  role?: string;
  team?: { name?: string; description?: string };
}

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch(`${API_HOST}/api/users/`);
        const data = await response.json();
        setUsers(normalizeResponseArray<User>(data, 'users'));
      } catch (err) {
        setError('Unable to load users.');
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  return (
    <section>
      <h2>Users</h2>
      {loading && <p>Loading users…</p>}
      {error && <p className="error">{error}</p>}
      {users.length === 0 && !loading && <p>No users found.</p>}
      <div className="grid">
        {users.map((user) => (
          <article key={user._id} className="card">
            <h3>{user.name}</h3>
            <p>{user.email}</p>
            <p>{user.role ?? 'member'}</p>
            {user.team && (
              <p>
                Team: <strong>{user.team.name}</strong>
              </p>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
