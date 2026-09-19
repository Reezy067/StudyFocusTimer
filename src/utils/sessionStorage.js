export const SESSION_STORAGE_KEY = 'study-focus-timer.sessions.v1'

const SESSION_FIELDS = ['completedAt', 'durationMinutes', 'id', 'subject']

function isValidSession(session) {
  if (session === null || typeof session !== 'object' || Array.isArray(session)) {
    return false
  }

  const fields = Object.keys(session).sort()
  if (
    fields.length !== SESSION_FIELDS.length ||
    fields.some((field, index) => field !== SESSION_FIELDS[index])
  ) {
    return false
  }

  return (
    typeof session.id === 'string' &&
    session.id.length > 0 &&
    typeof session.completedAt === 'string' &&
    !Number.isNaN(Date.parse(session.completedAt)) &&
    typeof session.durationMinutes === 'number' &&
    Number.isFinite(session.durationMinutes) &&
    session.durationMinutes > 0 &&
    typeof session.subject === 'string'
  )
}

export function loadSessions() {
  try {
    const storedValue = window.localStorage.getItem(SESSION_STORAGE_KEY)

    if (storedValue === null) {
      return { sessions: [], message: null }
    }

    const parsedValue = JSON.parse(storedValue)
    if (!Array.isArray(parsedValue)) {
      return {
        sessions: [],
        message: 'Saved sessions couldn’t be loaded; starting with an empty history.',
      }
    }

    const validSessions = parsedValue.filter(isValidSession)
    return {
      sessions: validSessions,
      message:
        validSessions.length === parsedValue.length
          ? null
          : 'Some saved sessions couldn’t be loaded in this browser.',
    }
  } catch {
    return {
      sessions: [],
      message: 'Saved sessions couldn’t be read in this browser.',
    }
  }
}

export function saveSessions(sessions) {
  try {
    window.localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessions))
    return { ok: true, message: null }
  } catch {
    return {
      ok: false,
      message: 'Couldn’t save this session in this browser.',
    }
  }
}
