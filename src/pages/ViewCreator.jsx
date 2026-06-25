import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { supabase } from '../client'

// Detail page for a single content creator (unique URL: /creator/:id).
function ViewCreator() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [creator, setCreator] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error fetching creator:', error.message)
      } else {
        setCreator(data)
      }
      setLoading(false)
    }
    fetchCreator()
  }, [id])

  if (loading) return <p aria-busy="true">Loading…</p>

  if (!creator) {
    return (
      <div className="empty-state">
        <h2>Creator not found</h2>
        <Link to="/" role="button">
          ← Back home
        </Link>
      </div>
    )
  }

  return (
    <article>
      {creator.imageURL && (
        <img className="detail-image" src={creator.imageURL} alt={creator.name} />
      )}

      <h2>{creator.name}</h2>

      <p>
        <a href={creator.url} target="_blank" rel="noopener noreferrer">
          {creator.url}
        </a>
      </p>

      <p>{creator.description}</p>

      <div className="btn-row">
        <button onClick={() => navigate('/')} className="secondary">
          ← Back
        </button>
        <button onClick={() => navigate(`/edit/${creator.id}`)}>
          ✏️ Edit
        </button>
      </div>
    </article>
  )
}

export default ViewCreator
