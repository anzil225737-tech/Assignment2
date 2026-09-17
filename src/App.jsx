import { NavLink, Navigate, Route, Routes } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { EmployeeForm } from './pages/EmployeeForm';

function App() {
  return (
    <div className="app-shell">
      <header className="site-header">
        <nav className="navbar navbar-expand-lg">
          <div className="container py-2">
            <NavLink className="brand" to="/">
              <span className="brand-mark">P</span>
              <span>
                <strong>PeopleOS</strong>
                <small>Team directory</small>
              </span>
            </NavLink>
            <div className="d-flex gap-2 ms-auto">
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/">
                Home
              </NavLink>
              <NavLink className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} to="/employees/new">
                Employee form
              </NavLink>
            </div>
          </div>
        </nav>
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/employees/new" element={<EmployeeForm />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <footer className="site-footer">
        <div className="container d-flex justify-content-between gap-3 flex-wrap">
          <span>PeopleOS employee directory</span>
          <span>Read-only directory data</span>
        </div>
      </footer>
    </div>
  );
}

export default App;
