import { useEffect, useState } from 'react'
import Header from './components/Header'
import LandingCard from './components/Landing'
import ReviewForm from './components/Form'
import ReviewList from './components/Reviewlist'
import CreateProfilePopup from './components/createProfilePopup'
import { fetchActiveUser } from './userApi'
import posthog from './posthog'

export default function App() {
  const [reviews, setReviews] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [activeUser, setActiveUser] = useState(null)
  const [userLoadError, setUserLoadError] = useState('')

  const [showProfilePopup, setShowProfilePopup] = useState(false)

  useEffect(() => {
    fetchActiveUser()
      .then((user) => {
        setActiveUser(user)
        if (user?.id) {
          posthog.identify(String(user.id), { username: user.username })
        }
      })
      .catch(() =>
        setUserLoadError(
          'Could not reach the server to load user.'
        )
      )
  }, [])

  function addReview(review) {
    setReviews((prev) => [review, ...prev])
    setShowForm(false)
  }

  function handleProfileCreated(user) {
    setActiveUser(user)
    setShowProfilePopup(false)
  }

  function handleStartReview() {
    setShowForm(true)
    posthog.capture('review_form_opened')
  }

  function handleCreateProfileClick() {
    setShowProfilePopup(true)
    posthog.capture('create_profile_popup_opened')
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        activeUser={activeUser}
        onCreateProfile={handleCreateProfileClick}
      />

      <main className="max-w-3xl mx-auto px-4 pb-16">

        {userLoadError && (
          <p className="mt-4 text-red-400">
            {userLoadError}
          </p>
        )}

        {!showForm && (
          <LandingCard
            onStartReview={handleStartReview}
          />
        )}

        {showForm && (
          <ReviewForm
            addReview={addReview}
            onCancel={() => setShowForm(false)}
          />
        )}

        <ReviewList reviews={reviews} />
      </main>

      {showProfilePopup && (
        <CreateProfilePopup
          onClose={() => setShowProfilePopup(false)}
          onProfileCreated={handleProfileCreated}
        />
      )}
    </div>
  )
}