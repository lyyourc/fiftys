import React, { Component } from 'react'
import { ThemeProvider } from 'emotion-theming'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Global } from '@emotion/core'
import theme from '@/styled/theme'
import globalStyle from '@/styled/global'
import HomePage from '@/pages/home'
import FqaPage from '@/pages/fqa'
import Navbar from '@/components/navbar'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Router basename={process.env.PUBLIC_URL}>
          <>
            <Route exact path="/" component={HomePage} />
            <Route path="/fqa" component={FqaPage} />
            {/* <Navbar /> */}
          </>
        </Router>
        <Global styles={globalStyle} />
      </ThemeProvider>
    )
  }
}

export default App
