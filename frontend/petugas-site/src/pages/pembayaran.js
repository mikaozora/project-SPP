import React from 'react'
import Navbar from '../component/navbar'
import { base_url } from "../Config.js";
import $ from "jquery"
import axios from "axios"
import PembayaranList from '../component/pembayaranList'

export default class pembayaran extends React.Component {
    constructor() {
        super()
        this.state = {
            token: "",
            action: "",
            id_pembayaran: 0,
            id_spp: 0,
            id_petugas: 0,
            tgl_bayar: "", 
            bulan_dibayar: "",
            tahun_dibayar: "",
            nisn: "",
            pembayaran: [],
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
    getPembayaran = () => {
        let url = base_url + "/pembayaran/" + this.state.petugas.id_petugas
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
    Add = () => {
        $("#modal_pembayaran").modal("show")
        this.setState({
            action: "insert",
            id_pembayaran: 0,
            id_spp: 0,
            id_petugas: this.state.petugas.id_petugas,
            tgl_bayar: "",
            bulan_dibayar: "",
            tahun_dibayar: "",
            nisn: "",
            jumlah_bayar: 0
        })
    }
    savePembayaran = event => {
        event.preventDefault()
        let sendData = {
            id_pembayaran: this.state.id_pembayaran,
            id_spp: this.state.id_spp,
            id_petugas: this.state.id_petugas,
            tgl_bayar: this.state.tgl_bayar,
            bulan_dibayar: this.state.bulan_dibayar,
            tahun_dibayar: this.state.tahun_dibayar,
            nisn: this.state.nisn,
            jumlah_bayar: this.state.jumlah_bayar
        }
        let url = base_url + "/pembayaran"
        if (this.state.action === "insert") {
            axios.post(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getPembayaran()
                })
                .catch(error => console.log(error))
        }
        $("#modal_pembayaran").modal("hide")
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
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
                        <PembayaranList
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
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Entry Pembayaran
                    </button>
                </div>
                {/* modal */}
                <div className="modal fade" id="modal_pembayaran">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Pembayaran</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.savePembayaran(ev)}>
                                    ID SPP
                                    <input type="text" className="form-control mb-1" name="id_spp"
                                        value={this.state.id_spp}
                                        onChange={this.bind}
                                        required
                                    />
                                    ID Petugas
                                    <input type="text" className="form-control mb-1" name="id_petugas"
                                        value={this.state.id_petugas}
                                        onChange={this.bind}
                                        required disabled
                                    />
                                    NISN
                                    <input type="text" className="form-control mb-1" name="nisn"
                                        value={this.state.nisn}
                                        onChange={this.bind}
                                        required
                                    />
                                    Jumlah Bayar
                                    <input type="text" className="form-control mb-1" name="jumlah_bayar"
                                        value={this.state.jumlah_bayar}
                                        onChange={this.bind}
                                        required
                                    />
                                    Bulan dibayar
                                    <input type="text" className="form-control mb-1" name="bulan_dibayar"
                                        value={this.state.bulan_dibayar}
                                        onChange={this.bind}
                                        required
                                    />
                                    Tahun dibayar
                                    <input type="text" className="form-control mb-1" name="tahun_dibayar"
                                        value={this.state.tahun_dibayar}
                                        onChange={this.bind}
                                        required
                                    />
                                    <button type="submit" className="btn btn-block btn-success">
                                        Simpan
                                </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}