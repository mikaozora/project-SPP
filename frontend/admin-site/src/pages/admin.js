import React from 'react'
import Navbar from '../component/navbar'
import { base_url } from '../Config'
import $ from 'jquery'
import axios from 'axios'
export default class petugas extends React.Component {
    constructor() {
        super()
        this.state = {
            admin: [],
            action: "",
            token: "",
            id_petugas: 0,
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            fillpassword: true
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
    getAdmin = () => {
        let url = base_url + "/petugas"
        axios.get(url, this.headerConfig())
            .then(response => {
                this.setState({ admin: response.data.data })
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
        $("#modal_admin").modal("show")
        this.setState({
            id_petugas: 0,
            username: "",
            password: "",
            nama_petugas: "",
            level: "",
            fillpassword: true,
            action: "insert"
        })
    }
    Edit = selectedItem => {
        $("#modal_admin").modal("show")
        this.setState({
            action: "update",
            id_petugas: selectedItem.id_petugas,
            username: selectedItem.username,
            password: selectedItem.password,
            nama_petugas: selectedItem.nama_petugas,
            level: selectedItem.level,
            password: "",
            fillPassword: false
        })
    }
    saveAdmin = event => {
        event.preventDefault()
        $("#modal_admin").modal("show")
        let sendData = {
            id_petugas: this.state.id_petugas,
            username: this.state.username,
            nama_petugas: this.state.nama_petugas,
            level: this.state.level
        }
        if (this.state.fillpassword) {
            sendData.password = this.state.password
        }
        let url = base_url + "/petugas"
        if (this.state.action === "insert") {
            axios.post(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                })
                .catch(error => console.log(error))

        } else if (this.state.action === "update") {
            axios.put(url, sendData, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                })
                .catch(error => console.log(error))
        }
        $("#modal_admin").modal('hide')
    }
    dropAdmin = selectedItem => {
        if (window.confirm("Apakah Anda yakin ingin menghapus data ini?")) {
            let url = base_url + "/petugas/" + selectedItem.id_petugas
            axios.delete(url, this.headerConfig())
                .then(response => {
                    window.alert(response.data.message)
                    this.getAdmin()
                })
                .catch(error => console.log(error))
        }
    }
    bind = (event) => {
        this.setState({ [event.target.name]: event.target.value })
    }
    componentDidMount() {
        this.getAdmin()
    }
    render() {
        return (
            <div>
                <Navbar />
                <div className="container">
                    <h3 className="text-bold text-info mt-2">Petugas List</h3>
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Username</th>
                                <th>Nama Petugas</th>
                                <th>Level</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.admin.map((item, index) => (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.username}</td>
                                    <td>{item.nama_petugas}</td>
                                    <td>{item.level}</td>
                                    <td>
                                        <button className="btn btn-sm btn-info m-1"
                                            onClick={() => this.Edit(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-sm btn-danger m-1"
                                            onClick={() => this.dropAdmin(item)}>
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="btn btn-success" onClick={() => this.Add()}>
                        Tambah Petugas
                    </button>
                    {/* modal admin */}
                    <div className="modal fade" id="modal_admin">
                        <div className="modal-dialog">
                            <div className="modal-content">
                                <div className="modal-header bg-info text-white">
                                    <h4>Form Petugas</h4>
                                </div>
                                <div className="modal-body">
                                    <form onSubmit={ev => this.saveAdmin(ev)}>
                                        Username
                                        <input type="text" className="form-control mb-1" name="username" autoComplete="off"
                                            value={this.state.username}
                                            onChange={this.bind}
                                            required
                                        />
                                        Nama Petugas
                                        <input type="text" className="form-control mb-1" name="nama_petugas" autoComplete="off"
                                            value={this.state.nama_petugas}
                                            onChange={this.bind}
                                            required
                                        />
                                        Level
                                        <select class="custom-select mr-sm-2" name="level" onChange={this.bind} required value={this.state.level}>
                                            <option value="">--Pilih Level--</option>
                                            <option value="admin">Admin</option>
                                            <option value="petugas">Petugas</option>
                                        </select>
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