const THEME_KEY = 'notes-app-theme'
const SOUND_KEY = 'notes-app-sound'

export function getStoredTheme() {
  if (typeof window === 'undefined') return 'light'
  const stored = window.localStorage.getItem(THEME_KEY)
  if (stored === 'light' || stored === 'dark') return stored
  // Fall back to the user's OS-level preference on first visit.
  return window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
}

export function setStoredTheme(theme) {
  window.localStorage.setItem(THEME_KEY, theme)
}

export function getStoredSound() {
  if (typeof window === 'undefined') return false
  return window.localStorage.getItem(SOUND_KEY) === 'on'
}

export function setStoredSound(enabled) {
  window.localStorage.setItem(SOUND_KEY, enabled ? 'on' : 'off')
}

// Synthesizes a short, soft click using the Web Audio API — no audio
// file needed, and it respects the user's sound toggle at call time.
let audioCtx
export function playClick() {
  if (!getStoredSound()) return

  try {
    audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)()
    const osc = audioCtx.createOscillator()
    const gain = audioCtx.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(720, audioCtx.currentTime)
    gain.gain.setValueAtTime(0.06, audioCtx.currentTime)
    gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.09)

    osc.connect(gain)
    gain.connect(audioCtx.destination)
    osc.start()
    osc.stop(audioCtx.currentTime + 0.09)
  } catch {
    // Audio isn't critical to the app — fail silently if unsupported.
  }
}
