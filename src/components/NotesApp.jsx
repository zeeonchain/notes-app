import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'
import NoteCard from './NoteCard'
import NoteForm from './NoteForm'
import SettingsToggles from './SettingsToggles'
import { playClick } from '../lib/preferences'

export default function NotesApp({ session, themeProps }) {
  const [notes, setNotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formOpen, setFormOpen] = useState(false)
  const [editingNote, setEditingNote] = useState(null)
  const [saving, setSaving] = useState(false)
  const [search, setSearch] = useState('')

  const user = session.user

  const filteredNotes = notes.filter((note) =>
    note.title.toLowerCase().includes(search.trim().toLowerCase())
  )

  useEffect(() => {
    loadNotes()
  }, [])

  async function loadNotes() {
    setLoading(true)
    setError('')
    const { data, error } = await supabase
      .from('notes')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      setError(error.message)
    } else {
      setNotes(data)
    }
    setLoading(false)
  }

  function openNewNote() {
    playClick()
    setEditingNote(null)
    setFormOpen(true)
  }

  function openEditNote(note) {
    playClick()
    setEditingNote(note)
    setFormOpen(true)
  }

  async function handleSave({ title, body }) {
    playClick()
    setSaving(true)
    setError('')

    if (editingNote) {
      const { error } = await supabase
        .from('notes')
        .update({ title, body })
        .eq('id', editingNote.id)

      if (error) setError(error.message)
    } else {
      const { error } = await supabase
        .from('notes')
        .insert({ title, body, user_id: user.id })

      if (error) setError(error.message)
    }

    setSaving(false)
    setFormOpen(false)
    setEditingNote(null)
    loadNotes()
  }

  async function handleDelete(note) {
    const confirmed = window.confirm(`Delete "${note.title}"? This can't be undone.`)
    if (!confirmed) return

    playClick()
    const { error } = await supabase.from('notes').delete().eq('id', note.id)
    if (error) {
      setError(error.message)
    } else {
      setNotes((prev) => prev.filter((n) => n.id !== note.id))
    }
  }

  async function handleSignOut() {
    playClick()
    await supabase.auth.signOut()
  }

  return (
    <div className="min-h-screen bg-paper-bg px-4 py-10 font-body dark:bg-night-bg sm:px-8">
      <div className="mx-auto max-w-3xl">
        <header className="mb-10 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-pen font-display text-base font-semibold text-white">
              N
            </div>
            <div>
              <h1 className="font-display text-xl font-semibold leading-tight text-ink dark:text-ink-invert">Notes</h1>
              <p className="text-xs text-ink-muted dark:text-ink-mutedInvert">{user.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <SettingsToggles {...themeProps} />
            <button
              onClick={handleSignOut}
              className="rounded-xl border border-paper-rule px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:border-marker/40 hover:text-marker dark:border-night-rule dark:text-ink-mutedInvert"
            >
              Sign out
            </button>
          </div>
        </header>

        <div className="mb-4 flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1">
            <svg
              viewBox="0 0 24 24"
              className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-muted dark:text-ink-mutedInvert"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <circle cx="11" cy="11" r="7" />
              <path strokeLinecap="round" d="m20 20-3.5-3.5" />
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search notes by title…"
              className="w-full rounded-xl border border-paper-rule bg-paper-card py-2.5 pl-10 pr-3.5 text-sm text-ink outline-none transition-colors focus:border-pen focus:ring-2 focus:ring-pen/15 dark:border-night-rule dark:bg-night-card dark:text-ink-invert"
            />
          </div>
          <button
            onClick={openNewNote}
            className="shrink-0 rounded-xl bg-pen px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pen-dim"
          >
            + New note
          </button>
        </div>

        {error && (
          <p className="mb-4 rounded-xl bg-marker/10 px-3.5 py-2.5 text-sm text-marker-dim">{error}</p>
        )}

        {loading ? (
          <p className="mt-6 text-sm text-ink-muted dark:text-ink-mutedInvert">Loading your notes…</p>
        ) : notes.length === 0 ? (
          <div className="mt-2 rounded-2xl border border-paper-rule bg-paper-card px-6 py-16 text-center dark:border-night-rule dark:bg-night-card">
            <p className="font-display text-lg font-semibold text-ink dark:text-ink-invert">No notes yet</p>
            <p className="mt-1.5 text-sm text-ink-muted dark:text-ink-mutedInvert">
              Click "New note" above to write your first one.
            </p>
          </div>
        ) : filteredNotes.length === 0 ? (
          <div className="mt-2 rounded-2xl border border-paper-rule bg-paper-card px-6 py-16 text-center dark:border-night-rule dark:bg-night-card">
            <p className="font-display text-lg font-semibold text-ink dark:text-ink-invert">No matches</p>
            <p className="mt-1.5 text-sm text-ink-muted dark:text-ink-mutedInvert">
              No note titles match "{search}".
            </p>
          </div>
        ) : (
          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {filteredNotes.map((note) => (
              <NoteCard
                key={note.id}
                note={note}
                onEdit={openEditNote}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}
      </div>

      {formOpen && (
        <NoteForm
          initialNote={editingNote}
          saving={saving}
          onSave={handleSave}
          onCancel={() => {
            playClick()
            setFormOpen(false)
            setEditingNote(null)
          }}
        />
      )}
    </div>
  )
}
