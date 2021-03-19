import React from 'react'
import { Switch, Route } from "react-router-dom"
import Login from "./pages/login"
import Kelas from "./pages/kelas"
import Spp from "./pages/spp"
import Siswa from "./pages/siswa"
import Admin from "./pages/admin"
import Pembayaran from "./pages/pembayaran"
import Beranda from "./pages/beranda"


export default class App extends React.Component{
  render(){
    return(
      <Switch>
        <Route exact path="/" component={Beranda} />
        <Route path="/login" component={Login} />
        <Route path="/kelas" component={Kelas} />
        <Route path="/Spp" component={Spp} />
        <Route path="/siswa" component={Siswa} />
        <Route path="/pembayaran" component={Pembayaran} />
        <Route path="/admin" component={Admin} />
      </Switch>
    )
  }
}
 