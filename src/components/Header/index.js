import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Header = props => {
  const logoutSuccess = () => {
    const {history} = props
    history.replace('/login')
    Cookies.remove('jwt_token')
  }

  return (
    <nav className="nav-container">
      <img
        src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672646149/Group_7731_yqdakw.png"
        className="nav-logo"
        alt="website logo"
      />
      <ul className="nav-button-container">
        <li className="list">
          <Link to="/" className="nav-home">
            Home
          </Link>
        </li>
        <li className="list">
          <Link to="/shelf" className="nav-bookshelves">
            Bookshelves
          </Link>
        </li>

        <button className="logout-button" type="button" onClick={logoutSuccess}>
          Logout
        </button>
      </ul>
    </nav>
  )
}
export default withRouter(Header)
