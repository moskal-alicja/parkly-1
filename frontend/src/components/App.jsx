import React from 'react'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'

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

const store = createStore(appReducer,initialState,compose(applyMiddleware(thunk),composeWithDevTools()))

const App = () => {
  return(
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path={'/'} exact component={Home}/>
          <Route path={'/createAccount'} component={CreateAccount}/>
          <Route path={'/logIn'} component={LogIn}/>
          <Route path={'/addParking'} component={AddParking}/>
          <Route path={'/parkings'} component={Parkings}/>
        </Switch>
      </Router>
    </Provider>
  ) 
}

export default App