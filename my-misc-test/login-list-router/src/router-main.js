import React from 'react'
import { Switch, Route } from 'react-router-dom'
import ListRoster from './list/list-router'
import LoginForm from './login/login'
import InnerHeader from './header-inner'

const Main = () => (
  <main>
    <InnerHeader />
    
    <br />
    <br />

    <Switch>
      <Route path='/list' component={ListRoster} />
      <Route path='/login' component={LoginForm} />
    </Switch>
  </main>
)

export default Main
