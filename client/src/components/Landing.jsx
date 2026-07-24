import posthog from '../posthog.js'

export default function LandingCard({ onStartReview }) {
  function handleStartReview() {
    posthog.capture('review_form_opened')
    onStartReview()
  }

  return (
    <section className="mt-10">
      <div className="rounded-xl border border-white/10 bg-white/5 p-8 text-center">
        <h2 className="text-2xl font-bold text-white mb-2 ">Review your latest watch</h2>
        <p className="text-white/50 text-sm mb-6">Create your own personalized movie directory</p>
        <button
          onClick={handleStartReview}
          className="bg-green-600 hover:bg-green-500 text-white px-7 py-2.5 rounded-lg font-semibold text-sm transition-colors"
        >
          Start your review
        </button>
      </div>
    </section>
  )
}
