import { useMemo } from 'react'

interface RatingProps {
  value: number
}

// component to show the rating
export default function Rating({ value }: Readonly<RatingProps>) {
  const clamped = useMemo(() => Math.min(5, Math.max(0, value)), [value])

  return (
    <div className="rating" aria-label={`Rating ${clamped.toFixed(1)} out of 5`}>
      <span className="rating_value">{clamped.toFixed(1)} ⭐</span>
    </div>
  )
}
