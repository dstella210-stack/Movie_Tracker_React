import StarRating from './StarRating'

export default function ReviewCard({ review, onView }) {
  return (
    <article className="group flex gap-6 bg-white/[0.04] border border-white/10 rounded-2xl p-5 hover:bg-white/[0.07] hover:border-white/20 transition-all">
      {/* Poster */}
      <div className="shrink-0">
        {review.poster ? (
          <img
            src={review.poster}
            alt={`${review.title} poster`}
            className="w-32 h-48 object-cover rounded-xl border border-white/10 shadow-lg"
          />
        ) : (
          <div className="w-32 h-48 rounded-xl border border-white/10 bg-white/5 flex items-center justify-center">
            <span className="text-white/20 text-xs text-center px-2">
              No Image
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0 flex flex-col">
        <div className="flex items-start justify-between gap-4">
          <h3 className="font-semibold text-white text-xl leading-tight">
            {review.title}
          </h3>

          <div className="shrink-0 ml-3">
            <StarRating rating={review.rating} readonly size="sm" />
          </div>
        </div>

        <p className="text-white/30 text-xs mt-1">
          {review.rating}/5 · {review.date}
        </p>

        {review.review && (
          <p className="text-white/60 text-sm mt-4 leading-relaxed line-clamp-4">
            {review.review}
          </p>
        )}

        <button
          onClick={onView}
          className="mt-auto pt-4 text-green-500 hover:text-green-400 text-sm font-medium text-left transition-colors"
        >
          Read full review →
        </button>
      </div>
    </article>
  )
}