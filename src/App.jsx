import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import CompletionNotice from './components/CompletionNotice.jsx'
import SaveStatus from './components/SaveStatus.jsx'
import SessionItem from './components/SessionItem.jsx'
import { TIMER_MODES, useCountdown } from './hooks/useCountdown.js'
import {
  getNotificationPermission,
  requestNotificationPermission,
  showSystemNotification,
} from './utils/browserNotifications.js'
import { loadSessions, saveSessions } from './utils/sessionStorage.js'

const sessionTimeFormatter = new Intl.DateTimeFormat(undefined, {
  hour: 'numeric',
  minute: '2-digit',
})

const COMPLETION_COPY = Object.freeze({
  focus: Object.freeze({
    title: 'Focus session complete',
    message: 'Time for a break.',
  }),
  shortBreak: Object.freeze({
    title: 'Short break complete',
    message: 'Ready to focus?',
  }),
  longBreak: Object.freeze({
    title: 'Long break complete',
    message: 'Ready for your next focus session?',
  }),
})

const NOTIFICATION_PERMISSION_COPY = Object.freeze({
  default: 'Browser notifications are available to enable.',
  granted: 'Browser notifications are enabled.',
  denied: 'Browser notifications are blocked in browser settings.',
  unsupported: 'Browser notifications aren’t supported in this browser.',
})

function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`
}

function isToday(isoDate) {
  const date = new Date(isoDate)
  const now = new Date()

  return (
    date.getFullYear() === now.getFullYear() &&
    date.getMonth() === now.getMonth() &&
    date.getDate() === now.getDate()
  )
}

function App() {
  const [initialLoad] = useState(loadSessions)
  const [sessions, setSessions] = useState(initialLoad.sessions)
  const [storageStatus, setStorageStatus] = useState(
    initialLoad.message
      ? { type: 'error', message: initialLoad.message }
      : null,
  )
  const [notificationPermission, setNotificationPermission] = useState(
    getNotificationPermission,
  )
  const [isRequestingPermission, setIsRequestingPermission] = useState(false)
  const [completionNotices, setCompletionNotices] = useState([])
  const sessionsRef = useRef(initialLoad.sessions)
  const statusTimeoutRef = useRef(null)
  const historyHeadingRef = useRef(null)
  const shouldFocusHistoryRef = useRef(false)

  const clearStatusTimeout = useCallback(() => {
    if (statusTimeoutRef.current !== null) {
      window.clearTimeout(statusTimeoutRef.current)
      statusTimeoutRef.current = null
    }
  }, [])

  const showStorageStatus = useCallback(
    (type, message, duration = null) => {
      clearStatusTimeout()
      setStorageStatus({ type, message })

      if (duration !== null) {
        statusTimeoutRef.current = window.setTimeout(() => {
          statusTimeoutRef.current = null
          setStorageStatus(null)
        }, duration)
      }
    },
    [clearStatusTimeout],
  )

  const clearStorageStatus = useCallback(() => {
    clearStatusTimeout()
    setStorageStatus(null)
  }, [clearStatusTimeout])

  useEffect(() => clearStatusTimeout, [clearStatusTimeout])

  const commitSessions = useCallback(
    (nextSessions, showSaveConfirmation = false) => {
      const result = saveSessions(nextSessions)

      if (!result.ok) {
        showStorageStatus('error', result.message)
        return false
      }

      sessionsRef.current = nextSessions
      setSessions(nextSessions)

      if (showSaveConfirmation) {
        showStorageStatus('success', 'Session saved locally', 2000)
      } else {
        clearStorageStatus()
      }

      return true
    },
    [clearStorageStatus, showStorageStatus],
  )

  const handleRequestNotificationPermission = useCallback(async () => {
    setIsRequestingPermission(true)
    const permission = await requestNotificationPermission()
    setNotificationPermission(permission)
    setIsRequestingPermission(false)
  }, [])

  const handleDismissNotice = useCallback((noticeId) => {
    setCompletionNotices((currentNotices) =>
      currentNotices.filter((notice) => notice.id !== noticeId),
    )
  }, [])

  const handleComplete = useCallback(
    (completedMode) => {
      const completedAt = new Date()
      const completionCopy = COMPLETION_COPY[completedMode]

      setCompletionNotices((currentNotices) => [
        ...currentNotices,
        {
          id: crypto.randomUUID(),
          ...completionCopy,
        },
      ])

      void showSystemNotification({
        title: completionCopy.title,
        body: completionCopy.message,
      })

      if (completedMode !== 'focus') {
        return
      }

      const nextSessions = [
        ...sessionsRef.current,
        {
          id: crypto.randomUUID(),
          completedAt: completedAt.toISOString(),
          durationMinutes: 25,
          subject: '',
        },
      ]

      commitSessions(nextSessions, true)
    },
    [commitSessions],
  )

  const handleUpdateSubject = useCallback(
    (sessionId, subject) => {
      const nextSessions = sessionsRef.current.map((session) =>
        session.id === sessionId ? { ...session, subject } : session,
      )
      return commitSessions(nextSessions, true)
    },
    [commitSessions],
  )

  const handleDeleteSession = useCallback(
    (sessionId) => {
      const shouldDelete = window.confirm(
        'Delete this focus session? This cannot be undone.',
      )
      if (!shouldDelete) return

      const nextSessions = sessionsRef.current.filter(
        (session) => session.id !== sessionId,
      )
      if (commitSessions(nextSessions)) {
        shouldFocusHistoryRef.current = true
      }
    },
    [commitSessions],
  )

  useEffect(() => {
    if (!shouldFocusHistoryRef.current) return
    shouldFocusHistoryRef.current = false
    historyHeadingRef.current?.focus()
  }, [sessions])

  const {
    mode,
    remainingSeconds,
    isRunning,
    hasStarted,
    start,
    pause,
    reset,
    selectMode,
  } = useCountdown(handleComplete)

  const currentMode = TIMER_MODES[mode]
  const formattedTime = formatTime(remainingSeconds)
  const timerProgress = Math.max(0, Math.min(1, remainingSeconds / currentMode.seconds))
  const timerState = isRunning
    ? 'Running'
    : remainingSeconds === 0
      ? 'Complete'
      : hasStarted && remainingSeconds < currentMode.seconds
        ? 'Paused'
        : 'Ready'
  const primaryLabel = isRunning
    ? 'Running'
    : hasStarted && remainingSeconds > 0 && remainingSeconds < currentMode.seconds
      ? 'Resume'
      : 'Start'

  const todaySessions = useMemo(
    () =>
      sessions
        .filter((session) => isToday(session.completedAt))
        .toSorted(
          (first, second) =>
            new Date(second.completedAt).getTime() -
            new Date(first.completedAt).getTime(),
        ),
    [sessions],
  )
  const focusedMinutes = todaySessions.reduce(
    (total, session) => total + session.durationMinutes,
    0,
  )
  const permissionStatus = isRequestingPermission
    ? 'Waiting for your browser permission choice.'
    : NOTIFICATION_PERMISSION_COPY[notificationPermission]

  return (
    <div className="app-shell">
      <header className="app-header">
        <p className="app-kicker">Your study space</p>
        <h1>Study Focus Timer</h1>
        <p className="app-purpose">A quiet place for one focused session at a time.</p>
      </header>

      <main className="app-main">
        <section className="timer-workspace" aria-labelledby="timer-heading">
          <h2 className="visually-hidden" id="timer-heading">Focus timer</h2>

          <div className="mode-selector" role="group" aria-label="Timer mode">
            {Object.entries(TIMER_MODES).map(([modeKey, modeDetails]) => (
              <button
                className={`mode-button${mode === modeKey ? ' mode-button--active' : ''}`}
                type="button"
                aria-pressed={mode === modeKey}
                onClick={() => selectMode(modeKey)}
                key={modeKey}
              >
                {modeDetails.label}
              </button>
            ))}
          </div>

          <div
            className="timer-ring"
            data-running={isRunning}
            role="timer"
            aria-label={`${currentMode.name}, ${formattedTime} remaining. ${timerState}.`}
            style={{ '--timer-progress': `${timerProgress}turn` }}
          >
            <div className="timer-content">
              <span className="timer-mode">{currentMode.name}</span>
              <span className="timer-digits" aria-hidden="true">{formattedTime}</span>
              <span className="timer-state">{timerState}</span>
            </div>
          </div>

          <div className="timer-controls" role="group" aria-label="Timer controls">
            <button
              className="control-button control-button--primary"
              type="button"
              disabled={isRunning || remainingSeconds === 0}
              onClick={start}
            >
              {primaryLabel}
            </button>
            <button
              className="control-button control-button--secondary"
              type="button"
              disabled={!isRunning}
              onClick={pause}
            >
              Pause
            </button>
            <button
              className="control-button control-button--ghost"
              type="button"
              onClick={reset}
            >
              Reset
            </button>
          </div>

          <div className="notification-preference">
            <button
              className="control-button control-button--ghost notification-enable"
              type="button"
              disabled={notificationPermission !== 'default' || isRequestingPermission}
              onClick={handleRequestNotificationPermission}
            >
              {isRequestingPermission ? 'Requesting permission…' : 'Enable notifications'}
            </button>
            <p
              className="notification-permission-status"
              role="status"
              aria-live="polite"
              aria-atomic="true"
            >
              {permissionStatus}
            </p>
          </div>
        </section>

        <CompletionNotice
          notice={completionNotices[0] ?? null}
          onDismiss={handleDismissNotice}
        />

        <section className="today-section" aria-labelledby="today-heading">
          <div className="section-heading">
            <div>
              <p className="section-kicker">Your progress</p>
              <h2 id="today-heading">Today</h2>
            </div>
          </div>
          <dl className="summary-grid" aria-label="Today's study summary">
            <div className="summary-item"><dt>Completed sessions</dt><dd>{todaySessions.length}</dd></div>
            <div className="summary-item"><dt>Focused minutes</dt><dd>{focusedMinutes}</dd></div>
          </dl>
        </section>

        <section className="history-section" aria-labelledby="history-heading">
          <div className="history-heading">
            <div>
              <p className="section-kicker">Local history</p>
              <h2
                className="history-heading__focus-target"
                id="history-heading"
                ref={historyHeadingRef}
                tabIndex="-1"
              >
                Sessions today
              </h2>
            </div>
            <p className="save-scope">Saved in this browser</p>
          </div>

          <SaveStatus status={storageStatus} />

          {todaySessions.length === 0 ? (
            <div className="empty-state">
              <p className="empty-state__title">No focus sessions yet today.</p>
              <p>Start Focus 25 when you’re ready.</p>
            </div>
          ) : (
            <ul className="session-list">
              {todaySessions.map((session) => (
                <SessionItem
                  key={session.id}
                  session={session}
                  completedTime={sessionTimeFormatter.format(new Date(session.completedAt))}
                  onUpdateSubject={handleUpdateSubject}
                  onDelete={handleDeleteSession}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
