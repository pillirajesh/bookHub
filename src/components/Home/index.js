import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import Loader from 'react-loader-spinner'
import Slider from 'react-slick'
import {FaGoogle, FaTwitter, FaInstagram, FaYoutube} from 'react-icons/fa'

import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

import TrendingBooks from '../TrendingBooks'
import Header from '../Header'

import './index.css'

const status = {
  initials: 'INITIALS',
  loading: 'LOADING',
  success: 'SUCCESS',
  failed: 'FAILED',
}

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
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
    <div className="loader-container" testid="loader">
      <Loader type="TailSpin" color="#0284C7" height={50} width={50} />
    </div>
  )

  retryResults = () => this.getTopRatedBooks()

  renderFailed = () => (
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
        <Header home />
        <h1 className="home-heading">Find Your Next Favorite Books?</h1>
        <p className="home-paragraph">
          You are in the right place. Tell us what titles or genres you have
          enjoyed in the past, and we will give you surprisingly insightful
          recommendations.
        </p>
        <div className="top-rated-books-container">
          <div className="top-rated-books">
            <h1 className="top-rated-heading">Top Rated Books</h1>

            <button className="find-button" type="button">
              <Link to="/shelf" className="link">
                Find Books
              </Link>
            </button>
          </div>

          <div className="slider-container">
            {this.renderSliderDetails()}

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
      </div>
    )
  }
}

export default Home
