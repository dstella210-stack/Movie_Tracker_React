import ReviewCard from "./ReviewCard";

function ReviewList({ reviews }) {
  return (
    <section className="max-w-4xl mx-auto mt-12 px-4 pb-12">
      <h2 className="text-2xl font-bold text-white mb-6">Saved Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-slate-400">No reviews saved yet.</p>
      ) : (
        <div className="space-y-5">
          {reviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>
      )}
    </section>
  );
}

export default ReviewList;