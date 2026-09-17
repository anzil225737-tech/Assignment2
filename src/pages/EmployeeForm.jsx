import { useState } from 'react';

const initialValues = { name: '', designation: '', location: '', salary: '' };

export function EmployeeForm() {
  const [values, setValues] = useState(initialValues);
  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    setSubmitted(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="container page-content form-page">
      <section className="page-intro row align-items-end g-4">
        <div className="col-lg-8">
          <p className="eyebrow">People directory / Add record</p>
          <h1>Bring someone new<br className="d-none d-md-block" /> into view.</h1>
          <p className="lead-copy">Capture the essentials. This form stays local and does not post data anywhere.</p>
        </div>
      </section>

      <section className="form-panel">
        <div className="form-heading">
          <span className="form-index">01</span>
          <div><h2>Employee details</h2><p>All fields are required to create a complete profile.</p></div>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="row g-4">
            <div className="col-md-6"><label htmlFor="name">Name</label><input id="name" name="name" className="form-control" placeholder="e.g. Priya Shah" value={values.name} onChange={handleChange} required /></div>
            <div className="col-md-6"><label htmlFor="designation">Designation</label><input id="designation" name="designation" className="form-control" placeholder="e.g. Product designer" value={values.designation} onChange={handleChange} required /></div>
            <div className="col-md-6"><label htmlFor="location">Location</label><input id="location" name="location" className="form-control" placeholder="e.g. Bengaluru, India" value={values.location} onChange={handleChange} required /></div>
            <div className="col-md-6"><label htmlFor="salary">Salary</label><div className="input-group"><span className="input-group-text">$</span><input id="salary" name="salary" type="number" min="0" className="form-control" placeholder="e.g. 75000" value={values.salary} onChange={handleChange} required /></div></div>
          </div>
          <div className="form-actions">
            {submitted && <p className="success-message" role="status">Employee details saved locally.</p>}
            <button className="btn btn-primary" type="submit">Save employee <span aria-hidden="true">→</span></button>
          </div>
        </form>
      </section>
    </div>
  );
}
