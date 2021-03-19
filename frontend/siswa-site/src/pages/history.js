import React from "react";
import Navbar from '../component/navbar'
import { base_url } from "../Config.js";
import $ from "jquery"
import axios from "axios"
import HistoryList from '../component/historyList'
export default class history extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            pembayaran: [],
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
    getPembayaran = () => {
        let url = base_url + "/pembayaran/siswa/" + this.state.siswa.nisn
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ pembayaran: response.data.data })
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
    componentDidMount() {
        this.getPembayaran()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Pembayaran List</h3>
                    {this.state.pembayaran.map(item => (
                        <HistoryList
                            key={item.id_pembayaran}
                            id_pembayaran={item.id_pembayaran}
                            nama={item.siswa.nama}
                            nisn={item.nisn}
                            jumlah_bayar={item.jumlah_bayar}
                            tgl_bayar={item.tgl_bayar}
                            nama_petugas={item.petugas.nama_petugas}
                            id_spp={item.id_spp}
                        />
                    ))}
                </div>
            </div>
        )
    }
}