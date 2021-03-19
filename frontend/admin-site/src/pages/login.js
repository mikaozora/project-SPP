import React from 'react'
import Navbar from '../component/navbar'
import axios from 'axios'
import {base_url} from '../Config'

export default class login extends React.Component{
    constructor(){
        super()
        this.state = {
            username: "",
            password: "",
            message: "",
            logged: true
            
        }
    }

    bind = (event) => {
        this.setState({[event.target.name]: event.target.value})
    }

    Login = event => {
        event.preventDefault()
        let sendData = {
            username : this.state.username,
            password : this.state.password
        }
        let url = base_url + "/petugas/admin"
        axios.post(url, sendData)
            .then(response => {
                this.setState({logged: response.data.logged})
                
                // this.setState({level: response.data.level})
                if(this.state.logged){
                    let petugas = response.data.data
                    let token = response.data.token
                    localStorage.setItem("petugas", JSON.stringify(petugas))
                    localStorage.setItem("token", token)
                    this.props.history.push("/")
                }
            })
            .catch(error => console.log(error))
    }

    render(){
        return(
            <div className="container d-flex h-100 justify-content-center align-items-center">
                <div className="col-sm-6 card my-5">
                    <div className="card-header bg-primary text-white text-center">
                        <h4>BAYAR SPP!!</h4>
                        <strong className="text-warning">Admin Sign In</strong>
                    </div>
                    <div className="card-body">
                        {!this.state.logged ?
                            (
                                <div className="alert alert-danger mt-1">
                                    Invalid Username or password
                                </div>
                            ) : null}
                        <form onSubmit={ev => this.Login(ev)}>
                            Username
                            <input type="text" name="username" className="form-control mb-1" value={this.state.username}
                                onChange={this.bind} />
                            Password
                            <input type="password" name="password" className="form-control mb-1" value={this.state.password}
                                onChange={this.bind}
                                autoComplete="false" />
                            <button className="btn btn-block btn-primary mb-1" type="submit">
                                Sign In
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}