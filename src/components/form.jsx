import { useState } from 'react'
import StarRating from './StarRating'
import { getMoviePoster } from './movieapi.js'

export default function ReviewForm({ addReview, onCancel }) {
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!title.trim()) return
    setLoading(true)
    const movie = await getMoviePoster(title)
    addReview({
      id: crypto.randomUUID(),
      title,
      review,
      rating,
      poster: movie.Poster,
      date: new Date().toLocaleDateString(),
    })
    setLoading(false)
  }

  return (
    <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-2xl font-bold text-white mb-1">New Movie Review</h2>
      <p className="text-white/40 text-sm mb-8">Add a movie, rate it, and write your review.</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Movie Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Interstellar"
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 focus:outline-none focus:border-green-500 transition-colors text-sm"
            required
          />
        </div>

        <div>
          <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Date</label>
          <input
            type="text"
            readOnly
            value={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white/30 text-sm cursor-default"
          />
        </div>

        <StarRating rating={rating} setRating={setRating} />

        <div>
          <label className="block text-white/50 text-xs uppercase tracking-widest mb-2">Review</label>
          <textarea
            rows={6}
            value={review}
            onChange={(e) => setReview(e.target.value)}
            placeholder="Write your thoughts..."
            className="w-full bg-black border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/20 resize-none focus:outline-none focus:border-green-500 transition-colors text-sm leading-relaxed"
          />
        </div>

        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={loading || !title.trim()}
            className="bg-green-600 hover:bg-green-500 disabled:opacity-40 disabled:cursor-not-allowed text-white px-7 py-2.5 rounded-lg font-semibold text-sm transition-colors"
          >
            {loading ? 'Saving…' : 'Save Review'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="border border-white/10 hover:border-white/30 text-white/50 hover:text-white px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </section>
  )
}
