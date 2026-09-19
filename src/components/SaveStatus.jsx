import './SaveStatus.css'

function SaveStatus({ status }) {
  return (
    <div className="storage-status-slot">
      {status && (
        <p
          className={`storage-status storage-status--${status.type}`}
          role="status"
          aria-live="polite"
          aria-atomic="true"
        >
          {status.message}
        </p>
      )}
    </div>
  )
}

export default SaveStatus
