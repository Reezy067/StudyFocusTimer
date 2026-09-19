import './CompletionNotice.css'

function CompletionNotice({ notice, onDismiss }) {
  if (!notice) {
    return null
  }

  return (
    <aside
      className="completion-notice"
      role="status"
      aria-live="polite"
      aria-atomic="true"
    >
      <div>
        <p className="completion-notice__kicker">Timer complete</p>
        <h2>{notice.title}</h2>
        <p className="completion-notice__message">{notice.message}</p>
      </div>
      <button
        className="completion-notice__dismiss"
        type="button"
        onClick={() => onDismiss(notice.id)}
      >
        Dismiss
      </button>
    </aside>
  )
}

export default CompletionNotice
