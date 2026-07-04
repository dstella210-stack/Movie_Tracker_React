function ReviewCard({ review }) {
  return (
    <article className="bg-slate-900 border border-slate-700 rounded-xl p-6 flex gap-6">
      {review.poster && (
        <img
          src={review.poster}
          alt={`${review.title} poster`}
          className="w-28 h-40 object-cover rounded-lg"
        />
      )}

      <div>
        <h3 className="text-xl font-bold text-white">{review.title}</h3>
        <p className="text-green-400 mt-1">Rating: {review.rating}/5</p>
        <p className="text-slate-300 mt-4">{review.text}</p>
      </div>
    </article>
  );
}

export default ReviewCard;