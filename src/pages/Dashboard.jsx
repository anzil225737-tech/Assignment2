import { useEffect, useState } from 'react';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

export function Dashboard() {
  const [employees, setEmployees] = useState([]);
  const [status, setStatus] = useState('loading');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const controller = new AbortController();

    async function loadEmployees() {
      try {
        const response = await fetch(API_URL, { signal: controller.signal });
        if (!response.ok) throw new Error('Unable to load directory');
        const data = await response.json();
        setEmployees(data);
        setStatus('ready');
      } catch (error) {
        if (error.name !== 'AbortError') setStatus('error');
      }
    }

    loadEmployees();
    return () => controller.abort();
  }, []);

  const filteredEmployees = employees.filter((employee) => {
    const query = search.toLowerCase();
    return employee.name.toLowerCase().includes(query) || employee.email.toLowerCase().includes(query);
  });

  return (
    <div className="container page-content">
      <section className="page-intro row align-items-end g-4">
        <div className="col-lg-7">
          <p className="eyebrow">People directory / 2024</p>
          <h1>Know your people.</h1>
          <p className="lead-copy">A clear view of the team, ready when you are.</p>
        </div>
        <div className="col-lg-5">
          <div className="summary-stat">
            <span className="stat-label">Directory total</span>
            <strong>{status === 'ready' ? employees.length : '--'}</strong>
            <span className="stat-note">profiles synced from the directory</span>
          </div>
        </div>
      </section>

      <section className="directory-panel">
        <div className="panel-toolbar d-flex justify-content-between align-items-center gap-3 flex-wrap">
          <div>
            <h2>Employee directory</h2>
            <p>External directory records</p>
          </div>
          <div className="search-wrap">
            <label className="visually-hidden" htmlFor="directory-search">Search employees</label>
            <span className="search-icon" aria-hidden="true">⌕</span>
            <input
              id="directory-search"
              className="form-control"
              type="search"
              placeholder="Search by name or email"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
          </div>
        </div>

        {status === 'loading' && <div className="state-message"><div className="spinner-border" role="status" /><span>Loading directory...</span></div>}
        {status === 'error' && <div className="state-message error-state"><strong>We could not load the directory.</strong><span>Check your connection and refresh to try again.</span></div>}
        {status === 'ready' && filteredEmployees.length === 0 && <div className="state-message"><strong>No employees found.</strong><span>Try a different name or email.</span></div>}
        {status === 'ready' && filteredEmployees.length > 0 && (
          <div className="table-responsive">
            <table className="table directory-table align-middle mb-0">
              <thead>
                <tr><th scope="col">ID</th><th scope="col">Employee</th><th scope="col">Email address</th><th scope="col" className="text-end">Status</th></tr>
              </thead>
              <tbody>
                {filteredEmployees.map((employee) => (
                  <tr key={employee.id}>
                    <td><span className="employee-id">#{String(employee.id).padStart(2, '0')}</span></td>
                    <td><strong>{employee.name}</strong></td>
                    <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
                    <td className="text-end"><span className="status-pill"><span />Active</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
