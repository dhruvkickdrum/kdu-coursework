interface LoadingProps {
  label?: string
}

// Component to show the loading spinner
export default function Loading({ label = 'Loading products...' }: Readonly<LoadingProps>) {
  return (
    <div className="state" aria-live="polite">
      <div className="spinner" />
      <p>{label}</p>
    </div>
  )
}
