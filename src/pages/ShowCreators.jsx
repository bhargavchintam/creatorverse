import { Link } from 'react-router-dom'
import Card from '../components/Card'

// Home page: displays all content creators as a grid of cards.
function ShowCreators({ creators, loading }) {
  return (
    <section>
      <div className="toolbar">
        <Link to="/add" role="button">
          ➕ Add a Creator
        </Link>
      </div>

      {loading ? (
        <p aria-busy="true">Loading creators…</p>
      ) : creators.length === 0 ? (
        <div className="empty-state">
          <h2>No creators yet 😢</h2>
          <p>
            Add your first content creator to get started, or run{' '}
            <code>supabase_setup.sql</code> to seed some.
          </p>
        </div>
      ) : (
        <div className="creator-grid">
          {creators.map((creator) => (
            <Card key={creator.id} creator={creator} />
          ))}
        </div>
      )}
    </section>
  )
}

export default ShowCreators
