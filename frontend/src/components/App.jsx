import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'

import { createStore,applyMiddleware,compose} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import appReducer,{initialState} from '../redux/reducers'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'

import Home from './Home'
import CreateAccount from './Auth/CreateAccount'
import LogIn from './Auth/LogIn'
import AddParking from './Add Parking/AddParking'
import Parkings from './Parking List/Parkings'
import Reservations from './Reservation List/Reservations'

const store = createStore(appReducer,initialState,compose(applyMiddleware(thunk),composeWithDevTools()))

const App = () => {
  return(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/createAccount'} component={CreateAccount}/>
          <Route path={'/logIn'} component={LogIn}/>
          <ProtectedRoute path={'/addParking'} component={AddParking}/>
          <ProtectedRoute path={'/parkings'} component={Parkings}/>
          <ProtectedRoute path={'/reservations'} component={Reservations}/>
        </Switch>
      </Router>
    </Provider>
  ) 
}

export default App