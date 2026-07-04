import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/header.jsx";
import LandingCard from "./components/Landing.jsx";
import ReviewForm from "./components/form.jsx";
import ReviewList from "./components/reviewlist.jsx";

function App() {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviews, setReviews] = useState(() => {
    const savedReviews = localStorage.getItem("reviews");

    if (savedReviews) {
      return JSON.parse(savedReviews);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem("reviews", JSON.stringify(reviews));
  }, [reviews]);

  function addReview(newReview) {
    setReviews([...reviews, newReview]);
    setShowReviewForm(false);
  }

  return (
    <main className="min-h-screen bg-gray-900 text-white">
      <Header />

      {showReviewForm ? (
        <ReviewForm addReview={addReview} />
      ) : (
        <>
          <LandingCard onStartReview={() => setShowReviewForm(true)} />
          <ReviewList reviews={reviews} />
        </>
      )}
    </main>
  );
}

export default App;