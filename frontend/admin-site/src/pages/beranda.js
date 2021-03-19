import React from 'react'
import Navbar from '../component/navbar'
import axios from 'axios'
import { base_url } from "../Config"


export default class beranda extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            adminName: "",
            kelasCount: 0,
            sppCount: 0,
            siswaCount: 0,
            pembayaranCount: 0,
            adminCount: 0
        }
        if (localStorage.getItem("token")) {
            this.state.token = localStorage.getItem("token")
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
    getKelas = () => {
        let url = base_url + "/kelas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ kelasCount: response.data.data.length })
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
    getSpp = () => {
        let url = base_url + "/spp"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ sppCount: response.data.data.length })
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
    getSiswa = () => {
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
    }
    getPembayaran = () => {
        let url = base_url + "/pembayaran"
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
    getAdmin = () => {
        let admin = JSON.parse(localStorage.getItem('petugas'))
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ adminCount: response.data.data.length })
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
        this.setState({ adminName: admin.nama_petugas })
    }
    componentDidMount() {
        this.getKelas()
        this.getSpp()
        this.getSiswa()
        this.getPembayaran()
        this.getAdmin()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container mt-2">
                    <h3 className="my-2">
                        <strong>Welcome back, {this.state.adminName}</strong>
                    </h3>
                    <div className="row">
                        {/* products count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-success">
                                    <h4 className="text-dark">
                                        <strong>Kelas Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.kelasCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* customer count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-info">
                                    <h4 className="text-dark">
                                        <strong>SPP Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.sppCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* transactions count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-warning">
                                    <h4 className="text-dark">
                                        <strong>Siswa Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.siswaCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        {/* admins count */}
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>Pembayaran Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.pembayaranCount}</strong>
                                    </h1>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6 col-sm-12 mt-2">
                            <div className="card">
                                <div className="card-body bg-danger">
                                    <h4 className="text-dark">
                                        <strong>Admin Count</strong>
                                    </h4>
                                    <h1 className="text-white">
                                        <strong>{this.state.adminCount}</strong>
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