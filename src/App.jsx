import { useEffect, useState } from 'react'
import { supabase } from './lib/supabase'
import Auth from './components/Auth'
import NotesApp from './components/NotesApp'
import { getStoredTheme, setStoredTheme, getStoredSound, setStoredSound } from './lib/preferences'

export default function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [theme, setTheme] = useState(getStoredTheme)
  const [soundOn, setSoundOn] = useState(getStoredSound)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    setStoredTheme(theme)
  }, [theme])

  function toggleTheme() {
    setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  }

  function toggleSound() {
    setSoundOn((s) => {
      const next = !s
      setStoredSound(next)
      return next
    })
  }

  const themeProps = { theme, onToggleTheme: toggleTheme, soundOn, onToggleSound: toggleSound }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-paper-bg font-body text-sm text-ink-muted dark:bg-night-bg dark:text-ink-mutedInvert">
        Loading…
      </div>
    )
  }

  return session ? (
    <NotesApp session={session} themeProps={themeProps} />
  ) : (
    <Auth themeProps={themeProps} />
  )
}
