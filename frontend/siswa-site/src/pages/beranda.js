import React from "react";
import Navbar from '../component/navbar'
import axios from 'axios'
import { base_url } from "../Config"
export default class beranda extends React.Component{
    constructor(){
        super()
        this.state = {
            token: "",
            siswaCount: 0,
            pembayaranCount: 0,
            siswaName:"",
            siswa: null
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
            this.state.siswa = JSON.parse(localStorage.getItem("siswa"))
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
    getSiswa = () => {
        let siswa = JSON.parse(localStorage.getItem('siswa'))
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ siswaCount: response.data.data.length })
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
            this.setState({ siswaName: siswa.nama })
    }
    getPembayaran = () => {
        let url = base_url + "/pembayaran/siswa/" + this.state.siswa.nisn
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
        this.getPembayaran()
        this.getSiswa()
    }
    render(){
        return(
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.siswaName}</strong>
                    </h3>
                    <div className="row">
                        {/* products count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>Siswa Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.siswaCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* customer count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-dark">
                                        <strong>History Count</strong>
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