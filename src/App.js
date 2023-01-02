import {Switch, Route} from 'react-router-dom'
import './App.css'
import Login from './components/Login'
import Home from './components/Home'
import Shelf from './components/shelf'

// use the below bookshelvesList for rendering read status of book items in Bookshelves Route

const App = () => (
  <div className="app-container">
    <Switch>
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route exact path="/shelf" component={Shelf} />
    </Switch>
  </div>
)

export default App
