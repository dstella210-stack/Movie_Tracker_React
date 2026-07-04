
import ReviewCard from "./ReviewCard";

function ReviewList({ reviews }) {
  return (
    <section className="max-w-4xl mx-auto mt-10 space-y-6">
      <h2 className="text-2xl font-bold text-white">Saved Reviews</h2>

      {reviews.length === 0 ? (
        <p className="text-slate-400">No reviews saved yet.</p>
      ) : (
        reviews.map((review) => (
          <ReviewCard key={review.id} review={review} />
        ))
      )}
    </section>
  );
}

export default ReviewList;