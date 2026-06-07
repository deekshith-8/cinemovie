import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MovieCard({ id, title, year, rating, poster }) {

  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)

  // useNavigate gives you a function to change the URL
  const navigate = useNavigate()

  function handleLike(e) {
    // e.stopPropagation stops the click from also triggering the card click
    e.stopPropagation()
    if (liked) {
      setLiked(false)
      setLikeCount(likeCount - 1)
    } else {
      setLiked(true)
      setLikeCount(likeCount + 1)
    }
  }

  function handleCardClick() {
    // this changes the URL to /movie/123
    // React Router sees this and renders DetailPage
    navigate(`/movie/${id}`)
  }

  return (
    <div className="card" onClick={handleCardClick}>
      {poster
        ? <img src={poster} alt={title} className="card-poster" />
        : <div className="card-poster card-no-poster">No Image</div>
      }

      <button
        className={liked ? "like-btn liked" : "like-btn"}
        onClick={handleLike}
      >
        ♥ {likeCount > 0 ? likeCount : ""}
      </button>

      <div className="card-info">
        <h3 className="card-title">{title}</h3>
        <div className="card-meta">
          <span className="card-year">{year}</span>
          <span className="card-rating">★ {rating}</span>
        </div>
      </div>
    </div>
  )
}

export default MovieCard