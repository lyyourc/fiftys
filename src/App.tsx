import React, { Component } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import theme from '@/styled/theme'
import HomePage from '@/pages/home'
import { css, Global } from '@emotion/core'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router>
          <Route exact path="/" component={HomePage} />
        </Router>
        <Global
          styles={css`
            *:not(img) {
              box-sizing: border-box;
              -webkit-tap-highlight-color: transparent;
            }

            body {
              font-family: 'Neucha', Arial, Helvetica, sans-serif;
            }
          `}
        />
      </ThemeProvider>
    )
  }
}

export default App
