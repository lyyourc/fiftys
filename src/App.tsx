import React, { Component } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import theme from '@/styled/theme'
import HomePage from '@/pages/home'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" component={HomePage} />
        </Router>
      </ThemeProvider>
    )
  }
}

export default App
