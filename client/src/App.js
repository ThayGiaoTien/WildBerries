import React from 'react'
import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Navbar from './components/header/Navbar'
const App = () => {
  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Navbar/>
        <Switch>
          <Route path='/auth' exact component={()=><Auth/>} />
        </Switch>
      </Container>
    </BrowserRouter>
  )
}

export default App
