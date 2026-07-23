import { useState } from "react";
import ReviewCard from "./Reviewcard";
import ReviewModal from "./ReviewModal";
import posthog from "../posthog";

export default function ReviewList({ reviews, onLog }) {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-10">
      <div className="flex items-end justify-between mb-6">
        <div>
          <h2 className="text-white font-black text-lg uppercase tracking-wide">
            Saved Reviews
          </h2>

          <p className="text-xs mt-0.5 text-gray-600">
            {reviews.length} film{reviews.length !== 1 ? "s" : ""} logged
          </p>
        </div>

        <button
          onClick={() => {
            posthog.capture('log_film_clicked')
            if (onLog) onLog()
          }}
          className="text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg border border-[#222] text-gray-500 transition-colors hover:text-white"
        >
          + Log film
        </button>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(130px,1fr))] gap-5">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onView={() => {
              posthog.capture('review_viewed', { rating: review.rating })
              setSelected(review)
            }}
          />
        ))}
      </div>

      {selected && (
        <ReviewModal
          review={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </section>
  );
}