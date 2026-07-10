import { useState } from 'react'
import ReviewCard from './ReviewCard'
import ReviewModal from './reviewmodal'

export default function ReviewList({ reviews }) {
  const [selected, setSelected] = useState(null)

  if (reviews.length === 0) return null

  return (
    <section className="mt-10">
      <h2 className="text-lg font-bold text-white mb-4">Saved Reviews</h2>
      <div className="space-y-4">
        {reviews.map((r) => (
          <ReviewCard key={r.id} review={r} onView={() => setSelected(r)} />
        ))}
      </div>
      {selected && <ReviewModal review={selected} onClose={() => setSelected(null)} />}
    </section>
  )
}
