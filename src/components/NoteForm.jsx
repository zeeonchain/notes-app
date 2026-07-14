import { useState, useEffect } from 'react'

export default function NoteForm({ initialNote, onSave, onCancel, saving }) {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')

  useEffect(() => {
    setTitle(initialNote?.title ?? '')
    setBody(initialNote?.body ?? '')
  }, [initialNote])

  function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    onSave({ title: title.trim(), body: body.trim() })
  }

  return (
    <div className="fixed inset-0 z-20 flex items-start justify-center overflow-y-auto bg-ink/40 px-4 py-10 backdrop-blur-[2px]">
      <div className="w-full max-w-lg rounded-2xl border border-paper-rule bg-paper-card p-7 shadow-xl">
        <h2 className="font-display text-xl font-semibold text-ink">
          {initialNote ? 'Edit note' : 'New note'}
        </h2>

        <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
          <div>
            <label htmlFor="note-title" className="mb-1.5 block text-xs font-medium text-ink-muted">
              Title
            </label>
            <input
              id="note-title"
              type="text"
              required
              autoFocus
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-paper-rule bg-paper-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-pen focus:ring-2 focus:ring-pen/15"
              placeholder="Give it a title"
            />
          </div>

          <div>
            <label htmlFor="note-body" className="mb-1.5 block text-xs font-medium text-ink-muted">
              Note
            </label>
            <textarea
              id="note-body"
              rows={6}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full resize-none rounded-xl border border-paper-rule bg-paper-bg px-3.5 py-2.5 text-sm text-ink outline-none transition-colors focus:border-pen focus:ring-2 focus:ring-pen/15"
              placeholder="Write something…"
            />
          </div>

          <div className="mt-1 flex justify-end gap-3">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-ink-muted hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-pen px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-pen-dim disabled:opacity-60"
            >
              {saving ? 'Saving…' : initialNote ? 'Save changes' : 'Add note'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
