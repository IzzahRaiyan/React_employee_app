
import { useEffect, useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css'

function Home() {
  const [employees, setEmployees] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to load employees')
        }
        return response.json()
      })
      .then(data => {
        setEmployees(data)
        setLoading(false)
      })
      .catch(() => {
        setError('Unable to load employee data. Please try again.')
        setLoading(false)
      })
  }, [])

  return (
    <div className="container py-4">
      <div className="page-heading mb-4">
        <h2>Employee Dashboard</h2>
        <p className="text-secondary">
          View employee information retrieved from the external API.
        </p>
      </div>

      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white py-3">
          <h5 className="mb-0">Employee List</h5>
        </div>

        <div className="card-body">
          {loading && <p>Loading employees...</p>}

          {error && <p className="text-danger">{error}</p>}

          {!loading && !error && (
            <div className="table-responsive">
              <table className="table table-hover table-striped align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Email</th>
                  </tr>
                </thead>

                <tbody>
                  {employees.map(employee => (
                    <tr key={employee.id}>
                      <td>{employee.id}</td>
                      <td>{employee.name}</td>
                      <td>{employee.email}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function EmployeeForm() {
  const [name, setName] = useState('')
  const [designation, setDesignation] = useState('')
  const [location, setLocation] = useState('')
  const [salary, setSalary] = useState('')
  const [message, setMessage] = useState('')

  function handleSubmit(event) {
    event.preventDefault()

    setMessage(
      `Employee details entered successfully for ${name}.`
    )

    setName('')
    setDesignation('')
    setLocation('')
    setSalary('')
  }

  return (
    <div className="container py-4">
      <div className="page-heading mb-4">
        <h2>Employee Form</h2>
        <p className="text-secondary">
          Enter the employee details below.
        </p>
      </div>

      <div className="card shadow-sm form-card">
        <div className="card-header bg-primary text-white py-3">
          <h5 className="mb-0">Add Employee Details</h5>
        </div>

        <div className="card-body p-4">
          {message && (
            <div className="alert alert-success">{message}</div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter employee name"
                value={name}
                onChange={event => setName(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Designation</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter designation"
                value={designation}
                onChange={event => setDesignation(event.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter location"
                value={location}
                onChange={event => setLocation(event.target.value)}
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Salary</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter salary"
                min="0"
                value={salary}
                onChange={event => setSalary(event.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Submit Employee
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <nav className="navbar navbar-expand navbar-dark bg-dark px-4">
        <Link className="navbar-brand fw-bold" to="/">
          Employee Portal
        </Link>

        <div className="navbar-nav ms-auto">
          <Link className="nav-link" to="/">
            Home
          </Link>

          <Link className="nav-link" to="/employee-form">
            Employee Form
          </Link>
        </div>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee-form" element={<EmployeeForm />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

