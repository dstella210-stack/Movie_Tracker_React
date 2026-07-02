import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import Header from './components/header.jsx'
import LandingCard from './components/Landing.jsx'
import ReviewForm from "./components/form.jsx"

function App() {
  const [count, setCount] = useState(0)
  const [showReviewForm, setShowReviewForm] = useState(false)

  return (

  <main className="min-h-screen bg-gray-900 text-white">
    <Header />
    {
      showReviewForm
        ? <ReviewForm />
        : <LandingCard onStartReview={() => setShowReviewForm(true)} />
    }
    
  
  </main>

);  
}

export default App
