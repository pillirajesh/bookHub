import {Link} from 'react-router-dom'
import './index.css'

const NotFound = () => (
  <div className="not-found-container">
    <img
      src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672735997/Group_7484_v5ushj.png"
      className="not-found"
      alt="not found"
    />
    <h1 className="not-found-heading">Page Not Found</h1>
    <p className="not-found-paragraph">
      we are sorry, the page you requested could not be found, Please go back to
      the homepage.
    </p>
    <Link to="/">
      <button type="button" className="not-found-button">
        Go Back To Home
      </button>
    </Link>
  </div>
)

export default NotFound
