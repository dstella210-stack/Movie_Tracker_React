import { useState } from 'react'
import StarRating from './StarRating'
import { getMoviePoster } from './Movieapi.js'

export default function ReviewForm({ addReview, onCancel }) {
  const [title, setTitle] = useState('')
  const [review, setReview] = useState('')
  const [rating, setRating] = useState(0)
  const [loading, setLoading] = useState(false)
  const [submitError, setSubmitError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()

    if (!title.trim() || loading) return

    setLoading(true)
    setSubmitError('')

    try {
      const movie = await getMoviePoster(title.trim())

      addReview({
        id: crypto.randomUUID(),
        title: title.trim(),
        review: review.trim(),
        rating,
        poster: movie?.Poster,
        date: new Date().toLocaleDateString(),
      })
    } catch (error) {
      setSubmitError('The movie could not be saved. Check the title or server connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section className="pt-8 sm:pt-10">
      <div className="overflow-hidden rounded-3xl border border-white/10 bg-[#0d0d0d] shadow-2xl shadow-black/30">
        <div className="border-b border-white/10 bg-gradient-to-r from-green-500/10 to-transparent px-6 py-6 sm:px-8">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-green-400">New entry</p>
          <h2 className="mt-2 text-3xl font-black tracking-tight text-white">Review your latest watch</h2>
          <p className="mt-2 text-sm text-white/45">Add the movie, choose a rating, and save your thoughts.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-7 p-6 sm:p-8">
          {submitError && (
            <div className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">
              {submitError}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-[1.4fr_1fr]">
            <div>
              <label htmlFor="movie-title" className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                Movie title
              </label>
              <input
                id="movie-title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Interstellar"
                className="w-full rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-green-400/70 focus:ring-2 focus:ring-green-500/10"
                required
                autoFocus
              />
            </div>

            <div>
              <label htmlFor="review-date" className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
                Date watched
              </label>
              <input
                id="review-date"
                type="text"
                readOnly
                value={new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
                className="w-full cursor-default rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm text-white/40 outline-none"
              />
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
            <StarRating rating={rating} setRating={setRating} />
          </div>

          <div>
            <label htmlFor="movie-review" className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/40">
              Your review
            </label>
            <textarea
              id="movie-review"
              rows={7}
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="What worked, what did not, and how did the movie leave you feeling?"
              className="w-full resize-none rounded-xl border border-white/10 bg-black/60 px-4 py-3.5 text-sm leading-7 text-white outline-none transition placeholder:text-white/20 focus:border-green-400/70 focus:ring-2 focus:ring-green-500/10"
            />
          </div>

          <div className="flex flex-col-reverse gap-3 border-t border-white/10 pt-6 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onCancel}
              className="rounded-xl border border-white/10 px-5 py-3 text-sm font-semibold text-white/55 transition hover:border-white/20 hover:bg-white/5 hover:text-white"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading || !title.trim()}
              className="rounded-xl bg-green-500 px-6 py-3 text-sm font-bold text-black transition hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {loading ? 'Saving review…' : 'Save review'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}