import {Component} from 'react'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsSearch, BsFillStarFill} from 'react-icons/bs'
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
    activeTab: false,
  }

  componentDidMount() {
    this.getFetchedData()
  }

  getFetchedData = async () => {
    this.setState({apiStatus: status.loading})
    const {searchText, bookshelfName} = this.state
    console.log(bookshelfName)
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/book-hub/books?${bookshelfName}&search=${searchText}`
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

  searchType = label => {
    this.setState({bookshelfName: label, activeTab: true}, this.getFetchedData)
  }

  getSearchInputDetails = () => this.getFetchedData()

  successBookShelveDetails = () => {
    const {shelfList} = this.state

    return (
      <>
        <ul className="shelve-list-container">
          {shelfList.map(eachShelf => (
            <li key={eachShelf.id} className="shelve-list">
              <img
                src={eachShelf.coverPic}
                alt="cover pic"
                className="shelve-cover-pic"
              />
              <div>
                <h1 className="shelve-title">{eachShelf.title}</h1>
                <p className="shelve-author">{eachShelf.authorName}</p>
                <p className="shelve-rating">
                  Average Rating: <BsFillStarFill className="star" />
                  <span className="rating">{eachShelf.rating}</span>
                </p>
                <p className="status">
                  Status:
                  <span className="status-type">{eachShelf.readStatus}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
        <div className="shelf-books-container">
          <div className="slider-container">
            <FaGoogle className="google" />
            <FaTwitter className="twitter" />
            <FaInstagram className="instagram" />
            <FaYoutube className="you-tube" />

            <p className="contact-us">Contact Us</p>
          </div>
        </div>
      </>
    )
  }

  loaderView = () => (
    <div className="loader-container">
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

      default:
        return null
    }
  }

  render() {
    const {searchText, activeTab} = this.state
    return (
      <div>
        <div className="home-container">
          <nav className="nav-container">
            <img
              src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672646149/Group_7731_yqdakw.png"
              className="nav-logo"
              alt="website logo"
            />
            <div className="nav-button-container">
              <Link to="/" className="nav-home">
                Home
              </Link>
              <Link to="/shelf" className="nav-bookshelves">
                Book Shelves
              </Link>

              <button className="logout-button" type="button">
                Logout
              </button>
            </div>
          </nav>
          <div className="divide-container">
            <div className="side-container">
              <h1 className="book-shelve-heading">Book Shelves</h1>
              <ul className="unordered-list">
                {bookshelvesList.map(eachShelve => (
                  <li key={eachShelve.id} className="list">
                    {activeTab ? (
                      <button
                        type="button"
                        className="list-button-color"
                        onClick={() => this.searchType(eachShelve.label)}
                      >
                        {eachShelve.label}
                      </button>
                    ) : (
                      <button
                        type="button"
                        className="list-button"
                        onClick={() => this.searchType(eachShelve.label)}
                      >
                        {eachShelve.label}
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            <div className="middle-container">
              <div className="search-container">
                <h1 className="all-books-heading">All Books</h1>
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
