import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { supabase } from '../client'

// Form page for editing OR deleting an existing content creator.
function EditCreator({ onSaved }) {
  const { id } = useParams()
  const navigate = useNavigate()
  const [form, setForm] = useState({
    name: '',
    url: '',
    description: '',
    imageURL: '',
  })
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)

  // Load the creator's existing info into the form
  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from('creators')
        .select()
        .eq('id', id)
        .single()

      if (error) {
        console.error('Error loading creator:', error.message)
      } else if (data) {
        setForm({
          name: data.name ?? '',
          url: data.url ?? '',
          description: data.description ?? '',
          imageURL: data.imageURL ?? '',
        })
      }
      setLoading(false)
    }
    fetchCreator()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  // Update
  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    const { error } = await supabase
      .from('creators')
      .update({
        name: form.name,
        url: form.url,
        description: form.description,
        imageURL: form.imageURL || null,
      })
      .eq('id', id)

    setSubmitting(false)

    if (error) {
      console.error('Error updating creator:', error.message)
      alert('Could not update creator: ' + error.message)
      return
    }

    if (onSaved) await onSaved()
    navigate(`/creator/${id}`)
  }

  // Delete
  const handleDelete = async () => {
    const confirmed = window.confirm(
      `Delete "${form.name}"? This cannot be undone.`
    )
    if (!confirmed) return

    const { error } = await supabase.from('creators').delete().eq('id', id)

    if (error) {
      console.error('Error deleting creator:', error.message)
      alert('Could not delete creator: ' + error.message)
      return
    }

    if (onSaved) await onSaved()
    navigate('/')
  }

  if (loading) return <p aria-busy="true">Loading…</p>

  return (
    <section>
      <h2>Edit Creator</h2>

      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
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
            required
          />
        </label>

        <label>
          Description
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
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
          />
        </label>

        <div className="btn-row">
          <button type="submit" aria-busy={submitting} disabled={submitting}>
            💾 Save Changes
          </button>
          <button
            type="button"
            className="contrast"
            onClick={() => navigate(`/creator/${id}`)}
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleDelete}
            style={{
              marginLeft: 'auto',
              background: 'var(--pico-del-color, #d93526)',
              borderColor: 'var(--pico-del-color, #d93526)',
            }}
          >
            🗑️ Delete
          </button>
        </div>
      </form>
    </section>
  )
}

export default EditCreator
