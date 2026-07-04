
function LandingCard({onStartReview}) {
    return (
        <section className="flex justify-center items-center mt-20 text-white p-6 rounded-lg shadow-lg">
            <div className="w-full max-w-2xl p-[2px] rounded-xl bg-gradient-to-r from-green-500 via-blue-500 to-purple-500">
                <div className="rounded-xl p-10 text-center bg-gray-900">
                    <h2> Review your latest watch!</h2>
                    <p>Create your own personalized movie directory</p>
                    <button className="bg-green-600 hover:bg-green-700 border-2 border-slate-400 px-8 py-3 rounded-lg text-lg font-semibold transition"  onClick={onStartReview}> 
                        Start your review!
                    </button>
        </div>
        </div>
        </section>
    )
}
export default LandingCard