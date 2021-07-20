import React, {useState,useEffect} from 'react'
import { GLOBAL_TYPES } from './redux/actions/globalTypes'
import { useDispatch } from 'react-redux'

import { Container } from '@material-ui/core'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import Auth from './pages/auth/Auth'
import Header from './components/header/Header'
import HomePage from './pages/homepage/HomePage'
import Footer from './components/footer/Footer'

import { refresh_token } from './redux/actions/authAction'



const App = () => {
  const dispatch= useDispatch()


  // Refresh token every time dispatch is changed.
  useEffect(()=>{
    dispatch(refresh_token())
  },[dispatch])

  return (
    <BrowserRouter>
      <Container maxWidth='xl'>
        <Header/>
        <Switch>
          <Route path='/' exact component={()=><HomePage/>} />
          <Route path='/auth' exact component={()=><Auth/>} />
        </Switch>
        <Footer/>
      </Container>
    </BrowserRouter>
  )
}

export default App
