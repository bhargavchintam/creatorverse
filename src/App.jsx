import { useState, useEffect } from 'react'
import { useRoutes, Link } from 'react-router-dom'
import { supabase } from './client'

import ShowCreators from './pages/ShowCreators'
import ViewCreator from './pages/ViewCreator'
import AddCreator from './pages/AddCreator'
import EditCreator from './pages/EditCreator'
import NotFound from './pages/NotFound'

function App() {
  const [creators, setCreators] = useState([])
  const [loading, setLoading] = useState(true)

  // Read all creators from the database
  const fetchCreators = async () => {
    setLoading(true)
    const { data, error } = await supabase
      .from('creators')
      .select()
      .order('id', { ascending: true })

    if (error) {
      console.error('Error fetching creators:', error.message)
    } else {
      setCreators(data)
    }
    setLoading(false)
  }

  useEffect(() => {
    fetchCreators()
  }, [])

  // Route table — each page is rendered for its path
  const element = useRoutes([
    {
      path: '/',
      element: <ShowCreators creators={creators} loading={loading} />,
    },
    { path: '/creator/:id', element: <ViewCreator /> },
    { path: '/add', element: <AddCreator onSaved={fetchCreators} /> },
    { path: '/edit/:id', element: <EditCreator onSaved={fetchCreators} /> },
    { path: '*', element: <NotFound /> },
  ])

  return (
    <main className="container">
      <header className="app-header">
        <h1>
          <Link to="/" style={{ textDecoration: 'none' }}>
            💫 Creatorverse
          </Link>
        </h1>
        <p className="subtitle">A collection of content creators worth following</p>
      </header>
      {element}
    </main>
  )
}

export default App
