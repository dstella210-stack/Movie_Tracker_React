import { createUser } from '../userApi'
import { useState } from 'react'
import posthog from '../posthog.js'

export default function CreateProfilePopup({
  onClose,
  onProfileCreated,
}) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] =
    useState(false)

  async function handleSubmit(event) {
    event.preventDefault()

    setError('')
    setIsSubmitting(true)

    try {
      const user = await createUser(
        name,
        username,
        password,
      )

      posthog.identify(String(user.id), { username: user.username })
      posthog.capture('profile_created')
      onProfileCreated(user)
    } catch (error) {
      posthog.captureException(error, { event: 'profile_creation_failed' })
      posthog.capture('profile_creation_failed')
      setError(error.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  function handleClose() {
    posthog.capture('profile_creation_cancelled')
    onClose()
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 px-4"
      onClick={handleClose}
    >
      <div
        className="w-full max-w-sm rounded-xl border border-white/10 bg-zinc-950 p-6 shadow-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-bold text-white">
              Create Profile
            </h2>

            <p className="mt-1 text-sm text-white/40">
              Choose a username and password.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            className="rounded px-2 text-xl text-white/40 hover:bg-white/10 hover:text-white"
          >
            ×
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4"
        >
          <div>
            <label
              htmlFor="username"
              className="mb-2 block text-sm text-white/70"
            >
              Username
            </label>

            <input
              id="username"
              type="text"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              placeholder="Enter a username"
              minLength={3}
              required
              autoComplete="username"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-green-500"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm text-white/70"
            >
              Password
            </label>

            <input
              id="password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              placeholder="Enter a password"
              minLength={8}
              required
              autoComplete="new-password"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-white outline-none placeholder:text-white/30 focus:border-green-500"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-sm text-red-400">
              {error}
            </p>
          )}

          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 rounded-lg border border-white/10 px-4 py-3 text-sm font-semibold text-white/70 hover:bg-white/5"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isSubmitting}
              className="flex-1 rounded-lg bg-green-500 px-4 py-3 text-sm font-semibold text-black hover:bg-green-400 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting
                ? 'Creating...'
                : 'Create Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}