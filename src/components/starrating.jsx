import {useEffect, useState} from 'react'
function StarRating() {
  const [rating, setRating] = useState(0);

  return (
    <div>
      <label className="block text-slate-300 mb-3">
        Rating
      </label>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            className={`text-4xl ${
              star <= rating ? "text-yellow-400" : "text-slate-500"
            }`}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}

export default StarRating;  