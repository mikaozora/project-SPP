import React from 'react'
import Navbar from '../component/navbar'
import { base_url } from '../Config'
import $ from 'jquery'
import axios from 'axios'

export default class siswa extends React.Component{
    constructor(){
        super()
        this.state = {
            siswa: [],
            token: "",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            password: "",
            action: "",
            fillPassword: true
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

    getSiswa = () => {
        let url = base_url + "/siswa"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ siswa: response.data.data })
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
        $("#modal_siswa").modal("show")
        this.setState({
            action: "insert",
            nisn: "",
            nis: "",
            nama: "",
            id_kelas: "",
            alamat: "",
            no_telp: "",
            id_spp: "",
            password: "",
            fillPassword: true
        })
    }

    Edit = selectedItem => {
        $("#modal_siswa").modal("show")
        this.setState({
            action: "update",
            nisn: selectedItem.nisn,
            nis: selectedItem.nis,
            nama: selectedItem.nama,
            id_kelas: selectedItem.id_kelas,
            alamat: selectedItem.alamat,
            no_telp: selectedItem.no_telp,
            id_spp: selectedItem.id_spp,
            password: "",
            fillPassword: false
        })
    }

    saveSiswa = event => {
        event.preventDefault()
        $("#modal_admin").modal("show")
        let sendData = {
            nisn: this.state.nisn,
            nis: this.state.nis,
            nama: this.state.nama,
            id_kelas : this.state.id_kelas,
            alamat: this.state.alamat,
            no_telp: this.state.no_telp,
            id_spp: this.state.id_spp
        }
        if(this.state.fillPassword){
            sendData.password = this.state.password
        }
        let url = base_url + "/siswa"
        if (this.state.action === "insert") {
            axios.post(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        } else if (this.state.action === "update") {
            axios.put(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        }
        $("#modal_siswa").modal('hide')
    }
    dropSiswa = selectedItem => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            let url = base_url + "/siswa/" + selectedItem.nisn
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getSiswa()
                })
                .catch(error => console.log(error))
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount(){
        this.getSiswa()
    }

    render(){
        return(
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Siswa List</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>NISN</th>
                                <th>NIS</th>
                                <th>Nama</th>
                                <th>Alamat</th>
                                <th>No Telp</th>
                                <th>Id_kelas</th>
                                <th>Id_spp</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.siswa.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.nisn}</td>
                                    <td>{item.nis}</td>
                                    <td>{item.nama}</td>
                                    <td>{item.alamat}</td>
                                    <td>{item.no_telp}</td>
                                    <td>{item.id_kelas}</td>
                                    <td>{item.id_spp}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                            onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger m-1"
                                            onClick={() => this.dropSiswa(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Siswa
                    </button>
                    {/* modal admin */}
                    <div className="modal fade" id="modal_siswa">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Siswa</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveSiswa(ev)}>
                                        NISN
                                        <input type="text" className="form-control mb-1" name="nisn" autoComplete="off"
                                            value={this.state.nisn}
                                            onChange={this.bind}
                                            required
                                        />
                                        NIS
                                        <input type="text" className="form-control mb-1" name="nis" autoComplete="off"
                                            value={this.state.nis}
                                            onChange={this.bind}
                                            required
                                        />
                                        Nama
                                        <input type="text" className="form-control mb-1" name="nama" autoComplete="off"
                                            value={this.state.nama}
                                            onChange={this.bind}
                                            required
                                        />
                                        Alamat
                                        <input type="text" className="form-control mb-1" name="alamat" autoComplete="off"
                                            value={this.state.alamat}
                                            onChange={this.bind}
                                            required
                                        />
                                        No Telepon
                                        <input type="text" className="form-control mb-1" name="no_telp" autoComplete="off"
                                            value={this.state.no_telp}
                                            onChange={this.bind}
                                            required
                                        />
                                        Id_kelas
                                        <input type="text" className="form-control mb-1" name="id_kelas" autoComplete="off"
                                            value={this.state.id_kelas}
                                            onChange={this.bind}
                                            required
                                        />
                                        Id_spp
                                        <input type="text" className="form-control mb-1" name="id_spp" autoComplete="off"
                                            value={this.state.id_spp} 
                                            onChange={this.bind}
                                            required
                                        />
                                        {this.state.action === "update" && this.state.fillPassword === false
                                            ? (
                                                <button className="btn btn-sm btn-secondary mb-1 btn-block"
                                                    onClick={() => this.setState({ fillPassword: true })}>
                                                    Ganti Password
                                                </button>
                                            ) : (
                                                <div>
                                                    Password
                                                    <input type="password" className="form-control mb-1" name="password"
                                                        value={this.state.password}
                                                        onChange={this.bind}
                                                        required
                                                    />
                                                </div>
                                            )}
                                        <button type="submit" className="btn btn-block btn-success">
                                            Simpan
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}