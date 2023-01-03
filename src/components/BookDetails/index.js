import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'
import {BsFillStarFill} from 'react-icons/bs'
import Header from '../Header'

import './index.css'

const status = {
  initials: 'INITIALS',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

class BookDetails extends Component {
  state = {bookDetails: {}, apiStatus: status.initials}

  componentDidMount() {
    this.getParticularBook()
  }

  getParticularBook = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.setState({apiStatus: status.loading})
    const apiUrl = `https://apis.ccbp.in/book-hub/books/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()
      const fetchedData = data.book_details
      const book = {
        id: fetchedData.id,
        aboutAuthor: fetchedData.about_author,
        aboutBook: fetchedData.about_book,
        authorName: fetchedData.author_name,
        coverPic: fetchedData.cover_pic,
        rating: fetchedData.rating,
        readStatus: fetchedData.read_status,
        title: fetchedData.title,
      }
      this.setState({bookDetails: book, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failed})
    }
  }

  loaderView = () => (
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  retryResults = () => this.getParticularBook()

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

  renderSuccessful = () => {
    const {bookDetails} = this.state
    return (
      <div className="book-details-container">
        <div className="book-details-cont">
          <img
            src={bookDetails.coverPic}
            alt="title"
            className="book-details-image"
          />
          <div>
            <h1 className="book-details-heading">{bookDetails.title}</h1>
            <p className="book-details-paragraph">{bookDetails.authorName}</p>
            <p className="book-details-paragraph">
              Avg Rating: <BsFillStarFill className="star" />
              {`${bookDetails.rating}`}
            </p>
            <p className="book-details-status">
              Status:
              <span className="status-color">{bookDetails.readStatus}</span>
            </p>
          </div>
        </div>
        <hr />
        <h1 className="about-author-heading">About Author</h1>
        <p className="about-author-description">{bookDetails.aboutAuthor}</p>
        <h1 className="about-author-heading">About Book</h1>
        <p className="about-author-description">{bookDetails.aboutBook}</p>
      </div>
    )
  }

  renderBookDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'LOADING':
        return this.loaderView()

      case 'SUCCESS':
        return this.renderSuccessful()

      case 'FAILED':
        return this.failedView()

      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-container">
        <Header />

        <div>
          {this.renderBookDetails()}

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
      </div>
    )
  }
}

export default BookDetails
