import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function MovieCard({ id, title, year, rating, poster }) {
  const [liked, setLiked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [imgLoaded, setImgLoaded] = useState(false)
  const navigate = useNavigate()

  function handleLike(e) {
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
    navigate(`/movie/${id}`)
  }

  return (
    <div className="card" onClick={handleCardClick}>
      {poster ? (
        <>
          {!imgLoaded && (
            <div className="card-poster" style={{ background: 'linear-gradient(90deg, #1e1e2a 25%, #2a2a3a 50%, #1e1e2a 75%)', backgroundSize: '200% 100%', animation: 'shimmer 1.4s infinite' }} />
          )}
          <img
            src={poster}
            alt={title}
            className="card-poster"
            style={{ display: imgLoaded ? 'block' : 'none' }}
            onLoad={() => setImgLoaded(true)}
          />
        </>
      ) : (
        <div className="card-poster card-no-poster">No Image</div>
      )}

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