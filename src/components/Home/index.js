import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import TrendingBooks from '../TrendingBooks'

import './index.css'

const status = {
  initials: 'INITIALS',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

const settings = {
  dots: false,
  slidesToShow: 3,
  slidesToScroll: 3,
}

class Home extends Component {
  state = {trendingBooksList: '', apiStatus: status.initials}

  componentDidMount() {
    this.getTopRatedBooks()
  }

  getTopRatedBooks = async () => {
    this.setState({apiStatus: status.loading})
    const apiUrl = 'https://apis.ccbp.in/book-hub/top-rated-books'
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
      const fetchedData = data.books.map(eachBook => ({
        id: eachBook.id,
        authorName: eachBook.author_name,
        coverPic: eachBook.cover_pic,
        title: eachBook.title,
      }))
      this.setState({trendingBooksList: fetchedData, apiStatus: status.success})
    } else {
      this.setState({apiStatus: status.failed})
    }
  }

  renderSuccessful = () => {
    const {trendingBooksList} = this.state

    return (
      <Slider {...settings}>
        {trendingBooksList.map(eachBook => (
          <TrendingBooks
            trendingBooksListDetails={eachBook}
            key={eachBook.id}
          />
        ))}
      </Slider>
    )
  }

  loaderView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  renderSliderDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case 'LOADING':
        return this.loaderView()

      case 'SUCCESS':
        return this.renderSuccessful()

      case 'FAILED':
        return this.renderFailed()

      default:
        return null
    }
  }

  render() {
    return (
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

        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-paragraph">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div className="top-rated-books-container">
          <div className="top-rated-books">
            <h1 className="top-rated-heading">Top Rated Books</h1>

            <Link to="/shelf" className="link">
              Find Books
            </Link>
          </div>

          <div className="slider-container">
            {this.renderSliderDetails()}

            <FaGoogle className="google" />
            <FaTwitter className="twitter" />
            <FaInstagram className="instagram" />
            <FaYoutube className="you-tube" />

            <p className="contact-us">Contact Us</p>
          </div>
        </div>
      </div>
    )
  }
}

export default Home
