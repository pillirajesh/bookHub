import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {FiMenu} from 'react-icons/fi'

import './index.css'

class Header extends Component {
  state = {isTrue: false}

  logoutSuccess = () => {
    const {history} = this.props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  onClickMenu = () => {
    this.setState(prevState => ({isTrue: !prevState.isTrue}))
  }

  render() {
    const {isTrue} = this.state

    const {home, shelf} = this.props
    const homeActive = home ? 'change-tab-color' : ''
    const shelfActive = shelf ? 'change-tab-color' : ''
    console.log(homeActive)
    console.log(shelfActive)

    return (
      <>
        <div>
          <nav className="nav-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672646149/Group_7731_yqdakw.png"
                className="nav-logo"
                alt="website logo"
              />
            </Link>
            <ul className="nav-button-container">
              <Link to="/" className="link">
                <li className={`nav-home ${homeActive} `}>Home</li>
              </Link>

              <Link to="/shelf" className="link">
                <li className={`nav-bookshelves ${shelfActive} `}>
                  Bookshelves
                </li>
              </Link>

              <li className="list">
                <button
                  className="logout-button"
                  type="button"
                  onClick={this.logoutSuccess}
                >
                  Logout
                </button>
              </li>
            </ul>
          </nav>

          <div className="responsive-container">
            <div className="responsive-header-container">
              <Link to="/">
                <img
                  src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672646149/Group_7731_yqdakw.png"
                  className="res-logo"
                  alt="website logo"
                />
              </Link>
              <button
                onClick={this.onClickMenu}
                type="button"
                className="menu-button"
              >
                <FiMenu className="menu-icon" />
              </button>
            </div>
            {isTrue && (
              <>
                <div className="header-navbar-tabs-container">
                  <Link className="link" to="/">
                    <h1 className={`nav-home ${homeActive}`}>Home</h1>
                  </Link>
                  <Link className="link" to="/shelf">
                    <h1 className={`nav-home ${shelfActive}`}>BookShelves</h1>
                  </Link>
                </div>
                <div className="header-navbar-tabs-container">
                  <button
                    onClick={this.logoutSuccess}
                    className="logout-button"
                    type="button"
                  >
                    Logout
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </>
    )
  }
}
export default withRouter(Header)
