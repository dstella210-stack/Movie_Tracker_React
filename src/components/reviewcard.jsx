import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ReviewCard({ review, onView }) {
  function getStarIcon(star) {
    if (review.rating >= star) {
      return <FaStar />;
    }

    if (review.rating === star - 0.5) {
      return <FaStarHalfAlt />;
    }

    return <FaRegStar />;
  }

  return (
    <article className="bg-slate-900 border border-slate-700 rounded-xl p-5 flex gap-5 items-start">
      <div className="w-20 h-28 bg-slate-800 border border-slate-700 rounded-lg shrink-0 overflow-hidden flex items-center justify-center">
        {review.poster ? (
          <img
            src={review.poster}
            alt={`${review.title} poster`}
            className="w-full h-full object-cover"
          />
        ) : (
          <span className="text-xs text-slate-500 text-center px-2">
            No Image
          </span>
        )}
      </div>

      <div className="flex-1">
        <h3 className="text-xl font-bold text-white">{review.title}</h3>

        <div className="flex gap-1 text-yellow-400 text-lg mt-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <span key={star}>{getStarIcon(star)}</span>
          ))}
        </div>

        <p className="text-slate-400 text-sm mt-1">
          {review.rating}/5 · {review.date}
        </p>

        <p className="text-slate-300 mt-4 leading-relaxed">
          {review.review}
        </p>
        <button
        type="button"
        onClick={onView}
        className="mt-4 bg-green-600 hover:bg-green-700 px-4 py-2 rounded-lg font-semibold transition"
      >
        View Review
      </button>
      </div>
    </article>
  );
}

export default ReviewCard;