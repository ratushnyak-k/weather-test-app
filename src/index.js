import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import {
  createStore,
  applyMiddleware,
  combineReducers,
} from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import createSagaMiddleware from 'redux-saga'
import {
  Router,
  Route,
  browserHistory,
  IndexRoute,
  Redirect,
} from 'react-router'
import {
  syncHistoryWithStore,
  routerReducer,
} from 'react-router-redux'

import App from './App'
import reducers from './reducers'
import rootSaga from './sagas'

import Main from './components/Main'
import Weather from './components/Weather'


const sagaMiddleware = createSagaMiddleware()

const store = createStore(
  combineReducers({
      ...reducers,
    routing: routerReducer
  }),
  composeWithDevTools(applyMiddleware(sagaMiddleware))
)
const history = syncHistoryWithStore(browserHistory, store)
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route component={App} path="/">
        <IndexRoute component={Main} />
        <Route path="/weather" component={Weather} />
        <Route path="/404" component={()=><div>ERROR!</div>} />
        <Redirect from="*" to="404" />
      </Route>
    </Router>
  </Provider>, document.getElementById('root'))
