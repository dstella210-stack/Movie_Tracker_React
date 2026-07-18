import { useEffect, useState } from 'react'
import Header from './components/header'
import LandingCard from './components/Landing'
import ReviewForm from './components/form'
import ReviewList from './components/reviewlist'
import CreateProfilePopup from './components/createProfilePopup'
import { fetchActiveUser } from './userApi'

export default function App() {
  const [reviews, setReviews] = useState([])
  const [showForm, setShowForm] = useState(false)

  const [activeUser, setActiveUser] = useState(null)
  const [userLoadError, setUserLoadError] = useState('')

  const [showProfilePopup, setShowProfilePopup] = useState(false)

  useEffect(() => {
    fetchActiveUser()
      .then(setActiveUser)
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

  return (
    <div className="min-h-screen bg-black text-white">
      <Header
        activeUser={activeUser}
        onCreateProfile={() => setShowProfilePopup(true)}
      />

      <main className="max-w-3xl mx-auto px-4 pb-16">

        {userLoadError && (
          <p className="mt-4 text-red-400">
            {userLoadError}
          </p>
        )}

        {!showForm && (
          <LandingCard
            onStartReview={() => setShowForm(true)}
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