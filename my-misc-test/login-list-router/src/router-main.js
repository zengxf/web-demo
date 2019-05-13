import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from './list/list'
import LoginForm from './login/login'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={List} />
      <Route path='/login' component={LoginForm} />
    </Switch>
  </main>
)

export default Main
