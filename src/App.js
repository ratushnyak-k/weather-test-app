import React from 'react'
import { Link } from 'react-router'
import {
  MuiThemeProvider,
  AppBar,
  FlatButton,
} from 'material-ui'

import 'normalize.css'
import './styles/index.styl'

class App extends React.Component {

  onDemoClick = () => {
    if (this.props.location.pathname !== '/weather') {
      this.props.router.push('/weather')
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div>
          <AppBar
            title={
              <Link
                to="/"
                className="logo"
              >
                Weather-test-app
              </Link>
            }
            iconElementRight={
              <FlatButton
                label="Demo"
                onClick={this.onDemoClick}
              />
            }
            showMenuIconButton={false}
          />
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default App
