import { MemoryRouter } from 'react-router-dom'
import { render, screen } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import ShowCreators from './ShowCreators'

function renderShowCreators(props) {
  return render(
    <MemoryRouter>
      <ShowCreators {...props} />
    </MemoryRouter>
  )
}

describe('ShowCreators', () => {
  it('shows a loading indicator while loading', () => {
    renderShowCreators({ creators: [], loading: true })

    expect(screen.getByText(/loading creators/i)).toBeInTheDocument()
  })

  it('shows the empty state when there are no creators', () => {
    renderShowCreators({ creators: [], loading: false })

    expect(screen.getByText(/no creators yet/i)).toBeInTheDocument()
    expect(screen.getByText(/supabase_setup\.sql/)).toBeInTheDocument()
  })

  it('renders a card per creator when the list is populated', () => {
    renderShowCreators({
      creators: [
        { id: 1, name: 'Ada Lovelace', url: 'https://a.example', description: 'a' },
        { id: 2, name: 'Grace Hopper', url: 'https://b.example', description: 'b' },
      ],
      loading: false,
    })

    expect(screen.queryByText(/no creators yet/i)).not.toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Ada Lovelace' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Grace Hopper' })).toBeInTheDocument()
  })
})
