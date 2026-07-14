function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })
}

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="note-enter group relative rounded-2xl border border-paper-rule bg-paper-card p-5 transition-all hover:-translate-y-0.5 hover:border-pen/30 hover:shadow-lg hover:shadow-ink/5 dark:border-night-rule dark:bg-night-card dark:hover:shadow-none">
      <div className="flex items-start justify-between gap-3">
        <h3 className="font-display text-lg font-semibold leading-snug text-ink dark:text-ink-invert">
          {note.title}
        </h3>
        <div className="flex shrink-0 gap-1 opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
          <button
            onClick={() => onEdit(note)}
            aria-label="Edit note"
            className="rounded-lg p-1.5 text-ink-muted hover:bg-paper-bg hover:text-pen dark:text-ink-mutedInvert dark:hover:bg-night-bg"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z" />
            </svg>
          </button>
          <button
            onClick={() => onDelete(note)}
            aria-label="Delete note"
            className="rounded-lg p-1.5 text-ink-muted hover:bg-paper-bg hover:text-marker dark:text-ink-mutedInvert dark:hover:bg-night-bg"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 7h16M9 7V5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2m-8 0 1 12a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1l1-12" />
            </svg>
          </button>
        </div>
      </div>

      {note.body && (
        <p className="mt-2.5 whitespace-pre-wrap text-sm leading-relaxed text-ink/75 dark:text-ink-invert/75">
          {note.body}
        </p>
      )}

      <span className="mt-4 inline-block bg-gradient-to-t from-highlight/60 from-[35%] to-[35%] px-0.5 text-xs font-medium text-ink/70 dark:text-ink-invert">
        {formatDate(note.created_at)}
      </span>
    </div>
  )
}
