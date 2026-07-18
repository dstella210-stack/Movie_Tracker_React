export default function SignupForm({ onSuccess, onCancel }) {
  return (
    <section className="mt-10 rounded-xl border border-white/10 bg-white/5 p-8">
      <h2 className="text-2xl font-bold text-white mb-2">
        Create Profile
      </h2>

      <p className="text-white/40 mb-8">
        Create a profile to save your movie reviews.
      </p>

      <button
        onClick={onCancel}
        className="border border-white/10 hover:border-white/20 px-5 py-2 rounded-lg"
      >
        Back
      </button>
    </section>
)
}