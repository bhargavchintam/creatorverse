import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../client'

// Form page for adding a new content creator.
function AddCreator({ onSaved }) {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const { error } = await supabase.from('creators').insert({
      name: form.name,
      url: form.url,
      description: form.description,
      imageURL: form.imageURL || null,
    })

    setSubmitting(false)

    if (error) {
      console.error('Error adding creator:', error.message)
      alert('Could not add creator: ' + error.message)
      return
    }

    if (onSaved) await onSaved() // refresh the home list
    navigate('/')
  }

  return (
    <section>
      <h2>Add a New Creator</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Fireship"
            required
          />
        </label>

        <label>
          URL
          <input
            type="url"
            name="url"
            value={form.url}
            onChange={handleChange}
            placeholder="https://www.youtube.com/@example"
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What kind of content do they make?"
            rows={3}
            required
          />
        </label>

        <label>
          Image URL <small>(optional)</small>
          <input
            type="url"
            name="imageURL"
            value={form.imageURL}
            onChange={handleChange}
            placeholder="https://…/photo.jpg"
          />
        </label>

        <div className="btn-row">
          <button
            type="button"
            className="secondary"
            onClick={() => navigate('/')}
          >
            Cancel
          </button>
          <button type="submit" aria-busy={submitting} disabled={submitting}>
            Add Creator
          </button>
        </div>
      </form>
    </section>
  )
}

export default AddCreator
