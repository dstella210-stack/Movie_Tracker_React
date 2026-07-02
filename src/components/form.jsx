import StarRating from "./starrating";

function ReviewForm() {
  return (
    <section className="max-w-4xl mx-auto mt-16 bg-slate-900 border border-slate-700 rounded-xl p-8">
      <h2 className="text-3xl font-bold mb-2">New Movie Review</h2>

      <p className="text-slate-400 mb-8">
        Add a movie, rate it, and write your review.
      </p>

      <form className="space-y-6">
        <div>
          <label className="block text-slate-300 mb-2">Movie Title</label>
          <input
            type="text"
            placeholder="Ex: Interstellar"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
          />
        </div>

        <div>
          <label className="navBar text-slate-300 mb-2">
            Date
          </label>

          <input
            type="text"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-green-500"
              value= {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                month: "long",
                day: "numeric",
                year: "numeric",
            })}
            readOnly
          />
        </div>

        <StarRating />

        <div>
          <label className="block text-slate-300 mb-2">Review</label>
          <textarea
            rows="6"
            placeholder="Write your thoughts..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-500 resize-none focus:outline-none focus:border-green-500"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 px-8 py-3 rounded-lg font-semibold transition"
        >
          Save Review
        </button>
      </form>
    </section>
  );
}

export default ReviewForm;
