import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

function ReviewModal({ review, onClose }) {
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
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 px-4">
      <div className="bg-slate-900 border border-slate-700 rounded-xl p-6 max-w-2xl w-full">
        <div className="flex gap-5">
          <div className="w-24 h-36 bg-slate-800 border border-slate-700 rounded-lg shrink-0 overflow-hidden flex items-center justify-center">
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

          <div>
            <h2 className="text-2xl font-bold text-white">{review.title}</h2>

            <div className="flex gap-1 text-yellow-400 text-xl mt-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <span key={star}>{getStarIcon(star)}</span>
              ))}
            </div>

            <p className="text-slate-400 text-sm mt-1">
              {review.rating}/5 · {review.date}
            </p>
          </div>
        </div>

        <label className="block text-slate-300 mt-6 mb-2">
          Original Review
        </label>

        <textarea
          value={review.review}
          readOnly
          rows="8"
          className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white resize-none focus:outline-none"
        />

        <button
          type="button"
          onClick={onClose}
          className="mt-5 bg-slate-700 hover:bg-slate-600 px-5 py-2 rounded-lg font-semibold transition"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default ReviewModal;