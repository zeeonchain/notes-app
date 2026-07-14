export default function SettingsToggles({ theme, onToggleTheme, soundOn, onToggleSound }) {
  return (
    <div className="flex items-center gap-1.5">
      <button
        type="button"
        onClick={onToggleTheme}
        aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
        className="rounded-xl border border-paper-rule p-2 text-ink-muted transition-colors hover:text-pen dark:border-night-rule dark:text-ink-mutedInvert"
      >
        {theme === 'dark' ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <circle cx="12" cy="12" r="4.5" />
            <path strokeLinecap="round" d="M12 2.5v2M12 19.5v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2.5 12h2M19.5 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z" />
          </svg>
        )}
      </button>

      <button
        type="button"
        onClick={onToggleSound}
        aria-label={soundOn ? 'Turn click sounds off' : 'Turn click sounds on'}
        title={soundOn ? 'Turn click sounds off' : 'Turn click sounds on'}
        className="rounded-xl border border-paper-rule p-2 text-ink-muted transition-colors hover:text-pen dark:border-night-rule dark:text-ink-mutedInvert"
      >
        {soundOn ? (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9v6h4l5 4V5L8 9H4Z" />
            <path strokeLinecap="round" d="M17 9.5a3.5 3.5 0 0 1 0 5" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 9v6h4l5 4V5L8 9H4Z" />
            <path strokeLinecap="round" d="m16 9 4 6m0-6-4 6" />
          </svg>
        )}
      </button>
    </div>
  )
}
