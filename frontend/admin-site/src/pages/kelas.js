import React from 'react'
import Navbar from '../component/navbar'
import { base_url } from '../Config'
import $ from 'jquery'
import axios from 'axios'
import KelasList from '../component/kelasList'

export default class kelas extends React.Component {
    constructor() {
        super()
        this.state = {
            kelas: [],
            token: "",
            nama_kelas: "",
            kompetensi_keahlian: "",
            id_kelas: 0,
            action: ""
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
                this.setState({ kelas: response.data.data })
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
        $("#modal_kelas").modal("show")
        this.setState({
            action: "insert",
            nama_kelas: "",
            kompetensi_keahlian: "",
            id_kelas: 0
        })
    }
    Edit = selectedItem => {
        $("#modal_kelas").modal("show")
        this.setState({
            action: "update",
            id_kelas: selectedItem.id_kelas,
            nama_kelas: selectedItem.nama_kelas,
            kompetensi_keahlian: selectedItem.kompetensi_keahlian
        })
    }
    saveKelas = event => {
        event.preventDefault()
        $("#modal_kelas").modal("show")
        let sendData = {
            nama_kelas : this.state.nama_kelas,
            kompetensi_keahlian : this.state.kompetensi_keahlian,
            id_kelas : this.state.id_kelas
        }
        let url = base_url + "/kelas"
        if (this.state.action === "insert") {
            axios.post(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getKelas()
                })
        } else if (this.state.action === "update") {
            axios.put(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getKelas()
                })
                .catch(error => console.log(error))
        }
        $("#modal_kelas").modal('hide')
    }
    dropKelas = selectedItem => {
        if (window.confirm("Apakah Anda yakin menghapus data ini?")) {
            let url = base_url + "/kelas/" + selectedItem.id_kelas
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getKelas()
                })
                .catch(error => console.log(error))
        }

    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        this.getKelas()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Kelas List</h3>
                    <div className="row">
                        {this.state.kelas.map(item => (
                            <KelasList
                                key={item.id_kelas}
                                nama_kelas={item.nama_kelas}
                                kompetensi_keahlian={item.kompetensi_keahlian}
                                onEdit={() => this.Edit(item)}
                                onDrop={() => this.dropKelas(item)}
                            />
                        ))}
                    </div>
                    <button className="btn btn-dark" onClick={() => this.Add()}>
                        Tambah Kelas
                    </button>
                </div>
                {/* modal */}
                <div className="modal fade" id="modal_kelas">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header bg-info text-white">
                                <h4>Form Kelas</h4>
                            </div>
                            <div className="modal-body">
                                <form onSubmit={ev => this.saveKelas(ev)}>
                                    Nama Kelas
                                    <input type="text" className="form-control mb-1" name="nama_kelas"
                                        value={this.state.nama_kelas}
                                        onChange={this.bind}
                                        required
                                    />
                                    kompetensi_keahlian
                                    <input type="text" className="form-control mb-1" name="kompetensi_keahlian"
                                        value={this.state.kompetensi_keahlian}
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