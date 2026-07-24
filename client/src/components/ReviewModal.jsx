import { useEffect } from 'react'
import StarRating from './Starrating'

export default function ReviewModal({ review, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 px-4"
      onClick={onClose}
    >
      <div
        className="bg-zinc-950 border border-white/10 rounded-2xl p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex gap-6 mb-8">
          <div className="w-32 h-48 shrink-0 rounded-xl overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center">
            {review.poster ? (
              <img
                src={review.poster}
                alt={`${review.title} poster`}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-white/20 text-xs text-center px-2">
                No Image
              </span>
            )}
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-white leading-snug">
              {review.title}
            </h2>

            <div className="mt-3">
              <StarRating rating={review.rating} readonly />
            </div>

            <p className="text-white/30 text-sm mt-2">
              {review.rating}/5 · {review.date}
            </p>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6">
          <label className="block text-white/30 text-xs uppercase tracking-widest mb-3">
            Review
          </label>

          <p className="text-white/70 text-base leading-relaxed whitespace-pre-wrap">
            {review.review || 'No written review.'}
          </p>
        </div>

        <button
          onClick={onClose}
          className="mt-8 border border-white/10 hover:border-white/25 text-white/50 hover:text-white px-5 py-2 rounded-lg text-sm transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  )
}