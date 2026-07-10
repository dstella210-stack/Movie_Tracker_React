import { useState } from 'react'
import Header from './components/header'
import LandingCard from './components/Landing'
import ReviewForm from './components/form'
import ReviewList from './components/reviewlist'

export default function App() {
  const [reviews, setReviews] = useState([])
  const [showForm, setShowForm] = useState(false)

  function addReview(r) {
    setReviews((prev) => [r, ...prev])
    setShowForm(false)
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="max-w-3xl mx-auto px-4 pb-16">
        {!showForm && (
          <LandingCard onStartReview={() => setShowForm(true)} />
        )}
        {showForm && (
          <ReviewForm addReview={addReview} onCancel={() => setShowForm(false)} />
        )}
        <ReviewList reviews={reviews} />
      </main>
    </div>
  )
}
