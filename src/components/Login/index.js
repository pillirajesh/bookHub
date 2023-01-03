import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMessage: '',
    isError: false,
  }

  changeUserDetails = event => {
    this.setState({username: event.target.value})
  }

  changePasswordDetails = event => {
    this.setState({password: event.target.value})
  }

  loginSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({errorMessage: errorMsg})
  }

  loginForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      console.log(data)
      this.loginSuccess(data.jwt_token)
    } else {
      this.setState({isError: true})
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {isError, username, password, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-page-container">
        <img
          src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672646191/Rectangle_1467_s0qkjy.png"
          alt="website login"
          className="login-image"
        />
        <div className="login-container">
          <form className="login-details-container" onSubmit={this.loginForm}>
            <img
              src="https://res.cloudinary.com/dtguk3nmz/image/upload/v1672646149/Group_7731_yqdakw.png"
              className="logo"
              alt="login website logo"
            />
            <div>
              <label htmlFor="username" className="label">
                Username*
              </label>
              <br />
              <input
                type="text"
                className="input-username"
                placeholder="Username"
                id="username"
                onChange={this.changeUserDetails}
                value={username}
              />
              <br />
              <label htmlFor="password" className="label">
                Password*
              </label>
              <br />
              <input
                type="password"
                className="input-password"
                placeholder="Password"
                id="password"
                onChange={this.changePasswordDetails}
                value={password}
              />
              <br />
              {isError && <p className="error">{errorMessage}</p>}
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default Login
