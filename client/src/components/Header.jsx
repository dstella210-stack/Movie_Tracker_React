import posthog from '../posthog.js'

export default function Header({ activeUser, onCreateProfile }) {
  return (
    <header className="border-b border-white/10 bg-black sticky top-0 z-40">
      <div className="max-w-3xl mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="text-green-500 text-xl">🎬</span>

          <div>
            <h1 className="text-xl font-bold text-white leading-none">
              Movie Tracker
            </h1>

            <p className="text-xs text-white/40 mt-0.5">
              Keep track of your favorite films
            </p>
          </div>
        </div>

        {activeUser ? (
          <div className="text-right">
            <p className="text-xs text-white/40">
              Active User
            </p>

            <p className="text-sm font-semibold text-green-400">
              {activeUser.name}
            </p>
          </div>
        ) : (
          <button
            onClick={() => {
              posthog.capture('profile_creation_started')
              onCreateProfile()
            }}
            className="rounded-lg bg-green-500 px-4 py-2 font-semibold text-black transition hover:bg-green-400"
          >
            Create Profile
          </button>
        )}
      </div>
    </header>
  )
}