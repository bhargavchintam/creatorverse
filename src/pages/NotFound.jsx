import { Link } from 'react-router-dom'

// Catch-all page for any path that doesn't match a route.
function NotFound() {
  return (
    <div className="empty-state">
      <h2>404 — Page not found 🤷</h2>
      <p>
        That page doesn't exist. <Link to="/">Go back home</Link>.
      </p>
    </div>
  )
}

export default NotFound
