import './index.css'

const TrendingBooks = props => {
  const {trendingBooksListDetails} = props
  const {coverPic, title, authorName} = trendingBooksListDetails
  return (
    <div>
      <img src={coverPic} alt="cover-pic" className="cover-pic" />
      <h1 className="trending-title">{title}</h1>
      <p className="trending-author">{authorName}</p>
    </div>
  )
}

export default TrendingBooks
