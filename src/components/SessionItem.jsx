import { useEffect, useId, useRef, useState } from 'react'
import './SessionItem.css'

const SUBJECT_MAX_LENGTH = 60

function SessionItem({ session, completedTime, onUpdateSubject, onDelete }) {
  const [isEditing, setIsEditing] = useState(false)
  const [draftSubject, setDraftSubject] = useState(session.subject)
  const inputId = useId()
  const inputRef = useRef(null)
  const editButtonRef = useRef(null)
  const restoreEditFocusRef = useRef(false)

  useEffect(() => {
    if (isEditing) {
      inputRef.current?.focus()
      inputRef.current?.select()
      return
    }

    if (restoreEditFocusRef.current) {
      restoreEditFocusRef.current = false
      editButtonRef.current?.focus()
    }
  }, [isEditing])

  const beginEditing = () => {
    setDraftSubject(session.subject)
    setIsEditing(true)
  }

  const finishEditing = () => {
    restoreEditFocusRef.current = true
    setIsEditing(false)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    const didSave = onUpdateSubject(session.id, draftSubject.trim())

    if (didSave) {
      finishEditing()
    }
  }

  const handleCancel = () => {
    setDraftSubject(session.subject)
    finishEditing()
  }

  const handleEditorKeyDown = (event) => {
    if (event.key === 'Escape') {
      event.preventDefault()
      handleCancel()
    }
  }

  return (
    <li className="session-card">
      <div className="session-card__content">
        {isEditing ? (
          <form
            className="subject-editor"
            aria-label={`Edit subject for focus session completed at ${completedTime}`}
            onSubmit={handleSubmit}
            onKeyDown={handleEditorKeyDown}
          >
            <label htmlFor={inputId}>Subject (optional)</label>
            <input
              id={inputId}
              ref={inputRef}
              type="text"
              value={draftSubject}
              maxLength={SUBJECT_MAX_LENGTH}
              autoComplete="off"
              onChange={(event) => setDraftSubject(event.target.value)}
            />
            <div className="subject-editor__footer">
              <span className="subject-editor__count">
                {draftSubject.length}/{SUBJECT_MAX_LENGTH} characters
              </span>
              <div className="subject-editor__actions">
                <button className="session-action session-action--save" type="submit">
                  Save
                </button>
                <button
                  className="session-action"
                  type="button"
                  onClick={handleCancel}
                >
                  Cancel
                </button>
              </div>
            </div>
          </form>
        ) : (
          <p className="session-card__subject">
            {session.subject || 'No subject added'}
          </p>
        )}

        <div className="session-card__meta">
          <time dateTime={session.completedAt}>{completedTime}</time>
          <span>{session.durationMinutes} minutes</span>
        </div>
      </div>

      {!isEditing && (
        <div className="session-card__actions">
          <button
            className="session-action session-action--edit"
            ref={editButtonRef}
            type="button"
            aria-label={`Edit subject for focus session completed at ${completedTime}`}
            onClick={beginEditing}
          >
            Edit
          </button>
          <button
            className="session-action session-action--delete"
            type="button"
            aria-label={`Delete focus session completed at ${completedTime}`}
            onClick={() => onDelete(session.id)}
          >
            Delete
          </button>
        </div>
      )}
    </li>
  )
}

export default SessionItem
