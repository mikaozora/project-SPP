import React from "react";
import { Switch, Route } from "react-router-dom"
import Beranda from './pages/beranda'
import History from './pages/history'
import Login from './pages/login'
export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Beranda} />
        <Route path="/login" component={Login} />
        <Route path="/history" component={History} />
      </Switch>
    )
  }
}