import React from 'react'
import { Switch, Route } from 'react-router-dom'
import List from './list'
import Item from './item'

const ListRoster = () => (
  <Switch>
    <Route exact path='/list' component={List}/>
    <Route path='/list/:uuid' component={Item}/>
  </Switch>
)

export default ListRoster
