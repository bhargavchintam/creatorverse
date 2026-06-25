import { Link } from 'react-router-dom'

// Displays a single content creator's info on a card.
// Props: creator = { id, name, url, description, imageURL }
function Card({ creator }) {
  const { id, name, url, description, imageURL } = creator

  return (
    <article className="creator-card">
      {imageURL && <img className="card-image" src={imageURL} alt={name} />}

      <h3>{name}</h3>

      <p>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {url}
        </a>
      </p>

      <p>{description}</p>

      <div className="card-actions">
        <Link to={`/creator/${id}`} role="button" className="secondary">
          View
        </Link>
        <Link to={`/edit/${id}`} role="button" className="contrast outline">
          Edit
        </Link>
      </div>
    </article>
  )
}

export default Card
