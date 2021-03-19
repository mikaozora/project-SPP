import React from "react"
import Navbar from '../component/navbar'
import axios from 'axios'
import { base_url } from "../Config"

export default class beranda extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            petugasCount: 0,
            pembayaranCount: 0,
            petugasName:"",
            petugas: null
        } 
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            this.state.petugas = JSON.parse(localStorage.getItem("petugas"))
        } else {
            window.location = "/login"
        }
    }
    headerConfig = () => {
        let header = {
            headers: { Authorization: `Bearer ${this.state.token}` }
        }
        return header
    }
    getPetugas = () => {
        let petugas = JSON.parse(localStorage.getItem('petugas'))
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ petugasCount: response.data.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
            this.setState({ petugasName: petugas.nama_petugas })
    }
    getPembayaran = () => {
        let url = base_url + "/pembayaran/" + this.state.petugas.id_petugas
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ pembayaranCount: response.data.data.length })
            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status) {
                        window.alert(error.response.data.message)
                        this.props.history.push("/login")
                    }
                } else {
                    console.log(error);
                }
            })
    }
    componentDidMount(){
        this.getPetugas()
        this.getPembayaran()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.petugasName}</strong>
                    </h3>
                    <div className="row">
                        {/* products count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>Petugas Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.petugasCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* customer count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-dark">
                                        <strong>Pembayaran Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.pembayaranCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}