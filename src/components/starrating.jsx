import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
function StarRating({ rating, setRating }) {
  function handleClick(star, event) {
    const box = event.currentTarget.getBoundingClientRect();
    const clickX = event.clientX - box.left;
    const isLeftHalf = clickX < box.width / 2;

    if (isLeftHalf) {
      setRating(star - 0.5);
    } else {
      setRating(star);
    }
  }

  function getStarDisplay(star) {
if (rating >= star) {
    return <FaStar />;
  }

  if (rating === star - 0.5) {
    return <FaStarHalfAlt />;
  }

  return <FaRegStar />;
}
    <div>
      <label className="block text-slate-300 mb-3">Rating</label>

      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={(e) => handleClick(star, e)}
            className="text-4xl text-yellow-400"
          >
            {getStarDisplay(star)}
          </button>
        ))}
      </div>

      <p className="text-slate-400 mt-2">{rating}/5</p>
    </div>
  
}

export default StarRating;  