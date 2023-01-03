import {Link} from 'react-router-dom'
import './index.css'

const TrendingBooks = props => {
  const {trendingBooksListDetails} = props
  const {coverPic, title, authorName, id} = trendingBooksListDetails
  return (
    <div>
      <Link to={`/books/${id}`}>
        <img src={coverPic} alt="title" className="cover-pic" />
      </Link>
      <h1 className="trending-title">{title}</h1>
      <p className="trending-author">{authorName}</p>
    </div>
  )
}

export default TrendingBooks
