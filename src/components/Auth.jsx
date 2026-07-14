import { useState } from 'react'
import { supabase } from '../lib/supabase'
import { playClick } from '../lib/preferences'
import SettingsToggles from './SettingsToggles'

export default function Auth({ themeProps }) {
  const [mode, setMode] = useState('signin') // 'signin' | 'signup'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    playClick()
    setError('')
    setMessage('')
    setLoading(true)

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({ email, password })
      if (error) {
        setError(error.message)
      } else {
        setMessage('Check your email to confirm your account, then sign in.')
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password })
      if (error) {
        setError(error.message)
      }
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-paper-bg px-4 font-body dark:bg-night-bg">
      <div className="absolute right-4 top-4">
        <SettingsToggles {...themeProps} />
      </div>

      <div className="w-full max-w-sm rounded-2xl border border-paper-rule bg-paper-card p-10 shadow-xl shadow-ink/5 dark:border-night-rule dark:bg-night-card dark:shadow-none">
        <div className="mb-6 flex h-11 w-11 items-center justify-center rounded-xl bg-pen font-display text-lg font-semibold text-white">
          N
        </div>

        <h1 className="font-display text-[1.7rem] font-semibold leading-tight text-ink dark:text-ink-invert">
          {mode === 'signin' ? 'Welcome back' : 'Create an account'}
        </h1>
        <p className="mt-2 text-[15px] text-ink-muted dark:text-ink-mutedInvert">
          {mode === 'signin'
            ? 'Sign in to see your notes.'
            : 'Sign up with an email and password.'}
        </p>

        <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
          <div>
            <label htmlFor="email" className="mb-1.5 block text-xs font-medium text-ink-muted dark:text-ink-mutedInvert">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-paper-rule bg-paper-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-pen focus:ring-2 focus:ring-pen/15 dark:border-night-rule dark:bg-night-bg dark:text-ink-invert"
              placeholder="you@example.com"
            />
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-xs font-medium text-ink-muted dark:text-ink-mutedInvert">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              minLength={6}
              autoComplete={mode === 'signin' ? 'current-password' : 'new-password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-paper-rule bg-paper-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-pen focus:ring-2 focus:ring-pen/15 dark:border-night-rule dark:bg-night-bg dark:text-ink-invert"
              placeholder="At least 6 characters"
            />
          </div>

          {error && (
            <p className="rounded-xl bg-marker/10 px-3.5 py-2.5 text-sm text-marker-dim">{error}</p>
          )}
          {message && (
            <p className="rounded-xl bg-pen/10 px-3.5 py-2.5 text-sm text-pen-dim">{message}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-1 rounded-xl bg-pen px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-pen-dim disabled:opacity-60"
          >
            {loading ? 'Please wait…' : mode === 'signin' ? 'Sign in' : 'Sign up'}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            playClick()
            setMode(mode === 'signin' ? 'signup' : 'signin')
            setError('')
            setMessage('')
          }}
          className="mt-6 w-full text-center text-sm text-ink-muted hover:text-pen dark:text-ink-mutedInvert"
        >
          {mode === 'signin'
            ? "Don't have an account? "
            : 'Already have an account? '}
          <span className="font-medium text-pen">
            {mode === 'signin' ? 'Sign up' : 'Sign in'}
          </span>
        </button>
      </div>
    </div>
  )
}
