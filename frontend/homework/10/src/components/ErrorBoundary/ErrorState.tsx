interface ErrorStateProps {
  title?: string
  message: string
  actionLabel?: string
  onAction?: () => void
}

// Error state component -> To show the error message with proper formatting
export default function ErrorState({
  title = 'Something went wrong',
  message,
  actionLabel,
  onAction,
}: Readonly<ErrorStateProps>) {
  return (
    <div className="state state-error" role="alert">
      <h3>{title}</h3>
      <p>{message}</p>
      {actionLabel && onAction && (
        <button className="btn btn-primary" onClick={onAction} type="button">
          {actionLabel}
        </button>
      )}
    </div>
  )
}