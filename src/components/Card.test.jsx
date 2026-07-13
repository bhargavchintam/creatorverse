import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Card from './Card'

const creator = {
  id: 42,
  name: 'Ada Lovelace',
  url: 'https://example.com/ada',
  description: 'Pioneer of computing',
  imageURL: 'https://example.com/ada.jpg',
}

function renderCard(props) {
  return render(
    <MemoryRouter>
      <Card creator={props} />
    </MemoryRouter>
  )
}

describe('Card', () => {
  it('renders the creator name, url, and description', () => {
    renderCard(creator)

    expect(screen.getByRole('heading', { name: creator.name })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: creator.url })).toHaveAttribute('href', creator.url)
    expect(screen.getByText(creator.description)).toBeInTheDocument()
  })

  it('renders the image when imageURL is present', () => {
    renderCard(creator)

    expect(screen.getByRole('img', { name: creator.name })).toHaveAttribute(
      'src',
      creator.imageURL
    )
  })

  it('omits the image when imageURL is missing', () => {
    renderCard({ ...creator, imageURL: null })

    expect(screen.queryByRole('img')).not.toBeInTheDocument()
  })

  it('links View and Edit actions to the creator id', () => {
    renderCard(creator)

    // The Card renders these as <a role="button">, so they're exposed as buttons, not links.
    expect(screen.getByRole('button', { name: 'View' })).toHaveAttribute(
      'href',
      `/creator/${creator.id}`
    )
    expect(screen.getByRole('button', { name: 'Edit' })).toHaveAttribute(
      'href',
      `/edit/${creator.id}`
    )
  })
})
