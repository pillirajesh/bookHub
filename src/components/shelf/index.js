import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'
import './index.css'

const status = {
  initials: 'INITIALS',
  success: 'SUCCESS',
  loading: 'LOADING',
  failed: 'FAILED',
}

const bookshelvesList = [
  {
    id: '22526c8e-680e-4419-a041-b05cc239ece4',
    value: 'ALL',
    label: 'All',
  },
  {
    id: '37e09397-fab2-46f4-9b9a-66b2324b2e22',
    value: 'READ',
    label: 'Read',
  },
  {
    id: '2ab42512-3d05-4fba-8191-5122175b154e',
    value: 'CURRENTLY_READING',
    label: 'Currently Reading',
  },
  {
    id: '361d5fd4-9ea1-4e0c-bd47-da2682a5b7c8',
    value: 'WANT_TO_READ',
    label: 'Want to Read',
  },
]

class Shelf extends Component {
  state = {
    shelfList: '',
    apiStatus: status.initials,
    searchText: '',
    bookshelfName: bookshelvesList[0].value,
    activeFilterLabel: bookshelvesList[0].label,
  }

  componentDidMount() {
    this.getFetchedData()
  }

  getFetchedData = async () => {
    this.setState({apiStatus: status.loading})
    const {searchText, bookshelfName} = this.state
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?shelf=${bookshelfName}&search=${searchText}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        rating: eachBook.rating,
        readStatus: eachBook.read_status,
        title: eachBook.title,
      }))
      this.setState({shelfList: fetchedData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failed})
    }
  }

  getSearchInput = event => {
    this.setState({searchText: event.target.value})
  }

  getSearchInputDetails = () => this.getFetchedData()

  successBookShelveDetails = () => {
    const {shelfList, searchText} = this.state

    return (
      <>
        {shelfList.length !== 0 ? (
          <ul className="shelve-list-container">
            {shelfList.map(eachShelf => (
              <li key={eachShelf.id} className="shelve-list">
                <Link to={`/books/${eachShelf.id}`}>
                  <img
                    src={eachShelf.coverPic}
                    alt={eachShelf.title}
                    className="shelve-cover-pic"
                  />
                </Link>
                <div className="title-cont">
                  <h1 className="shelve-title">{eachShelf.title}</h1>
                  <p className="shelve-author">{eachShelf.authorName}</p>
                  <div className="rating-cont">
                    <p className="shelve-rating">Avg Rating:</p>
                    <BsFillStarFill className="star" />
                    <p className="rating">{eachShelf.rating}</p>
                  </div>
                  <p className="status">
                    Status:
                    <span className="status-type">{eachShelf.readStatus}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <div className="no-search-results-container">
            <img
              src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672736996/Asset_1_1_qshk99.png"
              className="no-search-found-image"
              alt="no books"
            />
            <p className="no-search-paragraph">
              You search for {searchText} did not find any matches.
            </p>
          </div>
        )}
        <div className="shelf-books-container">
          <div className="footer-container">
            <div>
              <FaGoogle className="footer-image" />
              <FaTwitter className="footer-image" />
              <FaInstagram className="footer-image" />
              <FaYoutube className="footer-image" />
            </div>
            <p className="contact-us">Contact Us</p>
          </div>
        </div>
      </>
    )
  }

  retryResults = () => this.getFetchedData()

  failedView = () => (
    <div className="not-found-container">
      <img
        src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672738009/Group_7522_oumgim.png"
        className="failed-image"
        alt="failure view"
      />
      <p className="no-search-paragraph">
        Something went wrong, Please try again.
      </p>
      <button className="try-button" type="button" onClick={this.retryResults}>
        Try Again
      </button>
    </div>
  )

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderBookShelveDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'SUCCESS':
        return this.successBookShelveDetails()

      case 'LOADING':
        return this.loaderView()

      case 'FAILED':
        return this.failedView()

      default:
        return null
    }
  }

  render() {
    const {searchText, bookshelfName, activeFilterLabel} = this.state
    return (
      <div>
        <div className="home-container">
          <Header shelf />
          <div className="divide-container">
            <div className="side-container">
              <h1 className="book-shelve-heading">Bookshelves</h1>
              <ul className="unordered-list">
                {bookshelvesList.map(eachShelve => {
                  const activeItem =
                    eachShelve.label === bookshelfName ? 'active-item' : ''
                  const searchType = () => {
                    this.setState(
                      {
                        bookshelfName: eachShelve.value,
                        activeFilterLabel: eachShelve.label,
                      },
                      this.getFetchedData,
                    )
                  }
                  return (
                    <li key={eachShelve.id} className="list">
                      <button
                        type="button"
                        className={`list-button ${activeItem}`}
                        onClick={searchType}
                      >
                        {eachShelve.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
            <div className="middle-container">
              <div className="search-container">
                <h1 className="all-books-heading">{activeFilterLabel} Books</h1>
                <div>
                  <input
                    type="search"
                    className="search"
                    placeholder="Search"
                    value={searchText}
                    onChange={this.getSearchInput}
                  />
                  <button
                    type="button"
                    className="search-button"
                    onClick={this.getSearchInputDetails}
                    testid="searchButton"
                  >
                    <BsSearch />
                  </button>
                </div>
              </div>
              {this.renderBookShelveDetails()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Shelf
